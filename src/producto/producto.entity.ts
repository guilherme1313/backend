
import { Table, Model, PrimaryKey, Column, AutoIncrement } from 'sequelize-typescript';
@Table({tableName: 'product'})
export class ProductoEntity extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column
    name: string;

    @Column
    price: number;
}