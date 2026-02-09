import { Entity, PrimaryColumn, Column, Index } from "typeorm";

@Entity({ name: "vehicle_meter_map" })
@Index("idx_vehicle_meter_active", ["vehicleId", "unassignedAt"])
export class VehicleMeterMap {
  @PrimaryColumn("uuid")
  vehicleId: string;

  @Column("uuid")
  meterId: string;

  @Column("timestamptz", { default: () => "now()" })
  assignedAt: Date;

  @Column("timestamptz", { nullable: true })
  unassignedAt?: Date;
}
