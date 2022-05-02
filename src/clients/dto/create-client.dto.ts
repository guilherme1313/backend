import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';
import { IsEmail, IsString, MinLength } from "class-validator"

export class CreateClientDto {
    @IsNotBlank({ message: 'Preencha o campo nome para cadastrar o cliente' })
   @IsString()
   @MinLength(3)
    name: string

    @IsNotBlank({ message: 'Preencha o campo email para cadastrar o cliente' })
    @IsEmail()
    email: string

    @IsNotBlank({ message: 'Preencha o campo telefone para cadastrar o cliente' })
    @IsString()
    @MinLength(8)
    telefone: string

    @IsNotBlank({ message: 'Preencha o campo cpf para cadastrar o cliente' })
    @IsString()
    @MinLength(11)
    cpf: string

}
