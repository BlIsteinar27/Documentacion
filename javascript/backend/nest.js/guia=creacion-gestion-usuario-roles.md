1. npm i -g @nestjs/cli -> en caso de que no se tenga instalado en el equipo el cli de nest
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

deberian quedar asi :

--------------------------------------------------------------------------------

  @Post()
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursosService.create(createCursoDto);
  }

  @Get()
  findAll() {
    return this.cursosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cursosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursosService.update(id, updateCursoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cursosService.remove(id);
  }

--------------------------------------------------------------------------------

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

7. npm i @nestjs/typeorm typeorm mysql2 -E => Para instalar TypeORM para conectar la base de datos y para validar los datos enviados y importar typeorm en app.module.ts de esta forma en los imports ->

--------------------------------------------------------------------------------

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3307,
      username: "user_crud",
      password: "root",
      database: "db_crud",
      autoLoadEntities: true,
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

12. ir a el <entidad>.service.ts para inyectar el repositorio de esa misma entidad, por ejemplo algo asi deberia quedar el servicio con el el repositorio inyectado y con un ejemplo de uso:

-------------------------------------------------------------------------------
import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CursosService {

  constructor(
    @InjectRepository(Curso)
    private cursoRepository: Repository<Curso>,
  ) { }

  async create(createCursoDto: CreateCursoDto) {
    return 'This action adds a new curso';
  }

  async findAll() {
    return await this.cursoRepository.find();
  }

  async findOne(id: number) {
    return `This action returns a #${id} curso`;
  }

  async update(id: number, updateCursoDto: UpdateCursoDto) {
    return `This action updates a #${id} curso`;
  }

  async remove(id: number) {
    return `This action removes a #${id} curso`;
  }
}


----------------------------------------------------------------------------
*Recordatorio, poner los metodos del servicio como async para que los metodos sean asincronos

13. configurar el createdto con el los decoradores de class-validator para validar los datos entrantes, deberia quedar algo como este ejemplo 

--------------------------------------------------------------------------
import { IsString } from "class-validator";

export class CreateCursoDto {
    @IsString()
    nombre: string

}

-----------------------------------------------------------------------------

14. ir al servicio de la entidad de la cual se acaba de configurar el dto y usarlo, algo asi deberia quedar el codigo 

**Recordatorio: el dto del update usa el dto del create

-----------------------------------------------------------------

import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CursosService {

  constructor(
    @InjectRepository(Curso)
    private cursoRepository: Repository<Curso>,
  ) { }

  async create(createCursoDto: CreateCursoDto) {
    return await this.cursoRepository.save(createCursoDto)
  }

  async findAll() {
    return await this.cursoRepository.find();
  }

  async findOne(id: number) {
    return await this.cursoRepository.findOneBy({id})
  }

  async update(id: number, updateCursoDto: UpdateCursoDto) {
    return await this.cursoRepository.update(id,updateCursoDto)
  }

  async remove(id: number) {
    return await this.cursoRepository.softDelete({id})
  }
}


-----------------------------------------------------------------
15. luego de configurar el servicio, ir al module de la entidad y exportar el servicio para que pueda ser usado en otros modulos
 por ejemplo :
----------------------------------------------------------------------

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
----------------------------------------------------------------------
16. crear modulo de auth, ejecutar siguientes comandos: 
----------------------------------------------------------------------
nest g module auth
nest g controller auth
nest g service auth
----------------------------------------------------------------------
17. preparar terreno para implementacion de autenticacion con jwt. instalar los siguientes paquetes:

bcryptjs

npm install @nestjs/jwt

18. importar el servicio de jwt en auth module de esta forma :
--------------------------------------------------------------
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { ProfileModule } from 'src/profile/profile.module';
import { RoleModule } from 'src/role/role.module';
import { RolePermissionModule } from 'src/role-permission/role-permission.module';
import { PermissionModule } from 'src/permission/permission.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    UserModule,           // Para crear usuarios
    ProfileModule,        // Para crear perfiles
    RoleModule,           // Para asignar rol por defecto
    PermissionModule,     // Para manejar permisos específicos (opcional en auth)
    RolePermissionModule, // Para validar relaciones si es necesario
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
----------------------------------------------------------------------------
19. crear archivo constants.ts en una carpeta constants dentro de la carpeta auth con el siguiente contenido:
----------------------------------------------------------------------------
export const jwtConstants = {
  secret: 'secretKey',
};
----------------------------------------------------------------------------
20. luego ir a inyectar el servicio de jwt en auth service de esta forma y tambien usar bycrypt para el register y login de esta forma:
---------------------------------------------------------------------------
import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ProfileService } from 'src/profile/profile.service';
import { RoleService } from 'src/role/role.service';
import { UserService } from 'src/user/user.service';
import { PermissionService } from 'src/permission/permission.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'src/profile/entities/profile.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly profileService: ProfileService,
        private readonly roleService: RoleService,
        private readonly permissionService: PermissionService,
        private jwtService: JwtService
    ) { }

    async register(registerDto: RegisterDto) {

        // auth.service.ts línea 26
        const userExists = await this.userService.existsByEmail(registerDto.email);
        if (userExists) {
            throw new ConflictException('User already exists');
        }
        const newUser = await this.userService.create({
            email: registerDto.email,
            password: await bcrypt.hash(registerDto.password, 10),
        });

        // 2. Obtener rol por defecto (RoleModule)
        const defaultRole = await this.roleService.findByName('user');
        if (!defaultRole) {
            throw new NotFoundException('Default role not found');
        }

        const profile = await this.profileService.create({
            userId: newUser.id,
            roleId: defaultRole.id,
            firstName: registerDto.firstName,
            lastName: registerDto.lastName,
            bio: '',
            avatar: ''
        });
        return { user: newUser, profile };
    }

    async login(loginDto: LoginDto) {
        const user = await this.userService.findByEmail(loginDto.email);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const valid = await bcrypt.compare(loginDto.password, user.password);
        if (!valid) throw new UnauthorizedException('Invalid credentials');

        const profile = await this.profileService.findByUserId(user.id);
        if (!profile) throw new UnauthorizedException('Profile not found');

        const tokens = await this.generateTokens(user, profile);
        return { user, profile, tokens };
    }

    // Calcular permisos efectivos (AuthModule orquesta la consulta)
    async getEffectivePermissions(userId: string): Promise<string[]> {
        const profile = await this.profileService.findByUserId(userId);
        if (!profile) return [];

        // Obtener permisos del rol (RoleModule)
        const rolePermissions = await this.roleService.getPermissions(profile.roleId);

        // Obtener permisos específicos (PermissionModule)
        const specificPermissions = await this.permissionService.findByIds(
            profile.specificPermissionIds || []
        );

        // Unir y devolver códigos únicos
        const all = [...rolePermissions, ...specificPermissions];
        const unique = Array.from(new Map(all.map(p => [p.code, p])).values());

        return unique.map(p => p.code);
    }

    private async generateTokens(user: User, profile: Profile) {
        const permissions = await this.getEffectivePermissions(user.id);

        const payload = {
            sub: user.id,
            email: user.email,
            roleId: profile.roleId,
            permissions,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}


---------------------------------------------------------------------------
21. ejecutar este comando para crear el guard:
nest g guard auth/guard/auth --no-spec
dejarlo asi: 
---------------------------------------------------------------------------
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // El objeto context proporciona información
    // sobre la solicitud entrante y el entorno de ejecución.
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    // 4. Verificar que el token sea válido
    try {
      // 💡 Aquí se utiliza la clave secreta JWT que se pasó en el JwtModule
      // para verificar la carga útil del token
      const payload = await this.jwtService.verifyAsync(token);

      // 💡 Aquí se adjunta la información del usuario al request
      // para que esté disponible en los controladores
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    // 5. Si todo está bien, permitir acceso
    return true;
  }

  /**
   * @method extractTokenFromHeader
   * @description Método helper para extraer el JWT del header Authorization
   * 
   * @param request - Objeto request de Express que contiene los headers
   * @returns string | undefined - Token JWT si existe y tiene formato correcto
   * 
   * Formato esperado del header:
   * Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    // 1. Obtener el header Authorization (puede ser undefined)
    const authHeader = request.headers.authorization;

    // 2. Si no hay header, retornar undefined
    if (!authHeader) {
      return undefined;
    }

    // 3. Dividir el header en tipo y token
    // "Bearer token_jwt" -> ["Bearer", "token_jwt"]
    const [type, token] = authHeader.split(" ");

    // 4. Verificar que el tipo sea "Bearer" y que exista token
    // Si no es "Bearer", podría ser otro tipo de autenticación que no soportamos
    return type === "Bearer" ? token : undefined;
  }
}
------------------------------------------------------------------------
para luego usarlo de esta forma 
------------------------------------------------------------------------
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
    
    @Get('profile')
    @UseGuards(AuthGuard)
    getProfile(@Request() req: any) {
        return this.authService.getProfile(req.user.id);
    }
}
---------------------------------------------------------------------------
22. luego crear decoradores de roles y permisos de esta forma : 
---------------------------------------------------------------------------

import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

---------------------------------------------------------------------------
import { SetMetadata } from "@nestjs/common";

export const Permissions = (...permissions: string[]) => SetMetadata('permissions', permissions);

---------------------------------------------------------------------------
23. luego crear el guard de roles y permisos de esta forma : 
---------------------------------------------------------------------------
 nest g guard auth/guard/roles --flat --no-spec
 nest g guard auth/guard/permissions --flat --no-spec

 luego de crear  los decoradores y los guards, se va a implementar Reflector en los guard para poder validar los metadatos:

 *Recordatorio, el roles guard y permissions guard van a retornar solo un booleano de esta forma *
-------------------------------------------------------------------------
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean {
    // 1. Obtener roles requeridos del decorador @Roles
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    //console.log(requiredRoles);

    // 2. Si no se requieren roles, permitir acceso
    if (!requiredRoles) {
      return true;
    }

    // 3. Obtener usuario del request
    const { user } = context.switchToHttp().getRequest();

    // 4. Verificar si el usuario tiene el rol requerido
    return requiredRoles.includes(user.roleName);
  }
}
-------------------------------------------------------------------------------
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    // 1. Obtener permisos requeridos del decorador @Permissions
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>('permissions', [
      context.getHandler(),
      context.getClass(),
    ]);

    // 2. Si no se requieren permisos, permitir acceso
    if (!requiredPermissions) {
      return true;
    }

    // 3. Obtener usuario del request
    const { user } = context.switchToHttp().getRequest();

    // 4. Verificar si el usuario tiene TODOS los permisos requeridos
    return requiredPermissions.every(permission =>
      user.permissions?.includes(permission)
    );
  }
}
--------------------------------------------------------------------------------
24. luego crear decorador de auth para roles y permisos:
-------------------------------------------------------------------------------
import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";
import { PermissionsGuard } from "../guard/permissions.guard";
import { Roles } from "./roles.decorator";
import { Permissions } from "./permissions.decorator";

// Versión simple: Solo roles
export function Auth(role: string) {
    return applyDecorators(
        Roles(role),
        UseGuards(AuthGuard, RolesGuard)
    );
}

// Versión avanzada: Roles + Permisos
export function AuthWithPermissions(role: string, permissions: string[]) {
    return applyDecorators(
        Roles(role),
        Permissions(...permissions),
        UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
    );
}

// Versión flexible: Solo autenticación (sin verificación de roles)
export function Authenticated() {
    return applyDecorators(
        UseGuards(AuthGuard)
    );
}
---------------------------------------------------------------------------------
25. para luego reemplazar asi :
---------------------------------------------------------------------------------
import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Auth } from './decorators/auth.decorator';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @Auth('admin')
    profile(@Request() req) {
        return this.authService.profile(req.user.sub);
    }
}
---------------------------------------------------------------------------------
26. luego ir a user.entity.ts y agregar select:false a la password de esta manera :
---------------------------------------------------------------------------------

import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false, select: false })
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
---------------------------------------------------------------------------------
27. crear metodo findOneByEmailWithPassword en user.service.ts:
---------------------------------------------------------------------------------
 async findOneByEmailWithPassword(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }
---------------------------------------------------------------------------------
luego ir a auth service y usar el metodo creado previamente en login
---------------------------------------------------------------------------------

    async login(loginDto: LoginDto) {
        const user = await this.userService.findOneByEmailWithPassword(loginDto.email);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const valid = await bcrypt.compare(loginDto.password, user.password);
        if (!valid) throw new UnauthorizedException('Invalid credentials');

        const profile = await this.profileService.findByUserId(user.id);
        if (!profile) throw new UnauthorizedException('Profile not found');

        const role = await this.roleService.findById(profile.roleId);
        const tokens = await this.generateTokens(user, profile, role);
        return {
            user: {
                id: user.id,
                email: user.email,
            },
            profile: {
                id: profile.id,
                firstName: profile.firstName,
                lastName: profile.lastName,
                role: {
                    id: role.id,
                    name: role.name
                },
                avatar: profile.avatar
            },
            tokens
        };
    }
------------------------------------------------------------------------------------
28. luego ir a roles guard y agregar esta linea de codigo:
------------------------------------------------------------------------------------
import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleService } from '../../role/role.service';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);
  private roleCache = new Map<string, number>(); // Cache: roleName -> level

  constructor(
    private reflector: Reflector,
    private roleService: RoleService
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    // 1. Obtener roles requeridos del decorador @Roles
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // 2. Si no se requieren roles, permitir acceso
    if (!requiredRoles) {
      return true;
    }

    // 3. Obtener usuario del request
    const { user } = context.switchToHttp().getRequest();

    // 4. Log para auditoría
    this.logger.log(`User ${user.email} (level ${user.roleLevel}) accessing roles: ${requiredRoles.join(', ')}`);

    // 5. Sistema jerárquico dinámico con cache
    return this.hasAccess(user.roleLevel, requiredRoles);
  }

  /**
   * Verifica si un rol tiene acceso basado en jerarquía dinámica con cache
   */
  private async hasAccess(userRoleLevel: number, requiredRoles: string[]): Promise<boolean> {
    // Obtener niveles de roles requeridos (con cache)
    const requiredLevels = await this.getRoleLevels(requiredRoles);

    // Verificar si el usuario tiene acceso a alguno de los roles requeridos
    const hasAccess = requiredLevels.some(requiredLevel =>
      userRoleLevel >= requiredLevel
    );

    // Log de resultado para auditoría
    this.logger.log(`Access ${hasAccess ? 'GRANTED' : 'DENIED'} for user level ${userRoleLevel} vs required levels ${requiredLevels.join(', ')}`);

    return hasAccess;
  }

  /**
   * Obtiene niveles de roles con cache para optimizar performance
   */
  private async getRoleLevels(roleNames: string[]): Promise<number[]> {
    const levels: number[] = [];
    const uncachedRoles: string[] = [];

    // Revisar cache primero
    for (const roleName of roleNames) {
      if (this.roleCache.has(roleName)) {
        levels.push(this.roleCache.get(roleName)!);
      } else {
        uncachedRoles.push(roleName);
      }
    }

    // Obtener roles no cacheados de la BD
    if (uncachedRoles.length > 0) {
      const rolesFromDb = await this.roleService.findMultipleByNames(uncachedRoles);

      // Actualizar cache y obtener niveles
      for (const role of rolesFromDb) {
        this.roleCache.set(role.name, role.level);
        levels.push(role.level);
      }
    }

    return levels;
  }
}
------------------------------------------------------------------
y tambien permission guard:
---------------------------------------------------------------------
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    // 1. Obtener permisos requeridos del decorador @Permissions
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>('permissions', [
      context.getHandler(),
      context.getClass(),
    ]);

    // 2. Si no se requieren permisos, permitir acceso
    if (!requiredPermissions) {
      return true;
    }

    // 3. Obtener usuario del request
    const { user } = context.switchToHttp().getRequest();

    // 4. Los usuarios con nivel alto (ej: admin level >= 10) tienen acceso a todos los permisos
    if (user.roleLevel >= 10) {
      return true;
    }

    // 5. Verificar si el usuario tiene TODOS los permisos requeridos
    return requiredPermissions.every(permission =>
      user.permissions?.includes(permission)
    );
  }
}
------------------------------------------------------------------
Para que quede funcionando perfectamente asi los guard:
-----------------------------------------------------------
import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Auth } from './decorators/auth.decorator';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @Auth('user')
    profile(@Request() req) {
        return this.authService.profile(req.user.sub);
    }
}
---------------------------------------------------------------------
29. Crear seeds para crear roles genericos:
---------------------------------------------------------------------

