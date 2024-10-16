# app/services/ministry_service.py
from app.models import Ministry, db

class MinistryService:
    def __init__(self):
        pass

    def get_all_ministries(self):
        return Ministry.query.all()

    def get_ministry_by_id(self, ministry_id):
        return Ministry.query.get(ministry_id)

    def create_ministry(self, name, description, leader):
        new_ministry = Ministry(name=name, description=description, leader=leader)
        db.session.add(new_ministry)
        db.session.commit()
        return new_ministry

    def update_ministry(self, ministry_id, name=None, description=None, leader=None):
        ministry = Ministry.query.get(ministry_id)
        if ministry is None:
            return None

        if name:
            ministry.name = name
        if description:
            ministry.description = description
        if leader:
            ministry.leader = leader

        db.session.commit()
        return ministry

    def delete_ministry(self, ministry_id):
        ministry = Ministry.query.get(ministry_id)
        if ministry is None:
            return None
        
        db.session.delete(ministry)
        db.session.commit()
        return ministry_id

