import { redisPublisher } from "../config/redis";
import { Assignment } from "../entities/assignment";
import { Role, User } from "../entities/user";
import { UserService } from "./userService";
import { config } from "dotenv";

config();

const userService = new UserService();

export class NotificationService {
  public async notifyTeacher(assignment: Assignment, student: User) {
    const teachers = await userService.find({
      where: {
        role: Role.Teacher,
      },
    });
    await redisPublisher.publish(
      "new_assignment",
      JSON.stringify({
        emails: teachers.map((teacher) =>
          process.env.NODE_ENV !== "production"
            ? teacher.email.replace(/@.*/, "@yopmail.com")
            : teacher.email
        ),
        assignment,
        student,
      })
    );
  }
}
