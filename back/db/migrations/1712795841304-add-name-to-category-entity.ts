import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNameToCategoryEntity1712795841304 implements MigrationInterface {
    name = 'AddNameToCategoryEntity1712795841304'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" RENAME COLUMN "content" TO "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" RENAME COLUMN "name" TO "content"`);
    }

}
