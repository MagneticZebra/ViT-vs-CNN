# Use the official Python base image
FROM python:3.11.5

# Set the working directory inside the container
WORKDIR /api

# Copy the requirements file from the parent directory to the working directory
COPY ../requirements.txt .

# Install the project dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire API folder to the working directory
COPY ./api .

# Expose the port on which the FastAPI server will run
EXPOSE 8000

# Start the FastAPI server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
