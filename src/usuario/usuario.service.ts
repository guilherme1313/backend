import { MessageDto } from './../common/message.dto';
import { Usuario } from './entities/usuario.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  
  constructor(
    @InjectModel(Usuario)
    private readonly usuario: typeof Usuario,
  ) {}

  async findAll(): Promise<Usuario[]> {
    const user = await this.usuario.findAll();
    if (!user.length) {
        throw new NotFoundException(new MessageDto('A lista esta vazia'));
    }
    return user;
  }

  async findById(id: number): Promise<Usuario> {
    const user = await this.usuario.findOne({ where: {
      id: id
    },
  });
    if (!user) {
        throw new NotFoundException(new MessageDto('Usuario não existe'));
    }
    return user;
  }


  async findByEmail(email: string): Promise<Usuario> {
    const user = await this.usuario.findOne({ where: {email: email},
  });

    return user;
  }



    async create(dto: CreateUsuarioDto): Promise<any> {
      const exists = await this.findByEmail(dto.email);
      if (exists) throw new BadRequestException(new MessageDto('Usuario ja esta cadastrado!'))

      dto.senha =  await bcrypt.hash(dto.senha, 10);

      const user = await this.usuario.create(dto as any);
      await user.save();
      return new MessageDto('Usuario cadastrado');
  }

  async update(id: number, dto: CreateUsuarioDto): Promise<any> {
      const user = await this.findById(id);
      if (!user)
          throw new BadRequestException(new MessageDto('Usuario não existe!'));
      const exists = await this.findByEmail(dto.email);
      if (exists && exists.id !== id) throw new BadRequestException(new MessageDto('Usuario ja está cadastrado!'))
      dto.email ? user.email = dto.email : user.email = user.email;
      dto.nome ? user.nome = dto.nome : user.nome = user.nome;
      dto.senha ? user.senha = dto.senha : user.senha = user.senha;
      user.senha =  await bcrypt.hash(dto.senha, 10);
      await user.save();
      return new MessageDto(`Usuario ${user.email} atualizado`);

  }


  async delete(id: number): Promise<any> {
    const user = await this.findById(id);
      await user.destroy();
       return new MessageDto(`Usuario ${user.email} excluido`);
  }
}
