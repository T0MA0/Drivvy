
FROM python:3.10-slim-bullseye


RUN apt-get update && apt-get install -y \
    curl \
    gnupg2 \
    apt-transport-https \
    unixodbc \
    unixodbc-dev \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*


RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/debian/11/prod.list > /etc/apt/sources.list.d/mssql-release.list


RUN apt-get update && ACCEPT_EULA=Y apt-get install -y msodbcsql17


WORKDIR /app

#Függőségek telepítése
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt


COPY . /app/

#Környezeti változó
ENV PYTHONUNBUFFERED=1

# 9. Indítás

CMD ["gunicorn", "drivvy.wsgi:application", "--bind", "0.0.0.0:8000"]