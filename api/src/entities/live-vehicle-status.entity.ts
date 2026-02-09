import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity({ name: "live_vehicle_status" })
export class LiveVehicleStatus {
  @PrimaryColumn("uuid")
  vehicleId: string;

  @Column("numeric", { precision: 5, scale: 2 })
  soc: number;

  @Column("numeric", { precision: 10, scale: 4 })
  lastKwhDeliveredDc: number;

  @Column("numeric", { precision: 5, scale: 2, nullable: true })
  batteryTemp?: number;

  @Column("timestamptz")
  lastSeenAt: Date;
}
