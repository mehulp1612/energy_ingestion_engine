import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity({ name: "live_meter_status" })
export class LiveMeterStatus {
  @PrimaryColumn("uuid")
  meterId: string;

  @Column("numeric", { precision: 10, scale: 4 })
  lastKwhConsumedAc: number;

  @Column("numeric", { precision: 6, scale: 2, nullable: true })
  voltage?: number;

  @Column("timestamptz")
  lastSeenAt: Date;
}
