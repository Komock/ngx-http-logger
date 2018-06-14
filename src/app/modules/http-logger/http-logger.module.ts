import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerInterceptor } from '../../_interceptors/logger.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ILoggerConfig } from '../../_interfaces/logger-config.interface';
import { LoggerConfigService } from '../../_services/logger-config.service';


@NgModule({
	imports: [
		CommonModule,
		HttpClientModule
	]
})
export class HttpLoggerModule {
	static forRoot(config: ILoggerConfig): ModuleWithProviders {
		return {
			ngModule: HttpLoggerModule,
			providers: [
				{
					provide: LoggerConfigService,
					useValue: config
				}, {
					provide: HTTP_INTERCEPTORS,
					useClass: LoggerInterceptor,
					multi: true
				}
			]
		}
	}
}
