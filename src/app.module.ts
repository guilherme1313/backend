import { ProductoEntity } from './producto/producto.entity';
import { Client } from './clients/entities/client.entity';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from './config/constants';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductoModule } from './producto/producto.module';
import { ClientsModule } from './clients/clients.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'tutorial_nest',
      autoLoadModels: true,
      synchronize: true,
      models:[Client, ProductoEntity]
    }),
  ProductoModule,
  ClientsModule,
  AuthModule,
  UsuarioModule
],
  controllers: [AppController],
  providers: [AppService],
  exports:[SequelizeModule]
})
export class AppModule {}
