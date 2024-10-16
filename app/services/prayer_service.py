# app/services/prayer_service.py
from app.models import Prayer, db

class PrayerService:
    def __init__(self):
        pass

    def get_all_prayers(self):
        return Prayer.query.all()

    def get_prayer_by_id(self, prayer_id):
        return Prayer.query.get(prayer_id)

    def create_prayer(self, request, submitted_by):
        new_prayer = Prayer(request=request, submitted_by=submitted_by)
        db.session.add(new_prayer)
        db.session.commit()
        return new_prayer

    def update_prayer(self, prayer_id, request=None, answered=None):
        prayer = Prayer.query.get(prayer_id)
        if prayer is None:
            return None

        if request:
            prayer.request = request
        if answered is not None:
            prayer.answered = answered
        
        db.session.commit()
        return prayer

    def delete_prayer(self, prayer_id):
        prayer = Prayer.query.get(prayer_id)
        if prayer is None:
            return None
        
        db.session.delete(prayer)
        db.session.commit()
        return prayer_id
