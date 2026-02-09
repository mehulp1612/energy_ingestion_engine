import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity({ name: "meter_telemetry" })
@Index("idx_meter_telemetry_meter_time", ["meterId", "timestamp"])
export class MeterTelemetry {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("uuid")
  meterId: string;

  @Column("numeric", { precision: 10, scale: 4 })
  kwhConsumedAc: number;

  @Column("numeric", { precision: 6, scale: 2, nullable: true })
  voltage?: number;

  @Column("timestamptz")
  timestamp: Date;
}
