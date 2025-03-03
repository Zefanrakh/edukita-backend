import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user";
import { Assignment } from "./assignment";

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Assignment)
  @JoinColumn()
  assignment!: Assignment;

  @ManyToOne(() => User)
  teacher!: User;

  @Column()
  grade!: number;

  @Column()
  feedback!: string;
}
