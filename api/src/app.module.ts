import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { TelemetryModule } from "./telemetry/telemetry.module";

@Module({
  imports: [DatabaseModule, TelemetryModule],
})
export class AppModule {}
