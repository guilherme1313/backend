import { MinLength } from 'class-validator';
import { IsString } from 'class-validator';
import { IsEmail } from 'class-validator';
import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';


export class CreateUsuarioDto {
    @IsNotBlank({ message: 'Preencha o campo email ' })
    @IsEmail()
    email: string

    @IsNotBlank({ message: 'Preencha o campo nome ' })
    @IsString()
    @MinLength(3)
    nome: string

    @IsNotBlank({ message: 'Preencha o campo senha ' })
    @IsString()
    @MinLength(6)
    senha: string
}
