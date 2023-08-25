FROM php:8.2-apache

RUN docker-php-ext-install \
    pdo_mysql \
    && a2enmod \
    rewrite

WORKDIR /app/crm-react

COPY . .



EXPOSE 8000

CMD php artisan serve --host=0.0.0.0
