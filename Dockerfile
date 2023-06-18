# obraz bazowy
FROM node:16.20.0-alpine3.18

# Informacje o autorze
LABEL author="John Doe"

# Utowrzenie katalogu roboczego
RUN mkdir -p /var/www/html

# Przekopiowanie aplikacji z hosta do kontenera
COPY server/* /var/www/html/

# Przejście / Ustawienie katalogu roboczego na /var/www/html
WORKDIR /var/www/html

# Pobranie potrzebnych modułów
RUN npm install

# Nasłuchiwania na porcie 3000
EXPOSE 3000

# Uruchomienie aplikacji
CMD ["npm", "start"]
