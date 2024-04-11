import { MigrationInterface, QueryRunner } from "typeorm";

export class AdjustRelationshipInCategory1712799413992 implements MigrationInterface {
    name = 'AdjustRelationshipInCategory1712799413992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_5f8315480dec4d4c52b602730a6"`);
        await queryRunner.query(`ALTER TABLE "notes_categories_category" DROP CONSTRAINT "FK_864445f81dc81443969d46a0511"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "notesId"`);
        await queryRunner.query(`ALTER TABLE "notes_categories_category" ADD CONSTRAINT "FK_864445f81dc81443969d46a0511" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notes_categories_category" DROP CONSTRAINT "FK_864445f81dc81443969d46a0511"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "notesId" uuid`);
        await queryRunner.query(`ALTER TABLE "notes_categories_category" ADD CONSTRAINT "FK_864445f81dc81443969d46a0511" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_5f8315480dec4d4c52b602730a6" FOREIGN KEY ("notesId") REFERENCES "notes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
