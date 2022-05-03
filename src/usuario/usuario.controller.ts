import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id:number) {
    return this.usuarioService.findById(id);
  }
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Put(':id')
  update(@Param('id', ParseIntPipe) id:number, @Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.update(id, createUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id:number) {
    return this.usuarioService.delete(id);
  }
}
