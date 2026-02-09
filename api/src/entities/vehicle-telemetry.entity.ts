import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity({ name: "vehicle_telemetry" })
@Index("idx_vehicle_telemetry_vehicle_time", ["vehicleId", "timestamp"])
export class VehicleTelemetry {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("uuid")
  vehicleId: string;

  @Column("numeric", { precision: 5, scale: 2, nullable: true })
  soc?: number;

  @Column("numeric", { precision: 10, scale: 4 })
  kwhDeliveredDc: number;

  @Column("numeric", { precision: 5, scale: 2, nullable: true })
  batteryTemp?: number;

  @Column("timestamptz")
  timestamp: Date;
}
