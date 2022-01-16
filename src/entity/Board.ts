import {Entity, PrimaryGeneratedColumn, Column, JoinTable, OneToMany} from "typeorm";
import { BoardColumn } from "./Column";
import { Task } from "./Task";

@Entity()
export class Board {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @JoinTable()
    columns: BoardColumn[];

    @OneToMany(() => Task, task => task.boardId)
    tasks: Task[];
}
