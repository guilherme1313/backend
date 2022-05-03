import { SequelizeModule } from '@nestjs/sequelize';
import { ProductoEntity } from './producto.entity';
import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';

@Module({
    imports: [SequelizeModule.forFeature([ProductoEntity])],
    providers: [ProductoService],
    controllers: [ProductoController]
})
export class ProductoModule { }
