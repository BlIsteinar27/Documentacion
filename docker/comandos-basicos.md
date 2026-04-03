Docker – Chuleta rápida

Leyenda (flags más usados)
-a => conecta a tu consola/terminal
-i => interactivo
-t => asigna terminal
-d => ejecución en segundo plano (detached)
-v => monta un volumen o carpeta local:
     -v volumen_docker:/ruta/contenedor
     -v ./carpeta_local:/ruta/contenedor
-p => mapea puertos (host:contenedor)
. => indica el directorio actual
-f => depende del contexto:
     logs -f => follow (seguir logs en vivo)
     docker-compose -f => especificar archivo

--------------------------------------------------

Comandos básicos de Docker

Contenedores
docker create <imagen> => crea un contenedor a partir de una imagen
docker create --name <nombre> <imagen> => crea contenedor con nombre específico
docker start <contenedor> => inicia un contenedor detenido
docker start -ai <contenedor> => inicia e interactúa en consola
docker run -it ubuntu /bin/bash => corre Ubuntu en modo interactivo con bash
docker run -it --name <nombre> <imagen> <cmd> => corre contenedor con nombre y comando específico
docker run -d -p 8080:80 --name <nombre> <imagen> => ejecuta en segundo plano y expone puertos
docker ps => lista contenedores activos
docker ps -a => lista todos los contenedores
docker stop <contenedor> => detiene contenedor
docker restart <contenedor> => reinicia contenedor
docker rm <contenedor> => elimina contenedor

Atajos útiles:
docker stop $(docker ps -q) => detiene todos los contenedores
docker rm $(docker ps -aq) => elimina todos los contenedores

--------------------------------------------------

Imágenes
docker image ls  o  docker images => lista imágenes
docker pull <imagen>:<tag> => descarga imagen
docker rmi -f <imagen> => elimina imagen
docker history <imagen>:<tag> => historial de capas
docker inspect <imagen>:<tag> => muestra metadatos

--------------------------------------------------

Volúmenes
docker volume create => crea un volumen

--------------------------------------------------

Exec / Logs
docker exec -it <contenedor> <comando> => ejecuta comando dentro de contenedor vivo
docker logs -f <contenedor> => sigue logs de un contenedor específico

--------------------------------------------------

Limpieza
docker system df => muestra uso de almacenamiento
docker system prune -a => borra contenedores, imágenes y redes no usadas

--------------------------------------------------

Construcción de imágenes
docker build -t <nombre>:<tag> . => crea imagen desde Dockerfile en directorio actual
docker build -t <nombre>:<tag> <directorio> => crea imagen desde otro directorio

--------------------------------------------------

Docker Compose
docker-compose up => levanta servicios definidos en docker-compose.yml
docker-compose up -d => levanta en segundo plano
docker-compose down => detiene y elimina servicios creados por Compose
docker-compose ps => lista servicios activos
docker-compose logs -f => sigue logs de servicios
docker-compose build => construye imágenes definidas en Compose
docker-compose up --scale web=3 => escala un servicio (ejemplo: 3 instancias de Nginx)
