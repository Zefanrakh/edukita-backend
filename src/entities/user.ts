import { Exclude } from "class-transformer";
import { MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
  Student = "student",
  Teacher = "teacher",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Exclude()
  @Column()
  @MinLength(6)
  password!: string;

  @Column({
    type: "simple-enum",
    enum: Role,
  })
  role!: Role;
}
