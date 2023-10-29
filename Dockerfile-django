FROM python:3.10.2-slim-bullseye
# RUN mkdir -p /node/node_modules && chown -R node:node /node

# add bash


# Create app directory
WORKDIR /

ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY ./django-root/requirements.txt ./
COPY ./django-root ./
RUN apt-get update 
RUN apt-get -y install libpq-dev gcc
RUN pip install -r requirements.txt

# # Pull base image
# FROM python:3.10.2-slim-bullseye
# EXPOSE 8000

# # Set environment variables


# Set work directory
# WORKDIR /code

# # Install dependencies
# COPY ./xyz/requirements.txt .
# RUN apt-get update \
#     && apt-get -y install libpq-dev gcc
# RUN pip install -r requirements.txt

# # Copy project
# COPY ./xyz .

# CMD ["ls"]
CMD ["python", "manage.py", "runserver"]
EXPOSE 8000