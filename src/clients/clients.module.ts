import { SequelizeModule } from '@nestjs/sequelize';
import { Client } from './entities/client.entity';


import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';

@Module({
  imports: [SequelizeModule.forFeature([Client])],
  controllers: [ClientsController],
  providers: [ClientsService],
 
})
export class ClientsModule {}
