import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1770746425861 implements MigrationInterface {
  name = "InitSchema1770746425861";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(
      `CREATE TABLE "vehicle_telemetry" ("id" SERIAL NOT NULL, "vehicleId" uuid NOT NULL, "soc" numeric(5,2), "kwhDeliveredDc" numeric(10,4) NOT NULL, "batteryTemp" numeric(5,2), "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_2251d5304256c01643d2d33903b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_vehicle_telemetry_vehicle_time" ON "vehicle_telemetry" ("vehicleId", "timestamp") `,
    );
    await queryRunner.query(
      `CREATE TABLE "meter_telemetry" ("id" SERIAL NOT NULL, "meterId" uuid NOT NULL, "kwhConsumedAc" numeric(10,4) NOT NULL, "voltage" numeric(6,2), "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_d90bb9627708ff912b862c2d764" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_meter_telemetry_meter_time" ON "meter_telemetry" ("meterId", "timestamp") `,
    );
    await queryRunner.query(
      `CREATE TABLE "live_vehicle_status" ("vehicleId" uuid NOT NULL, "soc" numeric(5,2) NOT NULL, "lastKwhDeliveredDc" numeric(10,4) NOT NULL, "batteryTemp" numeric(5,2), "lastSeenAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_b4c6332df74014dca359954753b" PRIMARY KEY ("vehicleId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vehicle_meter_map" ("vehicleId" uuid NOT NULL, "meterId" uuid NOT NULL, "assignedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "unassignedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_52a34ec82ff927d1a84caaf7a67" PRIMARY KEY ("vehicleId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_vehicle_meter_active" ON "vehicle_meter_map" ("vehicleId", "unassignedAt") `,
    );
    await queryRunner.query(
      `CREATE TABLE "live_meter_status" ("meterId" uuid NOT NULL, "lastKwhConsumedAc" numeric(10,4) NOT NULL, "voltage" numeric(6,2), "lastSeenAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_dcd5d97d114a5725cbd98a53592" PRIMARY KEY ("meterId"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "live_meter_status"`);
    await queryRunner.query(`DROP INDEX "public"."idx_vehicle_meter_active"`);
    await queryRunner.query(`DROP TABLE "vehicle_meter_map"`);
    await queryRunner.query(`DROP TABLE "live_vehicle_status"`);
    await queryRunner.query(
      `DROP INDEX "public"."idx_meter_telemetry_meter_time"`,
    );
    await queryRunner.query(`DROP TABLE "meter_telemetry"`);
    await queryRunner.query(
      `DROP INDEX "public"."idx_vehicle_telemetry_vehicle_time"`,
    );
    await queryRunner.query(`DROP TABLE "vehicle_telemetry"`);
  }
}
