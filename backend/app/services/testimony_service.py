# app/services/testimony_service.py
from app.models import Testimony, db

class TestimonyService:
    def __init__(self):
        pass

    def get_all_testimonies(self):
        return Testimony.query.all()

    def get_testimony_by_id(self, testimony_id):
        return Testimony.query.get(testimony_id)

    def create_testimony(self, testimony, testifier, date_shared, is_public=True):
        new_testimony = Testimony(testimony=testimony, testifier=testifier, date_shared=date_shared, is_public=is_public)
        db.session.add(new_testimony)
        db.session.commit()
        return new_testimony

    def update_testimony(self, testimony_id, testimony=None, is_public=None):
        testimony_obj = Testimony.query.get(testimony_id)
        if testimony_obj is None:
            return None

        if testimony:
            testimony_obj.testimony = testimony
        if is_public is not None:
            testimony_obj.is_public = is_public
        
        db.session.commit()
        return testimony_obj

    def delete_testimony(self, testimony_id):
        testimony_obj = Testimony.query.get(testimony_id)
        if testimony_obj is None:
            return None
        
        db.session.delete(testimony_obj)
        db.session.commit()
        return testimony_id
