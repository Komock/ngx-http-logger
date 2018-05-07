import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerInterceptor } from '../../_interceptors/logger.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule
	],
	declarations: [],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: LoggerInterceptor,
			multi: true
		}
	]
})
export class HttpLoggerModule { }
