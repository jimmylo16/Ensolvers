import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategoryModel1712790321194 implements MigrationInterface {
    name = 'AddCategoryModel1712790321194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" date, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" text NOT NULL, "content" text NOT NULL, "userId" uuid, "notesId" uuid, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notes_categories_category" ("notesId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_9d83616150270608f97ce00271b" PRIMARY KEY ("notesId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_006415ff39bac83c24a764728d" ON "notes_categories_category" ("notesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_864445f81dc81443969d46a051" ON "notes_categories_category" ("categoryId") `);
        await queryRunner.query(`CREATE TYPE "public"."notes_status_enum" AS ENUM('active', 'archived')`);
        await queryRunner.query(`ALTER TABLE "notes" ADD "status" "public"."notes_status_enum" NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_32b856438dffdc269fa84434d9f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_5f8315480dec4d4c52b602730a6" FOREIGN KEY ("notesId") REFERENCES "notes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notes_categories_category" ADD CONSTRAINT "FK_006415ff39bac83c24a764728dd" FOREIGN KEY ("notesId") REFERENCES "notes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "notes_categories_category" ADD CONSTRAINT "FK_864445f81dc81443969d46a0511" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes_categories_category" DROP CONSTRAINT "FK_864445f81dc81443969d46a0511"`);
        await queryRunner.query(`ALTER TABLE "notes_categories_category" DROP CONSTRAINT "FK_006415ff39bac83c24a764728dd"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_5f8315480dec4d4c52b602730a6"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_32b856438dffdc269fa84434d9f"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."notes_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_864445f81dc81443969d46a051"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_006415ff39bac83c24a764728d"`);
        await queryRunner.query(`DROP TABLE "notes_categories_category"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
