# Use the official Python image from the Docker Hub
FROM python:3.9-slim

# Install nc (netcat) - using netcat-openbsd variant
RUN apt-get update && apt-get install -y netcat-openbsd && apt-get clean

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

RUN mkdir -p /app/migrations/versions

COPY wait_for_db.sh /wait_for_db.sh
RUN chmod +x /wait_for_db.sh

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# install production dependencies
RUN pip install gunicorn

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variables
ENV FLASK_APP=app/__init__.py
ENV FLASK_ENV=docker

# Run migrations and then start the Flask app
# CMD ["sh", "-c", "flask db upgrade && flask run --host=0.0.0.0"]