crear esta arquitectura para los seeder

database/seeds/
├── interfaces/seed.interface.ts     # Contratos base
├── abstract/base.seed.ts           # Clase reutilizable
├── seed.manager.ts                 # Orquestador principal
├── seed.service.ts                 # Servicio NestJS
├── seed.cli.ts                     # CLI potente
├── database-clean.seed.ts           # Cleanup de BD
└── role.seed.ts                    # Seed de roles (refactorizado)
└── seed.module.ts                    # Módulo para los seeds

crear archivo seed.interface.ts 
---------------------------------------------------------------------
/**
 * Interfaz base para todos los seeds
 */
export interface Seed {
  /**
   * Nombre del seed (para logging y ordenamiento)
   */
  readonly name: string;

  /**
   * Prioridad de ejecución (menor número = se ejecuta primero)
   */
  readonly priority: number;

  /**
   * Si debe ejecutarse solo en desarrollo
   */
  readonly developmentOnly?: boolean;

  /**
   * Ejecuta el seed
   */
  run(): Promise<void>;

  /**
   * Revierte el seed (opcional, para rollback)
   */
  rollback?(): Promise<void>;
}

/**
 * Interfaz para el gestor de seeds
 */
export interface SeedManager {
  /**
   * Ejecuta todos los seeds
   */
  runAll(options?: SeedRunOptions): Promise<void>;

