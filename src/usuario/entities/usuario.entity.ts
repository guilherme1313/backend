import { Model, Table, AutoIncrement, PrimaryKey, Column } from 'sequelize-typescript';
@Table({tableName: 'usuarios'})
export class Usuario extends Model{

    @AutoIncrement
    @PrimaryKey
    @Column
    id: number

    @Column
    email: string

    @Column
    nome: string

    @Column
    senha: string

 
}
