import sys
import os
from flask.cli import FlaskGroup
from app import create_app, db
from flask_migrate import Migrate

# Add the backend directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), 'backend')))

app = create_app()  # Create Flask app instance
migrate = Migrate(app, db)  # Initialize Migrate with app and db

cli = FlaskGroup(create_app=create_app)

@cli.command("run")
def run():
    """Run the Flask app."""
    app.run(debug=os.environ.get('FLASK_ENV') == 'development')  # Use the environment variable to determine debug mode

if __name__ == "__main__":
    cli()  # Run the CLI commands