  /**
   * Ejecuta un seed específico
   */
  runOne(seedName: string): Promise<void>;

  /**
   * Lista todos los seeds disponibles
   */
  list(): Seed[];

  /**
   * Revierte todos los seeds
   */
  rollbackAll(): Promise<void>;
}

export interface SeedRunOptions {
  /**
   * Forzar ejecución incluso si ya existen
   */
  force?: boolean;

  /**
   * Ejecutar solo seeds de desarrollo
   */
  developmentOnly?: boolean;

  /**
   * Hacer rollback si hay error
   */
  rollbackOnError?: boolean;
}

---------------------------------------------------------------------
crear base.seed.ts 
---------------------------------------------------------------------
import { Logger } from '@nestjs/common';
import { Seed } from '../interfaces/seed.interface';

/**
 * Clase base abstracta para todos los seeds
 * Proporciona funcionalidad común y logging estructurado
 */
export abstract class BaseSeed implements Seed {
  protected readonly logger: Logger;

  constructor(public readonly name: string, public readonly priority: number = 10, public readonly developmentOnly: boolean = false) {
    this.logger = new Logger(`${this.constructor.name}:${this.name}`);
  }

  /**
   * Método abstracto que deben implementar todos los seeds
   */
  abstract run(): Promise<void>;

