import { MigrationInterface, QueryRunner } from "typeorm";

export class Data1743058510051 implements MigrationInterface {
    name = 'Data1743058510051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "age" integer NOT NULL, "email" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "name", "age") SELECT "id", "name", "age" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "age" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "user"("id", "name", "age") SELECT "id", "name", "age" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
