import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';
import { LoggerConfigService } from '../_services/logger-config.service';



@Injectable()
export class LoggerInterceptor implements HttpInterceptor {

	public constructor(
		@Inject(LoggerConfigService) private _config
	) {}

	private exp: RegExp = /https?:\/\/(www\.)?|www\./;
	private successStyle = `
		background: #C5E1A5;
		color: #000;
		font-weight: bold;
		display: block;
		text-align: center;`;
	private infoStyle = `
		background: #FFF176;
		color: #000;
		font-weight: bold;
		display: block;
		text-align: center;`;
	private errorStyle = `
		background: #FFAB91;
		color: #000;
		font-weight: bold;
		display: block;
		text-align: center;`;

	public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
		const time: any = {};
		return next.handle(request).pipe(
			map((event: HttpEvent<any>) => {
				let isExcluded;
				if (this._config.excludeDomains && this._config.excludeDomains.length) {
					isExcluded = this._config.excludeDomains
						.some( (domain: string) => request.url.includes(domain) );
				}
				if (!isExcluded) this.printMsg(request, event, time);
				return event;
			}),
			catchError((error: HttpErrorResponse) => {
				this.printMsg(request, error, time);
				return _throw(error);
			})
		);
	}

	public printMsg(request: HttpRequest<any>, event: HttpEvent<any> | HttpErrorResponse, time: any): void {
		//== Request
		if (event.type === 0) {
			time.start = Date.now();
			return;
		}
		console.log(this._config);
		console.log(request);
		

		// Time
		time.end = Date.now();
		const duration = time.end - time.start;

		const url = request.url.replace(this.exp, '');
		const response = event as HttpResponse<any>;
		console.log(response);
		const statusCode = response.status;
		const statusText = response.statusText;
		const groupCode = Number(statusCode.toString().substr(0, 1));
		let groupName;
		switch (groupCode) {
			case 1:
				groupName = 'Informational';
				break;
			case 2:
				groupName = 'Success';
				break;
			case 3:
				groupName = 'Redirection';
				break;
			case 4:
				groupName = 'Client Error';
				break;
			case 5:
				groupName = 'Server Error';
				break;
			default:
				groupName = 'Error';
				break;
		}

		let style;
		if (groupCode > 3 || groupCode === 0) {
			style = this.errorStyle;
		} else if (groupCode === 2) {
			style = this.successStyle;
		} else {
			style = this.infoStyle;
		}

		//== Response				
		console.groupCollapsed(`%c ${groupName} - ${statusText} ${statusCode} | ${request.method} | ${duration}ms. | ${url} `, style);
		console.log(`Request: `, request);
		console.log(`Response: `, response);
		console.groupEnd();
	}

}