  /**
   * Rollback opcional (por defecto no hace nada)
   */
  async rollback(): Promise<void> {
    this.logger.warn(`No rollback implementation for seed '${this.name}'`);
  }

  /**
   * Método de utilidad para verificar si un registro ya existe
   */
  protected async exists<T>(
    repository: any,
    where: any,
    identifier: string = 'record'
  ): Promise<boolean> {
    try {
      const record = await repository.findOne({ where });
      return !!record;
    } catch (error) {
      this.logger.error(`Error checking if ${identifier} exists:`, error);
      return false;
    }
  }

  /**
   * Método de utilidad para crear registro si no existe
   */
  protected async createIfNotExists<T>(
    repository: any,
    data: any,
    identifier: string = 'record'
  ): Promise<T | null> {
    try {
      // Verificar si ya existe
      const exists = await this.exists(repository, { name: data.name }, identifier);
      
      if (exists) {
        this.logger.log(`${identifier} '${data.name}' already exists, skipping`);
        return null;
      }

      // Crear nuevo registro
      const entity = repository.create(data);
      const saved = await repository.save(entity);
      
      this.logger.log(`${identifier} '${data.name}' created successfully`);
      return saved;
    } catch (error) {
      this.logger.error(`Error creating ${identifier}:`, error);
      throw error;
    }
  }

