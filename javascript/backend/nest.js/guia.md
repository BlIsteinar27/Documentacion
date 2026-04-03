1. npm i -g @nestjs/cli
2. nest new <project-name>
3. crear archivo docker-compose.yml en la raiz del proyecto para el contenedor de la base de datos

--------------------------------------------------------------------------------

services:
  mysql:
    image: mysql:8.0
    container_name: mysql_db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: db_crud
      MYSQL_USER: user_crud
      MYSQL_PASSWORD: root
    volumes:
      - ./mysql:/var/lib/mysql
    ports:
      - "3306:3306"

--------------------------------------------------------------------------------

agregar mysql en el .gitignore

4.nest g resource <nombre de la entidad> --no-spec  => genera un CRUD completo (Create, Read, Update, Delete) para una entidad de forma automática.

*Recordatorio: el nombre de la entidad debe ser singular

*Recordatorio: entrar en el <nombre de la entidad>.controller.ts y en los endpints que reciban 
parametros id quitar el '+' y dejar solo el id y que el parametro sea id: number

5. npm i class-validator class-transformer -E => para validar los datos enviados
6. pegar estas validaciones en el main.ts justo despues de 

  const app = await NestFactory.create(AppModule);

y antes de 

 await app.listen(3000);
  
  --------------------------------------------------------------------------------

    app.setGlobalPrefix("api/v1");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  --------------------------------------------------------------------------------

*Recordatorio: importar el ValidationPipes -> import { ValidationPipe } from '@nestjs/common';
*Recordatorio: el prefixo de la api es api/v1 y el path es /api/v1/users
*Recordatorio: la ruta de la api es /api/v1/users

7. $ npm i @nestjs/typeorm typeorm mysql2 -E => Para instalar TypeORM para conectar la base de datos y para validar los datos enviados y importar typeorm en app.module.ts de esta forma en los imports ->

--------------------------------------------------------------------------------

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
--------------------------------------------------------------------------------

8. ejecutar; npm i @nestjs/config -E => para instalar la libreria de configuración de nest para variables de entorno en el proyecto de backend 
9. importar la libreria de configuración en app.module.ts de esta forma en los imports ->

--------------------------------------------------------------------------------

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
   ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})

--------------------------------------------------------------------------------

10.crear un archivo .env en la rarz del proyecto con las variables de entorno que necesite para usarlas en la conexion de typeorm con la base de datos.

--------------------------------------------------------------------------------

MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=user_menu
MYSQL_PASSWORD=root
MYSQL_DATABASE=db_menu
MYSQL_SSL=false
JWT_SECRET="No usar esta palabra en produccion"

--------------------------------------------------------------------------------

11. configurar typeorm en la entidad para que typeorm cree la tabla en la base de datos con los campos que se configuraron en el modelo de la entidad. 

--------------------------------------------------------------------------------

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    email:string;

    @Column()
    password:string;
}

--------------------------------------------------------------------------------

12. para que typeorm cree la tabla en la base de datos con los campos que se configuraron en el modelo de la entidad, en el user.module.ts agregar el import de typeorm

--------------------------------------------------------------------------------

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

--------------------------------------------------------------------------------