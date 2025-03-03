import { DataSource } from "typeorm";
import { User } from "../entities/user";
import { Assignment } from "../entities/assignment";
import { Grade } from "../entities/grade";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: ":memory",
  synchronize: true,
  logging: true,
  entities: [User, Assignment, Grade],
  migrations: ["./src/migrations/*{.ts,.js}"],
});

AppDataSource.initialize()
  .then(() => console.log("Database connected!"))
  .catch((error) => console.error("Database connection error:", error));

export { AppDataSource };
