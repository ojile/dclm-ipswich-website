import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your_secret_key_here'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    # PostgreSQL connection for development
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'postgresql+psycopg2://testuser:testuser@db:5432/dclm-ipswich-website-db-1'
    DEBUG = True

class ProductionConfig(Config):
    # PostgreSQL connection for production
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'postgresql+psycopg2://produser:prodpassword@production-db:5432/prod_dbname'
    DEBUG = False

class TestingConfig(Config):
    # PostgreSQL connection for testing
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'postgresql+psycopg2://testuser:testuser@db:5432/test_db'
    TESTING = True
