# backend/app/services/contact_submission_service.py
from app.models import ContactSubmission, db

class ContactSubmissionService:
    def __init__(self):
        pass

    def create_contact_submission(self, name, email, message):
        contact_submission = ContactSubmission(name=name, email=email, message=message)
        db.session.add(contact_submission)
        db.session.commit()
        return contact_submission
