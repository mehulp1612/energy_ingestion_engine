import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MeterTelemetry } from "../entities/meter-telemetry.entity";
import { VehicleTelemetry } from "../entities/vehicle-telemetry.entity";
import { LiveMeterStatus } from "../entities/live-meter-status.entity";
import { LiveVehicleStatus } from "../entities/live-vehicle-status.entity";
import { VehicleMeterMap } from "../entities/vehicle-meter-map.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MeterTelemetry,
      VehicleTelemetry,
      LiveMeterStatus,
      LiveVehicleStatus,
      VehicleMeterMap,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class TelemetryModule {}
