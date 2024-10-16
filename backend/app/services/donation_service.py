# app/services/donation_service.py
from app.models import Donation, db

class DonationService:
    def __init__(self):
        pass

    def get_all_donations(self):
        return Donation.query.all()

    def get_donation_by_id(self, donation_id):
        return Donation.query.get(donation_id)

    def create_donation(self, amount, donor):
        new_donation = Donation(amount=amount, donor=donor)
        db.session.add(new_donation)
        db.session.commit()
        return new_donation

    def update_donation(self, donation_id, amount=None, donor=None):
        donation = Donation.query.get(donation_id)
        if donation is None:
            return None

        if amount:
            donation.amount = amount
        if donor:
            donation.donor = donor
        
        db.session.commit()
        return donation

    def delete_donation(self, donation_id):
        donation = Donation.query.get(donation_id)
        if donation is None:
            return None
        
        db.session.delete(donation)
        db.session.commit()
        return donation_id
