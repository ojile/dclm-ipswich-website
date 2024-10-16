import logging
import datetime
import jwt  # For encoding and decoding JWT tokens
from functools import wraps
from flask import Blueprint, jsonify, request, current_app
from app.models import db, ContactSubmission, Event, User, Sermon  # Import Sermon model
from app.services.sermon_service import SermonService
from app.services.ministry_service import MinistryService
from app.services.event_service import EventService
from app.services.contact_submission_service import ContactSubmissionService
from werkzeug.security import generate_password_hash, check_password_hash  # Import generate_password_hash
from dateutil.parser import parse  # Import the parse function
import re  # Import for email validation

# Initialize services
sermon_service = SermonService()
ministry_service = MinistryService()
event_service = EventService()
contact_submission_service = ContactSubmissionService()

# Create Blueprint
sermon_bp = Blueprint('sermon', __name__)

def setup_routes(app):
    app.register_blueprint(sermon_bp, url_prefix='/api')

# Utility function for token validation
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        # Check if the token is provided in the Authorization header
        if 'Authorization' in request.headers:
            try:
                token = request.headers['Authorization'].split(" ")[1]
            except IndexError:
                logging.error("Authorization header format is incorrect")
                return jsonify({"error": "Token format is incorrect"}), 403

        if not token:
            return jsonify({"error": "Token is missing!"}), 403

        try:
            # Fix base64 padding if required (for tokens with invalid padding)
            def fix_token_padding(token):
                return token + '=' * (-len(token) % 4)

            token = fix_token_padding(token)

            # Decode token with secret key and HS256 algorithm
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.filter_by(id=data['user_id']).first()

            if not current_user:
                logging.error("User not found for the provided token")
                return jsonify({"error": "User not found!"}), 403

        except jwt.ExpiredSignatureError:
            logging.error("Token has expired")
            return jsonify({"error": "Token has expired!"}), 403
        except jwt.InvalidTokenError as e:
            logging.error(f"Invalid token error: {e}")
            return jsonify({"error": f"Invalid token: {e}"}), 403

        return f(current_user, *args, **kwargs)

    return decorated

# Helper function for email validation
def validate_email(email):
    regex = r'^\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    return re.match(regex, email)

# Login Route
@sermon_bp.route('/auth/login', methods=['POST'])
def login():
    data = request.json
    logging.debug("Received login data: %s", data)
    print("Received login data:", data)  # Print for tracing

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        print("Missing username or password")  # Print for tracing
        return jsonify({"error": "Missing username or password"}), 400

    user = User.query.filter_by(username=username).first()
    print("User found in database:", user)  # Print for tracing
    logging.debug("User found: %s", user)

    if not user:
        print("User not found")  # Print for tracing
        return jsonify({"error": "Invalid credentials"}), 401

    if not user.check_password(password):
        print("Password check failed")  # Print for tracing
        return jsonify({"error": "Invalid credentials"}), 401

    # Generate JWT token
    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)  # Token expires in 24 hours
    }, current_app.config['SECRET_KEY'], algorithm="HS256")

    print("Generated token for user:", user.id)  # Print for tracing
    return jsonify({"token": token}), 200

# Signup Route
@sermon_bp.route('/auth/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    email = data.get('email')  # New field for email
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"error": "Missing username, email, or password"}), 400

    if not validate_email(email):
        return jsonify({"error": "Invalid email format"}), 400

    # Check if username or email already exists
    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 409

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 409

    # Create a new user instance
    new_user = User(username=username, email=email)
    new_user.set_password(password)  # Set the hashed password

    # Add to the database session and commit
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully."}), 201

# Fetch all sermons (public)
@sermon_bp.route('/sermons', methods=['GET'])
def fetch_all_sermons():
    sermons = sermon_service.get_all_sermons()
    return jsonify([sermon.to_dict() for sermon in sermons])

# Fetch sermon by ID (protected)
@sermon_bp.route('/sermons/<int:id>', methods=['GET'])
@token_required
def fetch_sermon_by_id(current_user, id):
    print(f"Fetching sermon with ID: {id}")  # Debugging line
    sermon = sermon_service.get_sermon_by_id(id)
    return jsonify(sermon.to_dict()) if sermon else jsonify({"error": "Sermon not found"}), 404

