# app/models.py
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from app import db  # Import the db instance from your init file





class Ministry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }

class Prayer(db.Model):
    __tablename__ = 'prayers'
    
    id = db.Column(db.Integer, primary_key=True)
    request = db.Column(db.Text, nullable=False)
    submitted_by = db.Column(db.String(50), nullable=False)
    answered = db.Column(db.Boolean, default=False)
    submitted_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __repr__(self):
        return f"<Prayer {self.id} by {self.submitted_by}>"
    
class Resource(db.Model):
    __tablename__ = 'resources'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    url = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __repr__(self):
        return f"<Resource {self.title}>"
class Sermon(db.Model):
    __tablename__ = 'sermons'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    preacher = db.Column(db.String(255), nullable=False)
    date_preached = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Foreign key for User

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'preacher': self.preacher,
            'date_preached': self.date_preached.isoformat(),
            'content': self.content,
            'user_id': self.user_id  # Include user_id in the dictionary representation
        }
class Testimony(db.Model):
    __tablename__ = 'testimonies'
    
    id = db.Column(db.Integer, primary_key=True)
    testimony = db.Column(db.Text, nullable=False)
    testifier = db.Column(db.String(50), nullable=False)
    date_shared = db.Column(db.Date, nullable=False)
    is_public = db.Column(db.Boolean, default=True)

    def __repr__(self):
        return f"<Testimony by {self.testifier}>"

class Blog(db.Model):
    __tablename__ = 'blogs'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    content = db.Column(db.Text, nullable=False)
    author = db.Column(db.String(50), nullable=False)
    posted_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __repr__(self):
        return f"<Blog {self.title} by {self.author}>"

class Livestream(db.Model):
    __tablename__ = 'livestreams'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    stream_url = db.Column(db.String(255), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=True)
    is_active = db.Column(db.Boolean, default=True)

    def __repr__(self):
        return f"<Livestream {self.title}>"

from app import db
from datetime import datetime

class Event(db.Model):
    __tablename__ = 'events'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=True)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)  # Set default to current time if desired
    location = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Foreign key for User

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'date': self.date.isoformat(),  # Format date using isoformat
            'location': self.location,
            'user_id': self.user_id  # Include user_id in the dictionary representation
        }

    def __repr__(self):
        return f"<Event {self.title}>"

class Donation(db.Model):
    __tablename__ = 'donations'
    
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    donor = db.Column(db.String(50), nullable=False)
    date_donated = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __repr__(self):
        return f"<Donation {self.amount} by {self.donor}>"

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)  # Storing password hash, not the plain password
    is_active = db.Column(db.Boolean, default=True)
    joined_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    events = db.relationship('Event', backref='user', lazy=True)  # Relationship with Event

    def set_password(self, password):
        """Hashes the password and stores the hash."""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Checks if the provided password matches the stored hash."""
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f"<User {self.username}>"
    
#from flask_sqlalchemy import SQLAlchemy

#db = SQLAlchemy()

class ContactSubmission(db.Model):
    __tablename__ = 'contact_submission'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'message': self.message,
            'created_at': self.created_at.isoformat()
        }
    
    

            
# Define other models similarly
