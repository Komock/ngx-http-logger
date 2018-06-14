import { ILoggerConfig } from "../_interfaces/logger-config.interface";
import { InjectionToken } from "@angular/core";

export const LoggerConfigService = new InjectionToken<ILoggerConfig>('LoggerConfig');