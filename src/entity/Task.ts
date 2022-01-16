import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Board } from "./Board";
import { BoardColumn } from "./Column";
import { User } from "./User";

@Entity()
export class Task {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    order: number;

    @Column()
    description: string;

    @ManyToOne(() => User, user => user.tasks, { onDelete: 'SET NULL' })
    userId: string;

    @ManyToOne(() => BoardColumn, boardColumn => boardColumn.tasks)
    columnId: string;

    @ManyToOne(() => Board, board => board.tasks)
    boardId: string;
}
