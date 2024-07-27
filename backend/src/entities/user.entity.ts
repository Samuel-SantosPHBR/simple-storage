import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "varchar" })
  email: string;
}