@sermon_bp.route('/sermons', methods=['POST']) 
@token_required
def create_sermon(current_user):
    print("Create sermon function reached!")  # Debug line
    logging.info("Create sermon function reached!")  # Debug line

    auth_header = request.headers.get('Authorization')
    print(f"Authorization header: {auth_header}")  # Debugging line
    data = request.json

    title = data.get('title')
    preacher = data.get('preacher')  # Added preacher field
    date_preached_str = data.get('date_preached')  # Changed to match your model
    content = data.get('content')

    # Validate required fields
    if not title or not preacher or not content or not date_preached_str:
        return jsonify({"error": "Missing required fields: title, preacher, content, and date_preached."}), 400

    try:
        # Optional: parse the date string to a datetime object
        date_preached = parse(date_preached_str)

        # Create a new sermon instance
        new_sermon = Sermon(
            title=title,
            preacher=preacher,
            content=content,
            date_preached=date_preached,
            user_id=current_user.id  # Use the user_id from the current_user
        )

        # Add the new sermon to the database
        db.session.add(new_sermon)
        db.session.commit()

        return jsonify(new_sermon.to_dict()), 201  # Respond with the created sermon details
    except Exception as e:
        logging.error(f"Error creating sermon: {e}", exc_info=True)  # Log the stack trace for better debugging
        return jsonify({"error": str(e)}), 500  # Handle any errors that occur

# Ministries routes (protected)
@sermon_bp.route('/ministries', methods=['GET'])
@token_required
def fetch_all_ministries(current_user):
    ministries = ministry_service.get_all_ministries()
    return jsonify([ministry.to_dict() for ministry in ministries])

@sermon_bp.route('/ministries/<int:id>', methods=['GET'])
@token_required
def fetch_ministry_by_id(current_user, id):
    ministry = ministry_service.get_ministry_by_id(id)
    return jsonify(ministry.to_dict()) if ministry else jsonify({"error": "Ministry not found"}), 404

# Event routes (public)
@sermon_bp.route('/events', methods=['GET'])
def fetch_all_events():
    events = event_service.get_all_events()
    if not events:
        logging.error("No events found in the database.")
    else:
        logging.info(f"Fetched {len(events)} events.")
    return jsonify([event.to_dict() for event in events])

@sermon_bp.route('/events', methods=['POST'])
@token_required
def create_event(current_user):
    # Check if current_user is None (i.e., token is invalid)
    if current_user is None:
        return jsonify({"error": "Invalid or expired token. Please log in again."}), 403

    data = request.json
    title = data.get('title')
    date_str = data.get('date')
    location = data.get('location')

    # Validate input fields
    if not title or not date_str or not location:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        # Parse the date string into a datetime object
        date = parse(date_str)

        # Create a new event instance
        new_event = Event(
            title=title,
            description=data.get('description'),
            date=date,
            location=location,
            user_id=current_user.id  # Assign the current user's ID to the event
        )

        # Add the event to the database session and commit
        db.session.add(new_event)
        db.session.commit()

        return jsonify(new_event.to_dict()), 201
    except Exception as e:
        logging.error(f"Error creating event: {e}")
        return jsonify({"error": "An error occurred while creating the event. Please try again."}), 500


# Contact form submission (public)
@sermon_bp.route('/contact', methods=['POST'])
def submit_contact_form():
    if not request.is_json:
        return jsonify({"error": "Invalid content type, must be application/json"}), 400

    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    if not name or not email or not message:
        return jsonify({"error": "Missing required fields"}), 400

    if not validate_email(email):
        return jsonify({"error": "Invalid email format"}), 400

    try:
        contact_submission = contact_submission_service.create_contact_submission(name, email, message)
    except Exception as e:
        logging.error(f"Error processing contact submission: {e}")
        return jsonify({"error": "Error processing the contact submission"}), 500

    return jsonify({"message": "Contact form submitted successfully!", "data": contact_submission.to_dict()}), 201