  /**
   * Método de utilidad para truncar tabla
   */
  protected async truncateTable(repository: any, tableName: string): Promise<void> {
    try {
      // Desactivar restricciones de clave externa (MySQL)
      await repository.query('SET FOREIGN_KEY_CHECKS = 0');
      
      // Truncar tabla
      await repository.query(`TRUNCATE TABLE ${tableName}`);
      
      // Reactivar restricciones
      await repository.query('SET FOREIGN_KEY_CHECKS = 1');
      
      this.logger.log(`Table '${tableName}' truncated successfully`);
    } catch (error) {
      this.logger.error(`Error truncating table '${tableName}':`, error);
      throw error;
    }
  }
}

---------------------------------------------------------------------
crear seed.manager.ts   
---------------------------------------------------------------------
import { Injectable, Logger } from '@nestjs/common';
import { Seed, SeedManager, SeedRunOptions } from './interfaces/seed.interface';

@Injectable()
export class SeedManagerService implements SeedManager {
  private readonly logger = new Logger(SeedManagerService.name);
  private seeds: Seed[] = [];

  /**
   * Registra un seed para ser ejecutado
   */
  register(seed: Seed): void {
    this.seeds.push(seed);
    this.logger.log(`Seed '${seed.name}' registered with priority ${seed.priority}`);
  }

  /**
   * Ejecuta todos los seeds en orden de prioridad
   */
  async runAll(options: SeedRunOptions = {}): Promise<void> {
    const {
      force = false,
      developmentOnly = false,
      rollbackOnError = true
    } = options;

    this.logger.log('Starting seed execution...');

    // Ordenar seeds por prioridad
    const sortedSeeds = this.seeds
      .filter(seed => !developmentOnly || !seed.developmentOnly)
      .sort((a, b) => a.priority - b.priority);

    this.logger.log(`Found ${sortedSeeds.length} seeds to execute`);

    for (const seed of sortedSeeds) {
      try {
        this.logger.log(`Executing seed: ${seed.name} (priority: ${seed.priority})`);

        if (force) {
          this.logger.log(`Force executing seed: ${seed.name}`);
        }

        await seed.run();
        this.logger.log(`Seed '${seed.name}' completed successfully`);

      } catch (error) {
        this.logger.error(`Seed '${seed.name}' failed:`, error);

        if (rollbackOnError) {
          this.logger.log(`Rolling back completed seeds due to error...`);
          await this.rollbackCompleted(sortedSeeds, seed);
        }

        throw error;
      }
    }

    this.logger.log('All seeds executed successfully!');
  }

