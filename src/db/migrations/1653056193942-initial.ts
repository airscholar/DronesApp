import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1653056193942 implements MigrationInterface {
  name = 'initial1653056193942';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "medication" ("Id" SERIAL NOT NULL, "Name" character varying NOT NULL, "Weight" integer NOT NULL, "Code" character varying NOT NULL, "Image" character varying NOT NULL, "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), "droneId" integer, CONSTRAINT "UQ_5b1fe783e307fbe387db5bd6146" UNIQUE ("Code"), CONSTRAINT "PK_f72829090b54ed891dfb73df8f8" PRIMARY KEY ("Id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."drone_model_enum" AS ENUM('LIGHTWEIGHT', 'MIDDLEWEIGHT', 'CRUISERWEIGHT', 'HEAVYWEIGHT')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."drone_state_enum" AS ENUM('IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING')`,
    );
    await queryRunner.query(
      `CREATE TABLE "drone" ("Id" SERIAL NOT NULL, "SerialNumber" character varying NOT NULL, "Model" "public"."drone_model_enum" NOT NULL, "WeightLimit" integer NOT NULL, "BatteryCapacity" real NOT NULL, "BatteryLevel" real NOT NULL DEFAULT '0', "State" "public"."drone_state_enum" NOT NULL DEFAULT 'IDLE', "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fde2ccd71f822d50ce3e56193df" UNIQUE ("SerialNumber"), CONSTRAINT "PK_085fc7eb8c4d371c72e66b7e1cc" PRIMARY KEY ("Id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "medication" ADD CONSTRAINT "FK_fb72ae0a4c294857b1b1d8df5d0" FOREIGN KEY ("droneId") REFERENCES "drone"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "medication" DROP CONSTRAINT "FK_fb72ae0a4c294857b1b1d8df5d0"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "drone"`);
    await queryRunner.query(`DROP TYPE "public"."drone_state_enum"`);
    await queryRunner.query(`DROP TYPE "public"."drone_model_enum"`);
    await queryRunner.query(`DROP TABLE "medication"`);
  }
}
