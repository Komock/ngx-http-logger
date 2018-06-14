import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpLoggerModule } from './modules/http-logger/http-logger.module';
import { LoggerInterceptor } from './_interceptors/logger.interceptor';


@NgModule({
	declarations: [
		AppComponent
	],
	exports: [],
	imports: [
		BrowserModule,
		HttpLoggerModule.forRoot({ excludeDomains: ['api.github.com']})
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
