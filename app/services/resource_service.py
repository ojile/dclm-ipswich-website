# app/services/resource_service.py
from app.models import Resource, db

class ResourceService:
    def __init__(self):
        pass

    def get_all_resources(self):
        return Resource.query.all()

    def get_resource_by_id(self, resource_id):
        return Resource.query.get(resource_id)

    def create_resource(self, title, description, url):
        new_resource = Resource(title=title, description=description, url=url)
        db.session.add(new_resource)
        db.session.commit()
        return new_resource

    def update_resource(self, resource_id, title=None, description=None, url=None):
        resource = Resource.query.get(resource_id)
        if resource is None:
            return None

        if title:
            resource.title = title
        if description:
            resource.description = description
        if url:
            resource.url = url
        
        db.session.commit()
        return resource

    def delete_resource(self, resource_id):
        resource = Resource.query.get(resource_id)
        if resource is None:
            return None
        
        db.session.delete(resource)
        db.session.commit()
        return resource_id
