import { JwtAuthGuard } from './../auth/shared/jwt.auth.guard';
import { ProductoDto } from './dto/producto.dto';
import { ProductoService } from './producto.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';

@Controller('products')
export class ProductoController {

    constructor(private readonly productoService: ProductoService){}
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(){
        return await this.productoService.getAll();
    }
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id:number){
        return await this.productoService.findById(id);
    }
    
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto:ProductoDto){
        return await this.productoService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id:number, @Body() dto:ProductoDto){
        return await this.productoService.update(id,dto);
    }
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id:number){
        return await this.productoService.delete(id);
    }
}
