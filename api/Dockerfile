# Use the official Python base image
FROM python:3.10.16

# Set the working directory inside the container
WORKDIR /api

# ARG REQUIREMENTS_FILE=requirements.txt

# # Copy the requirements file from the parent directory to the working directory
# COPY ${REQUIREMENTS_FILE} /api//requirements.txt

COPY . .
# Install the project dependencies
RUN pip install -r api/requirements.txt

# Copy the entire API folder to the working directory

# Expose the port on which the FastAPI server will run
EXPOSE 8000

# Start the FastAPI server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
