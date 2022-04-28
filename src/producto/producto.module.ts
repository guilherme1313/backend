import { ProductoEntity } from './producto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ProductoEntity])],
    providers: [ProductoService],
    controllers: [ProductoController]
})
export class ProductoModule { }
