# app/services/event_service.py
from app.models import Event, db

class EventService:
    def __init__(self):
        pass

    def get_all_events(self):
        return Event.query.all()

    def get_event_by_id(self, event_id):
        return Event.query.get(event_id)

    def create_event(self, title, description, date, location):
        new_event = Event(title=title, description=description, date=date, location=location)
        db.session.add(new_event)
        db.session.commit()
        return new_event

    def update_event(self, event_id, title=None, description=None, date=None, location=None):
        event = Event.query.get(event_id)
        if event is None:
            return None

        if title:
            event.title = title
        if description:
            event.description = description
        if date:
            event.date = date
        if location:
            event.location = location
        
        db.session.commit()
        return event

    def delete_event(self, event_id):
        event = Event.query.get(event_id)
        if event is None:
            return None
        
        db.session.delete(event)
        db.session.commit()
        return event_id
