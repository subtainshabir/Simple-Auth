# backend/Dockerfile
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# install build deps then python deps
COPY requirements.txt /app/
RUN apt-get update \
 && apt-get install -y --no-install-recommends gcc libpq-dev \
 && pip install --no-cache-dir -r requirements.txt \
 && apt-get purge -y --auto-remove gcc

# copy code
COPY . /app

# for development, use runserver. In production use gunicorn
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