  /**
   * Ejecuta un seed específico
   */
  async runOne(seedName: string): Promise<void> {
    const seed = this.seeds.find(s => s.name === seedName);

    if (!seed) {
      throw new Error(`Seed '${seedName}' not found`);
    }

    this.logger.log(`Executing seed: ${seedName}`);
    await seed.run();
    this.logger.log(`Seed '${seedName}' completed successfully`);
  }

  /**
   * Lista todos los seeds disponibles
   */
  list(): Seed[] {
    return [...this.seeds].sort((a, b) => a.priority - b.priority);
  }

  /**
   * Revierte todos los seeds en orden inverso
   */
  async rollbackAll(): Promise<void> {
    this.logger.log('Starting seed rollback...');

    // Ordenar seeds por prioridad descendente (rollback en orden inverso)
    const sortedSeeds = [...this.seeds].sort((a, b) => b.priority - a.priority);

    for (const seed of sortedSeeds) {
      try {
        this.logger.log(`Rolling back seed: ${seed.name}`);
        if (seed.rollback) {
          await seed.rollback();
          this.logger.log(`Seed '${seed.name}' rolled back successfully`);
        } else {
          this.logger.log(`Seed '${seed.name}' has no rollback implementation`);
        }
      } catch (error) {
        this.logger.error(`Failed to rollback seed '${seed.name}':`, error);
        // Continuar con el rollback de otros seeds
      }
    }

    this.logger.log('Seed rollback completed!');
  }

  /**
   * Revierte los seeds completados hasta el punto de error
   */
  private async rollbackCompleted(seeds: Seed[], failedSeed: Seed): Promise<void> {
    const completedIndex = seeds.indexOf(failedSeed);
    const completedSeeds = seeds.slice(0, completedIndex).reverse(); // Orden inverso

    for (const seed of completedSeeds) {
      try {
        this.logger.log(`Rolling back seed: ${seed.name}`);
        if (seed.rollback) {
          await seed.rollback();
          this.logger.log(`Seed '${seed.name}' rolled back successfully`);
        } else {
          this.logger.log(`Seed '${seed.name}' has no rollback implementation`);
        }
      } catch (error) {
        this.logger.error(`Failed to rollback seed '${seed.name}':`, error);
      }
    }
  }
}
------------------------------------------------------------------------
crear seed.service.ts
------------------------------------------------------------------------
import { Injectable } from '@nestjs/common';
import { SeedManagerService } from './seed.manager';
import { RoleSeed } from './role.seed';
import { DatabaseCleanSeed } from './database-clean.seed';
import { SeedRunOptions } from './interfaces/seed.interface';

@Injectable()
export class SeedService {
  constructor(
    private seedManager: SeedManagerService,
    private roleSeed: RoleSeed,
    private databaseCleanSeed: DatabaseCleanSeed,
  ) {
    // Registrar todos los seeds disponibles
    this.registerSeeds();
  }

  private registerSeeds(): void {
    this.seedManager.register(this.databaseCleanSeed);
    this.seedManager.register(this.roleSeed);
  }

  async runSeeds(options?: SeedRunOptions) {
    try {
      await this.seedManager.runAll(options);
    } catch (error) {
      console.error('Error running seeds:', error);
      throw error;
    }
  }

  /**
   * Ejecuta solo el cleanup de la base de datos
   */
  async cleanDatabase(): Promise<void> {
    await this.seedManager.runOne('database-clean');
  }

  /**
   * Ejecuta solo los roles
   */
  async createRoles(): Promise<void> {
    await this.seedManager.runOne('roles');
  }

  /**
   * Lista todos los seeds disponibles
   */
  listSeeds() {
    return this.seedManager.list();
  }

  /**
   * Revierte todos los seeds
   */
  async rollbackSeeds(): Promise<void> {
    await this.seedManager.rollbackAll();
  }
}
------------------------------------------------------------------------
crear seed.cli.ts 
------------------------------------------------------------------------
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { SeedService } from './seed.service';
import { SeedRunOptions } from './interfaces/seed.interface';

interface CliOptions {
  seed?: string;        // Nombre del seed específico a ejecutar (clean, roles, all)
  force?: boolean;      // Forzar ejecución
  rollback?: boolean;   // Hacer rollback
  list?: boolean;       // Listar seeds disponibles
  development?: boolean; // Solo seeds de desarrollo
}

