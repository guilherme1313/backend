import { Entity } from 'typeorm';
import { Column } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
@Entity({name: 'clients'})
export class Client {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', nullable: false})
    name: string

    @Column({type: 'varchar', nullable: false, unique: true})
    email: string

    @Column({type: 'varchar', nullable: false})
    telefone: string

    @Column({type: 'varchar', nullable: false, unique: true})
    cpf: string
}
