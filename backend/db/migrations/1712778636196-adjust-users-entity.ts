import { MigrationInterface, QueryRunner } from "typeorm";

export class AdjustUsersEntity1712778636196 implements MigrationInterface {
    name = 'AdjustUsersEntity1712778636196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshToken" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD "age" integer NOT NULL`);
    }

}
