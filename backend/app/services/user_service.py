# app/services/user_service.py
from app.models import User, db
from werkzeug.security import generate_password_hash, check_password_hash

class UserService:
    def __init__(self):
        pass

    def get_all_users(self):
        return User.query.all()

    def get_user_by_id(self, user_id):
        return User.query.get(user_id)

    def create_user(self, username, email, password):
        password_hash = generate_password_hash(password)
        new_user = User(username=username, email=email, password_hash=password_hash)
        db.session.add(new_user)
        db.session.commit()
        return new_user

    def update_user(self, user_id, username=None, email=None, password=None, is_active=None):
        user = User.query.get(user_id)
        if user is None:
            return None

        if username:
            user.username = username
        if email:
            user.email = email
        if password:
            user.password_hash = generate_password_hash(password)
        if is_active is not None:
            user.is_active = is_active
        
        db.session.commit()
        return user

    def delete_user(self, user_id):
        user = User.query.get(user_id)
        if user is None:
            return None
        
        db.session.delete(user)
        db.session.commit()
        return user_id
