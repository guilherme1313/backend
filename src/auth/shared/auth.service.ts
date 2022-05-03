import { UsuarioService } from './../../usuario/usuario.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {

    constructor(private usuarioService: UsuarioService, private jwtService: JwtService) {}


    async validateUser(userEmail: string, userPassword: string) {
        const user = await this.usuarioService.findByEmail(userEmail);
        const senha = await bcrypt.compare(userPassword, user.senha);
        if (user && senha) {
          const { id, nome,  email } = user;
          return {id, nome, email };
        }
        return null;
      }

      async login(user: any) {
        const payload = { email: user.email, sub: user.id, nome: user.nome };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
