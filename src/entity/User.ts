import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Task } from "./Task";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    login: string;

    @Column()
    password: string;

    @OneToMany(() => Task, task => task.userId)
    tasks: Task[];
}