async function runSeeds() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = app.get(SeedService);

  // Parsear argumentos de línea de comandos
  const args = process.argv.slice(2);
  const options: CliOptions = {};

  // Buscar nombre del seed
  const seedIndex = args.findIndex(arg => !arg.startsWith('--'));
  if (seedIndex !== -1) {
    options.seed = args[seedIndex];
  }

  if (args.includes('--force')) options.force = true;
  if (args.includes('--rollback')) options.rollback = true;
  if (args.includes('--list')) options.list = true;
  if (args.includes('--development')) options.development = true;

  try {
    if (options.list) {
      console.log('Available seeds:');
      const seeds = seedService.listSeeds();
      seeds.forEach(seed => {
        console.log(`  - ${seed.name} (priority: ${seed.priority}, dev-only: ${seed.developmentOnly || false})`);
      });
      return;
    }

    if (options.rollback) {
      console.log('Rolling back all seeds...');
      await seedService.rollbackSeeds();
      console.log('Rollback completed successfully!');
      return;
    }

    // Determinar qué seeds ejecutar
    const seedName = options.seed || 'all';

    console.log(`Running seed: ${seedName}...`);

    const seedOptions: SeedRunOptions = {
      force: options.force,
      developmentOnly: options.development,
      rollbackOnError: true,
    };

    switch (seedName) {
      case 'clean':
      case 'database-clean':
        await seedService.cleanDatabase();
        console.log('✅ Database cleaned successfully!');
        break;

      case 'roles':
        await seedService.createRoles();
        console.log('✅ Roles created successfully!');
        break;

      case 'all':
        await seedService.runSeeds(seedOptions);
        console.log('✅ All seeds completed successfully!');
        break;

      default:
        console.error(`❌ Unknown seed: ${seedName}`);
        console.log('\nAvailable seeds: clean, roles, all');
        process.exit(1);
    }

  } catch (error) {
    console.error('Error running seeds:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

// Mostrar ayuda
if (process.argv.includes('--help')) {
  console.log(`
🌱 Database Seeder CLI

Usage: npm run seed [seed-name] [options]

Seeds:
  clean           Clean database (truncate all tables)
  roles           Create default roles
  all             Run all seeds (clean + roles)

Options:
  --force         Force seed execution (ignore existing data)
  --rollback      Rollback all seeds
  --list          List available seeds
  --development   Run only development-only seeds
  --help          Show this help message

Examples:
  npm run seed:clean              # Only clean database
  npm run seed:roles              # Only create roles
  npm run seed:all                # Clean + create roles
  npm run seed all -- --force     # Force run all seeds
  npm run seed -- --list          # List available seeds
  npm run seed -- --rollback      # Rollback all seeds
`);
  process.exit(0);
}

// Si no hay argumentos, mostrar ayuda
if (process.argv.length === 2) {
  console.log('\n⚠️  No seed specified. Use --help for usage information.\n');
  process.exit(0);
}

runSeeds();
------------------------------------------------------------------------
crear database-clean.seed.ts
------------------------------------------------------------------------
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseSeed } from './abstract/base.seed';
import { Seed } from './interfaces/seed.interface';

// Importar todas las entidades que necesites truncar
import { User } from '../../user/entities/user.entity';
import { Role } from '../../role/entities/role.entity';
import { Permission } from '../../permission/entities/permission.entity';
import { Profile } from '../../profile/entities/profile.entity';

@Injectable()
export class DatabaseCleanSeed extends BaseSeed implements Seed {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {
    super('database-clean', 0, true); // Prioridad 0 = se ejecuta primero, solo en desarrollo
  }

  async run(): Promise<void> {
    this.logger.log('Starting database cleanup...');
    
    try {
      // Orden de truncación (de más dependiente a menos dependiente)
      const tables = [
        { repository: this.profileRepository, name: 'profiles' },
        { repository: this.userRepository, name: 'users' },
        { repository: this.roleRepository, name: 'roles' },
        { repository: this.permissionRepository, name: 'permissions' },
      ];

      for (const table of tables) {
        await this.truncateTable(table.repository, table.name);
      }

      this.logger.log('Database cleanup completed successfully!');
    } catch (error) {
      this.logger.error('Database cleanup failed:', error);
      throw error;
    }
  }

  async rollback(): Promise<void> {
    this.logger.warn('Cannot rollback database cleanup operation');
  }
}
------------------------------------------------------------------------
crear role.seed.ts 
------------------------------------------------------------------------
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseSeed } from './abstract/base.seed';
import { Seed } from './interfaces/seed.interface';
import { Role } from '../../role/entities/role.entity';

