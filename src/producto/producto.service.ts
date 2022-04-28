import { MessageDto } from './../common/message.dto';
import { ProductoDto } from './dto/producto.dto';
import { ProductoEntity } from './producto.entity';
import { ProductoRepository } from './producto.repository';

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ProductoService {

    constructor(
        @InjectRepository(ProductoEntity)
        private productoRepository: ProductoRepository
    ) { }

    async getAll(): Promise<ProductoEntity[]> {
        const list = await this.productoRepository.find();
        if (!list.length) {
            throw new NotFoundException(new MessageDto('A lista esta vazia'));
        }
        return list;
    }

    async findById(id: number): Promise<ProductoEntity> {
        const producto = await this.productoRepository.findOne(id);
        if (!producto) {
            throw new NotFoundException(new MessageDto('Produto não existe'));
        }
        return producto;
    }


    async findByNombre(name: string): Promise<ProductoEntity> {
        const producto = await this.productoRepository.findOne({ name: name });

        return producto;
    }

    async create(dto: ProductoDto): Promise<any> {
        const exists = await this.findByNombre(dto.name);
        if (exists) throw new BadRequestException(new MessageDto('Produto ja esta cadastrado!'))
        const producto = this.productoRepository.create(dto);
        await this.productoRepository.save(producto);
        return new MessageDto('Produto cadastrado');
    }

    async update(id: number, dto: ProductoDto): Promise<any> {
        const producto = await this.findById(id);
        if (!producto)
            throw new BadRequestException(new MessageDto('Produto não existe!'));
        const exists = await this.findByNombre(dto.name);
        if (exists && exists.id !== id) throw new BadRequestException(new MessageDto('Produto ja esta cadastrado!'))
        dto.name ? producto.name = dto.name : producto.name = producto.name;
        dto.price ? producto.price = dto.price : producto.price = producto.price;
        await this.productoRepository.save(producto);
        return new MessageDto(`produto ${producto.name} atualizado`);

    }


    async delete(id: number): Promise<any> {
        const producto = await this.findById(id);
        await this.productoRepository.delete(producto);
        return new MessageDto(`produto ${producto.name} excluido`);
    }


}