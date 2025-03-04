import { createClient } from "redis";
import nodemailer from "nodemailer";
import { config } from "dotenv";
import { Assignment } from "../entities/assignment";
import { User } from "../entities/user";

config();

const redisSubscriber = createClient({
  url: process.env.REDIS_URL,
});

redisSubscriber.connect();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

redisSubscriber.subscribe("new_assignment", async (message) => {
  const { assignment, student, emails } = JSON.parse(message) as {
    assignment: Assignment;
    student: User;
    emails: string[];
  };
  console.log(
    `New assignment received: ${assignment.id} from student ${student.name}`
  );

  console.log({emails})
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: emails.join(","),
    subject: "New Assignment Submitted",
    text: `A new assignment (ID: ${assignment.id}) from subject ${assignment.subject} has been submitted by student ${student.name}.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Notification email sent to teachers");
  } catch (error) {
    console.error("Error sending email:", error);
  }
});
