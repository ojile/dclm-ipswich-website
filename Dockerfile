# Use the official Python image from the Docker Hub
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# install production dependencies
RUN pip install gunicorn

# Make port 5000 available to the world outside this container
EXPOSE 3000

# Define environment variables
ENV FLASK_APP=app/__init__.py
ENV FLASK_ENV=docker

# Run migrations and then start the Flask app
CMD ["sh", "-c", "flask db upgrade && flask run --host=0.0.0.0"]
