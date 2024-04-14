FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip \
    && docker-php-ext-install pdo_mysql \
    && a2enmod rewrite

WORKDIR /laravel-crm-react/backend

COPY composer.json composer.lock ./
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-scripts --no-autoloader

COPY . .

RUN composer dump-autoload
RUN php artisan config:cache

EXPOSE 8000

CMD php artisan serve --host=0.0.0.0
