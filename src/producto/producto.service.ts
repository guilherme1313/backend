import { InjectModel } from '@nestjs/sequelize';
import { MessageDto } from './../common/message.dto';
import { ProductoDto } from './dto/producto.dto';
import { ProductoEntity } from './producto.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductoService {

    constructor(
        @InjectModel(ProductoEntity)
        private readonly productoEntity: typeof ProductoEntity,
      ) {}

    async getAll(): Promise<ProductoEntity[]> {
        const list = await this.productoEntity.findAll();
        if (!list.length) {
            throw new NotFoundException(new MessageDto('A lista esta vazia'));
        }
        return list;
    }

    async findById(id: number): Promise<ProductoEntity> {
        const producto = await this.productoEntity.findOne({where: {
            id: id
          },});
        if (!producto) {
            throw new NotFoundException(new MessageDto('Produto não existe'));
        }
        return producto;
    }


    async findByNumber(name: string): Promise<ProductoEntity> {
        const producto = await this.productoEntity.findOne({ where: {
            name: name
          }, });

        return producto;
    }

    async create(dto: ProductoDto): Promise<any> {
        const exists = await this.findByNumber(dto.name);
        if (exists) throw new BadRequestException(new MessageDto('Produto ja esta cadastrado!'))
        const producto = await this.productoEntity.create(dto as any);
        await producto.save();
        return new MessageDto('Produto cadastrado');
    }

    async update(id: number, dto: ProductoDto): Promise<any> {
        const producto = await this.findById(id);
        if (!producto)
            throw new BadRequestException(new MessageDto('Produto não existe!'));
        const exists = await this.findByNumber(dto.name);
        if (exists && exists.id !== id) throw new BadRequestException(new MessageDto('Produto ja esta cadastrado!'))
        dto.name ? producto.name = dto.name : producto.name = producto.name;
        dto.price ? producto.price = dto.price : producto.price = producto.price;
        await producto.save();
        return new MessageDto(`produto ${producto.name} atualizado`);

    }


    async delete(id: number): Promise<any> {
        const product = await this.findById(id);
        await product.destroy();
        return new MessageDto(`produto ${product.name} excluido`);
    }


}