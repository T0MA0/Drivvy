
FROM python:3.11-slim-bullseye


RUN apt-get update && apt-get install -y \
    curl \
    gnupg2 \
    unixodbc-dev \
    build-essential \
    && curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && curl https://packages.microsoft.com/config/debian/11/prod.list > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update \
    && ACCEPT_EULA=Y apt-get install -y msodbcsql18 \
    && apt-get clean

COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

WORKDIR /app

COPY . /app/

ENV PYTHONUNBUFFERED=1

CMD ["gunicorn", "drivvy.wsgi:application", "--bind", "0.0.0.0:8000"]