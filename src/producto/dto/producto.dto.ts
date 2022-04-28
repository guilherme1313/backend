import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class ProductoDto {

    @IsNotBlank({ message: 'Preencha o campo nome para cadastrar o produto' })
    name?: string;

    @IsNumber()
    @IsNotEmpty()
   @Min(10, { message: 'O preço deve ser no minimo 10 reais' })
    price?: number;
}