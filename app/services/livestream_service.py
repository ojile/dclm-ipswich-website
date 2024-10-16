# app/services/livestream_service.py
from app.models import Livestream, db

class LivestreamService:
    def __init__(self):
        pass

    def get_all_livestreams(self):
        return Livestream.query.all()

    def get_livestream_by_id(self, livestream_id):
        return Livestream.query.get(livestream_id)

    def create_livestream(self, title, stream_url, start_time, end_time=None):
        new_livestream = Livestream(title=title, stream_url=stream_url, start_time=start_time, end_time=end_time)
        db.session.add(new_livestream)
        db.session.commit()
        return new_livestream

    def update_livestream(self, livestream_id, title=None, stream_url=None, start_time=None, end_time=None, is_active=None):
        livestream = Livestream.query.get(livestream_id)
        if livestream is None:
            return None

        if title:
            livestream.title = title
        if stream_url:
            livestream.stream_url = stream_url
        if start_time:
            livestream.start_time = start_time
        if end_time:
            livestream.end_time = end_time
        if is_active is not None:
            livestream.is_active = is_active
        
        db.session.commit()
        return livestream

    def delete_livestream(self, livestream_id):
        livestream = Livestream.query.get(livestream_id)
        if livestream is None:
            return None
        
        db.session.delete(livestream)
        db.session.commit()
        return livestream_id
