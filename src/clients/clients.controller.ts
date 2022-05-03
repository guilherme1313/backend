import { JwtAuthGuard } from './../auth/shared/jwt.auth.guard';
import { Client } from './entities/client.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
   getAll(): Promise<Client[]>{
      return  this.clientsService.getAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id:number){
      return await this.clientsService.findById(id);
  }
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Post()
  async create(@Body() dto:CreateClientDto){
      return await this.clientsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({whitelist: true}))
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id:number, @Body() dto:CreateClientDto){
      return await this.clientsService.update(id,dto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id:number){
      return await this.clientsService.delete(id);
  }
}
