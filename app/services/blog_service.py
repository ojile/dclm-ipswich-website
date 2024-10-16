# app/services/blog_service.py
from app.models import Blog, db

class BlogService:
    def __init__(self):
        pass

    def get_all_blogs(self):
        return Blog.query.all()

    def get_blog_by_id(self, blog_id):
        return Blog.query.get(blog_id)

    def create_blog(self, title, content, author):
        new_blog = Blog(title=title, content=content, author=author)
        db.session.add(new_blog)
        db.session.commit()
        return new_blog

    def update_blog(self, blog_id, title=None, content=None):
        blog = Blog.query.get(blog_id)
        if blog is None:
            return None

        if title:
            blog.title = title
        if content:
            blog.content = content
        
        db.session.commit()
        return blog

    def delete_blog(self, blog_id):
        blog = Blog.query.get(blog_id)
        if blog is None:
            return None
        
        db.session.delete(blog)
        db.session.commit()
        return blog_id
