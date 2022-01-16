import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Task } from "./Task";

@Entity()
export class BoardColumn {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    order: number;

    @OneToMany(() => Task, task => task.columnId)
    tasks: Task[];
}
