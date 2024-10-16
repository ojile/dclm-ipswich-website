# app/services/sermon_service.py
from app.models import Sermon, db

class SermonService:
    def __init__(self):
        pass

    def get_all_sermons(self):
        return Sermon.query.all()

    def get_sermon_by_id(self, sermon_id):
        return Sermon.query.get(sermon_id)

    def add_sermon(self, title, preacher, date_preached, content):
        new_sermon = Sermon(title=title, preacher=preacher, date_preached=date_preached, content=content)
        db.session.add(new_sermon)
        db.session.commit()
        return new_sermon

    def update_sermon(self, sermon_id, title=None, preacher=None, date_preached=None, content=None):
        sermon = Sermon.query.get(sermon_id)
        if sermon is None:
            return None

        if title:
            sermon.title = title
        if preacher:
            sermon.preacher = preacher
        if date_preached:
            sermon.date_preached = date_preached
        if content:
            sermon.content = content
        
        db.session.commit()
        return sermon

    def delete_sermon(self, sermon_id):
        sermon = Sermon.query.get(sermon_id)
        if sermon is None:
            return None
        
        db.session.delete(sermon)
        db.session.commit()
        return sermon_id


