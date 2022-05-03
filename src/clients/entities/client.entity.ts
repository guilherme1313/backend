
import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';
@Table({tableName: 'clients'})
export class Client extends Model{
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number

    @Column
    name: string

    @Column
    email: string

    @Column
    telefone: string

    @Column
    cpf: string
}
