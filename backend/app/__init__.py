import logging
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

# Initialize database and migration objects
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)

    # Load the configuration based on the FLASK_ENV variable
    env = os.environ.get('FLASK_ENV', 'development')  # Default to development
    if env == 'production':
        app.config.from_object('config.ProductionConfig')
    elif env == 'testing':
        app.config.from_object('config.TestingConfig')
    else:
        app.config.from_object('config.DevelopmentConfig')

    # Enable CORS (Cross-Origin Resource Sharing)
    CORS(app, resources={r"/*": {"origins": "*"}})

    # Set logging level
    app.logger.setLevel(logging.INFO)

    # Log the database URI for debugging
    app.logger.info(f"Database URI: {app.config.get('SQLALCHEMY_DATABASE_URI', 'Not set')}")

    # Initialize the database and migrations
    try:
        db.init_app(app)
        migrate.init_app(app, db)
        app.logger.info("Database and migration setup completed successfully.")
    except Exception as e:
        app.logger.error(f"Error initializing database: {str(e)}")
        raise  # Stop the application startup if DB init fails

    # Register routes (import routes after app creation to avoid circular imports)
    from app.routes import setup_routes
    setup_routes(app)

    # Import models to make sure they are registered
    from app.models import ContactSubmission

    @app.shell_context_processor
    def make_shell_context():
        return {'db': db, 'ContactSubmission': ContactSubmission}

    return app
