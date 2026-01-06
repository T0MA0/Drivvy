# 1. Használjunk egy hivatalos Python image-et
FROM python:3.10-slim

# 2. Szükséges rendszerfájlok telepítése (ez hiányzott eddig!)
# Frissítjük a rendszert és telepítjük a függőségeket a pyodbc-hez és MS SQL-hez
RUN apt-get update && apt-get install -y \
    curl \
    gnupg2 \
    unixodbc \
    unixodbc-dev \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# (Opcionális: Ha Microsoft SQL szervert használsz, ez a rész kell a driverhez)
# Ha nem Azure SQL-t használsz, ezt a blokkot kiveheted, de nem árt.
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && curl https://packages.microsoft.com/config/debian/11/prod.list > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update \
    && ACCEPT_EULA=Y apt-get install -y msodbcsql17

# 3. Munkakönyvtár beállítása
WORKDIR /app

# 4. Függőségek másolása és telepítése
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# 5. A projekt többi fájljának másolása
COPY . /app/

# 6. Környezeti változók beállítása (hogy a logokat lássuk)
ENV PYTHONUNBUFFERED=1

# 7. Statikus fájlok összegyűjtése (ha kell)
# RUN python manage.py collectstatic --noinput

# 8. Indítási parancs (Cseréld le a 'projektneved'-et a mappád nevére!)
# Ha nem tudod mi a projektneved: nézd meg hol van a wsgi.py fájl.
CMD ["gunicorn", "drivvy.wsgi:application", "--bind", "0.0.0.0:8000"]