@Injectable()
export class RoleSeed extends BaseSeed implements Seed {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {
    super('roles', 10); // Prioridad 10 = se ejecuta después del cleanup
  }

  async run(): Promise<void> {
    this.logger.log('Creating roles...');

    // Definir roles con sus niveles jerárquicos
    const roles = [
      {
        name: 'guest',
        level: 1,
        description: 'Usuario invitado - solo lectura',
        isActive: true,
      },
      {
        name: 'user',
        level: 2,
        description: 'Usuario básico - acceso a su perfil',
        isActive: true,
      },
      {
        name: 'moderator',
        level: 5,
        description: 'Moderador - gestión de contenido',
        isActive: true,
      },
      {
        name: 'admin',
        level: 10,
        description: 'Administrador - acceso completo',
        isActive: true,
      },
      {
        name: 'super_admin',
        level: 15,
        description: 'Super administrador - acceso total',
        isActive: true,
      },
      {
        name: 'root',
        level: 20,
        description: 'Root - acceso irrestricto',
        isActive: true,
      },
    ];

    // Crear cada rol si no existe
    for (const roleData of roles) {
      await this.createIfNotExists(this.roleRepository, roleData, 'role');
    }

    this.logger.log('Roles seed completed successfully!');
  }

  async rollback(): Promise<void> {
    await this.truncateTable(this.roleRepository, 'roles');
    this.logger.log('Roles rollback completed');
  }
}
------------------------------------------------------------------------
crear seed.module.ts:
------------------------------------------------------------------------
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { SeedManagerService } from './seed.manager';
import { RoleSeed } from './role.seed';
import { DatabaseCleanSeed } from './database-clean.seed';

// Importar entidades necesarias
import { User } from '../../user/entities/user.entity';
import { Role } from '../../role/entities/role.entity';
import { Permission } from '../../permission/entities/permission.entity';
import { Profile } from '../../profile/entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Permission, Profile]),
  ],
  providers: [
    SeedService,
    SeedManagerService,
    RoleSeed,
    DatabaseCleanSeed,
  ],
  exports: [
    SeedService,
    SeedManagerService,
  ],
})
export class SeedModule {}
------------------------------------------------------------------------
importar de esta forman en el app.module para que funcione 
------------------------------------------------------------------------
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { ProfileModule } from './profile/profile.module';
import { RolePermissionModule } from './role-permission/role-permission.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './database/seeds/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),

    UserModule, RoleModule, PermissionModule, ProfileModule, RolePermissionModule, AuthModule, SeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
------------------------------------------------------------------------
crear estos script en el package.json:
------------------------------------------------------------------------
    "scripts": {
     "seed": "ts-node src/database/seeds/seed.cli.ts",
    "seed:clean": "ts-node src/database/seeds/seed.cli.ts clean",
    "seed:roles": "ts-node src/database/seeds/seed.cli.ts roles",
    "seed:all": "ts-node src/database/seeds/seed.cli.ts all",
    "seed:list": "ts-node src/database/seeds/seed.cli.ts -- --list",
    "seed:rollback": "ts-node src/database/seeds/seed.cli.ts -- --rollback"
  },
------------------------------------------------------------------------
****usar el comando**** 
# Ejecutar seeds manualmente cuando lo necesites
npm run seed -- --list
---------------------------------------------------------------------
30. crear decorador para la request con la siguiente arquitectura
----------------------------------------------------------------------
src/common/interfaces/auth-user.interface.ts
export interface AuthUser {
  sub: string;        // Tu ID de usuario
  email: string;      // Email del usuario
  role: string;       // Rol del usuario
  iat?: number;       // Timestamp de creación
  exp?: number;       // Timestamp de expiración
}
-------------------------------------------------------------------------
common/decorators/user.decorator.ts

import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthUser } from '../interfaces/auth.user.interface';
 
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthUser => {
    const request = ctx.switchToHttp().getRequest();
    
    if (!request.user) {
      throw new UnauthorizedException('User not found in request');
    }
    
    return request.user as AuthUser;
  },
);
------------------------------------------------------------------------
***para que luego en controller se pueda usar de la siguiente manera:***
-------------------------------------------------------------------------
import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Auth } from './decorators/auth.decorator';
import { User } from '../common/decorators/user.decorator';
import type { AuthUser } from '../common/interfaces/auth.user.interface';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @Auth('user')
    profile(@User() user: AuthUser) {
        return this.authService.profile(user.sub);
    }
}

-------------------------------------------------------------------------




