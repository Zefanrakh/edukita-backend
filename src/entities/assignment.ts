import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user";
import { Grade } from "./grade";

export enum Subject {
  English = "English",
  Math = "Math",
}

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column({
    type: "simple-enum",
    enum: Subject,
  })
  subject!: Subject;

  @ManyToOne(() => User, (user) => user.id)
  student!: User;

  grade?: Grade;
}
