# Installation

* You need docker(1.13.0+) & docker-compose 
* Please stop you local web and mysql servers, we need ports 80, 443, 3306 free
* Please run next commands
```
cd docker
docker-compose build
docker-compose up -d
docker-compose exec php-fpm-api.local composer install
docker-compose exec php-fpm-api.local cp .env.example .env
sudo chmod -R a+w ../api/storage
sudo chmod -R a+w ../api/bootstrap/cache/
docker-compose exec php-fpm-auth.local composer install
docker-compose exec php-fpm-auth.local cp .env.example .env
sudo chmod -R a+w ../auth/storage
sudo chmod -R a+w ../auth/bootstrap/cache/
docker-compose exec php-fpm-auth.local ./artisan migrate --seed
```
* Demo app ready

# Content

There three application which accessible via next urls:
* https://front.127.0.0.1.xip.io
* https://auth.127.0.0.1.xip.io
* https://api.127.0.0.1.xip.io

*NB*: please accepts all self-signed certificates

First application is browser based app which show users list and user details

Second is OAUTH2 endpoint. Please register there few users.

Third is API server which provide basic api. 

# TODO

* Move all links to configs
* Research using popups/iframe for auth process, now we redirect browser instead target page

