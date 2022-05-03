import { MessageDto } from './../common/message.dto';
import { Client } from './entities/client.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';


@Injectable()
export class ClientsService {

  constructor(
    @InjectModel(Client)
    private readonly client: typeof Client,
  ) {}

  async getAll(): Promise<Client[]> {
    const list = await this.client.findAll();
    if (!list.length) {
        throw new NotFoundException(new MessageDto('A lista esta vazia'));
    }
    return list;
  }

  async findById(id: number): Promise<Client> {
    const clients = await this.client.findOne({ where: {
      id: id
    },
  });
    if (!clients) {
        throw new NotFoundException(new MessageDto('Cliente não existe'));
    }
    return clients;
  }


  async findByEmail(email: string): Promise<Client> {
    const clients = await this.client.findOne({ where: {email: email},
  });

    return clients;
  }



    async create(dto: CreateClientDto): Promise<any> {

      
      const exists = await this.findByEmail(dto.email);
      if (exists) throw new BadRequestException(new MessageDto('Cliente ja esta cadastrado!'))
      const clients = await this.client.create(dto as any);
      await clients.save();
      return new MessageDto('Cliente cadastrado');
  }

  async update(id: number, dto: CreateClientDto): Promise<any> {
      const clients = await this.findById(id);
      if (!clients)
          throw new BadRequestException(new MessageDto('Cliente não existe!'));
      const exists = await this.findByEmail(dto.email);
      if (exists && exists.id !== id) throw new BadRequestException(new MessageDto('Cliente ja esta cadastrado!'))
      dto.name ? clients.name = dto.name : clients.name = clients.name;
      dto.email ? clients.email = dto.email : clients.email = clients.email;
      dto.telefone ? clients.telefone = dto.telefone : clients.telefone = clients.telefone;
      dto.cpf ? clients.cpf = dto.cpf : clients.cpf = clients.cpf;
     

      await clients.save();
      return new MessageDto(`Cliente ${clients.name} atualizado`);

  }


  async delete(id: number): Promise<any> {
    const clients = await this.findById(id);
      await clients.destroy();
       return new MessageDto(`Cliente ${clients.name} excluido`);
  }

}
