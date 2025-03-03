import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTeacherRelation1740912322909 implements MigrationInterface {
    name = 'UpdateTeacherRelation1740912322909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_grade" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "grade" integer NOT NULL, "feedback" varchar NOT NULL, "assignmentId" integer, "teacherId" integer, CONSTRAINT "REL_88a81bf856632af9c5e762d098" UNIQUE ("assignmentId"), CONSTRAINT "REL_8465191943752aee14abd9988b" UNIQUE ("teacherId"), CONSTRAINT "FK_8465191943752aee14abd9988b5" FOREIGN KEY ("teacherId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_88a81bf856632af9c5e762d0985" FOREIGN KEY ("assignmentId") REFERENCES "assignment" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_grade"("id", "grade", "feedback", "assignmentId", "teacherId") SELECT "id", "grade", "feedback", "assignmentId", "teacherId" FROM "grade"`);
        await queryRunner.query(`DROP TABLE "grade"`);
        await queryRunner.query(`ALTER TABLE "temporary_grade" RENAME TO "grade"`);
        await queryRunner.query(`CREATE TABLE "temporary_grade" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "grade" integer NOT NULL, "feedback" varchar NOT NULL, "assignmentId" integer, "teacherId" integer, CONSTRAINT "REL_88a81bf856632af9c5e762d098" UNIQUE ("assignmentId"), CONSTRAINT "REL_8465191943752aee14abd9988b" UNIQUE ("teacherId"))`);
        await queryRunner.query(`INSERT INTO "temporary_grade"("id", "grade", "feedback", "assignmentId", "teacherId") SELECT "id", "grade", "feedback", "assignmentId", "teacherId" FROM "grade"`);
        await queryRunner.query(`DROP TABLE "grade"`);
        await queryRunner.query(`ALTER TABLE "temporary_grade" RENAME TO "grade"`);
        await queryRunner.query(`CREATE TABLE "temporary_grade" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "grade" integer NOT NULL, "feedback" varchar NOT NULL, "assignmentId" integer, "teacherId" integer, CONSTRAINT "REL_88a81bf856632af9c5e762d098" UNIQUE ("assignmentId"), CONSTRAINT "REL_8465191943752aee14abd9988b" UNIQUE ("teacherId"))`);
        await queryRunner.query(`INSERT INTO "temporary_grade"("id", "grade", "feedback", "assignmentId", "teacherId") SELECT "id", "grade", "feedback", "assignmentId", "teacherId" FROM "grade"`);
        await queryRunner.query(`DROP TABLE "grade"`);
        await queryRunner.query(`ALTER TABLE "temporary_grade" RENAME TO "grade"`);
        await queryRunner.query(`CREATE TABLE "temporary_grade" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "grade" integer NOT NULL, "feedback" varchar NOT NULL, "assignmentId" integer, "teacherId" integer, CONSTRAINT "REL_88a81bf856632af9c5e762d098" UNIQUE ("assignmentId"), CONSTRAINT "REL_8465191943752aee14abd9988b" UNIQUE ("teacherId"), CONSTRAINT "FK_88a81bf856632af9c5e762d0985" FOREIGN KEY ("assignmentId") REFERENCES "assignment" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_8465191943752aee14abd9988b5" FOREIGN KEY ("teacherId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_grade"("id", "grade", "feedback", "assignmentId", "teacherId") SELECT "id", "grade", "feedback", "assignmentId", "teacherId" FROM "grade"`);
        await queryRunner.query(`DROP TABLE "grade"`);
        await queryRunner.query(`ALTER TABLE "temporary_grade" RENAME TO "grade"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "grade" RENAME TO "temporary_grade"`);
        await queryRunner.query(`CREATE TABLE "grade" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "grade" integer NOT NULL, "feedback" varchar NOT NULL, "assignmentId" integer, "teacherId" integer, CONSTRAINT "REL_88a81bf856632af9c5e762d098" UNIQUE ("assignmentId"), CONSTRAINT "REL_8465191943752aee14abd9988b" UNIQUE ("teacherId"))`);
        await queryRunner.query(`INSERT INTO "grade"("id", "grade", "feedback", "assignmentId", "teacherId") SELECT "id", "grade", "feedback", "assignmentId", "teacherId" FROM "temporary_grade"`);
        await queryRunner.query(`DROP TABLE "temporary_grade"`);
        await queryRunner.query(`ALTER TABLE "grade" RENAME TO "temporary_grade"`);
        await queryRunner.query(`CREATE TABLE "grade" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "grade" integer NOT NULL, "feedback" varchar NOT NULL, "assignmentId" integer, "teacherId" integer, CONSTRAINT "REL_88a81bf856632af9c5e762d098" UNIQUE ("assignmentId"), CONSTRAINT "REL_8465191943752aee14abd9988b" UNIQUE ("teacherId"))`);
        await queryRunner.query(`INSERT INTO "grade"("id", "grade", "feedback", "assignmentId", "teacherId") SELECT "id", "grade", "feedback", "assignmentId", "teacherId" FROM "temporary_grade"`);
        await queryRunner.query(`DROP TABLE "temporary_grade"`);
        await queryRunner.query(`ALTER TABLE "grade" RENAME TO "temporary_grade"`);
        await queryRunner.query(`CREATE TABLE "grade" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "grade" integer NOT NULL, "feedback" varchar NOT NULL, "assignmentId" integer, "teacherId" integer, CONSTRAINT "REL_88a81bf856632af9c5e762d098" UNIQUE ("assignmentId"), CONSTRAINT "REL_8465191943752aee14abd9988b" UNIQUE ("teacherId"), CONSTRAINT "FK_8465191943752aee14abd9988b5" FOREIGN KEY ("teacherId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "grade"("id", "grade", "feedback", "assignmentId", "teacherId") SELECT "id", "grade", "feedback", "assignmentId", "teacherId" FROM "temporary_grade"`);
        await queryRunner.query(`DROP TABLE "temporary_grade"`);
        await queryRunner.query(`ALTER TABLE "grade" RENAME TO "temporary_grade"`);
        await queryRunner.query(`CREATE TABLE "grade" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "grade" integer NOT NULL, "feedback" varchar NOT NULL, "assignmentId" integer, "teacherId" integer, CONSTRAINT "REL_88a81bf856632af9c5e762d098" UNIQUE ("assignmentId"), CONSTRAINT "REL_8465191943752aee14abd9988b" UNIQUE ("teacherId"), CONSTRAINT "FK_8465191943752aee14abd9988b5" FOREIGN KEY ("teacherId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_88a81bf856632af9c5e762d0985" FOREIGN KEY ("assignmentId") REFERENCES "assignment" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "grade"("id", "grade", "feedback", "assignmentId", "teacherId") SELECT "id", "grade", "feedback", "assignmentId", "teacherId" FROM "temporary_grade"`);
        await queryRunner.query(`DROP TABLE "temporary_grade"`);
    }

}
