import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import 'rxjs/observable/of';

const successStyles = [
	'background: #C5E1A5',
	'color: #000',
	'font-weight: bold',
	'display: block',
	'text-align: center'
].join(';');

const failStyles = [
	'background: #FFAB91',
	'color: #000',
	'font-weight: bold',
	'display: block',
	'text-align: center'
].join(';');

@Injectable()
export class LoggerInterceptor {

	private exp: RegExp = /https?:\/\/(www\.)?|www\./;

	public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let startStamp;
		const url = request.url.replace(this.exp, '');
		return next.handle(request).pipe(
			map((res: any) => {
				//== Request
				if (res.type === 0) {
					startStamp = Date.now();
					return;
				}

				const time = (Date.now()) - startStamp;
				
				//== Response				
				console.groupCollapsed(`%c Success ${res.status} | ${request.method} | ${time}ms. | ${url} `, successStyles);
				console.log(`Method: ${request.method}`);
				console.log(`URL: ${request.url}`);
				console.log(`Time: ${time}ms.`);
				console.log(`Raw Response: `, res);
				console.groupEnd();
				return res;

			}),
			catchError((error: HttpErrorResponse) => {
				const time = (Date.now()) - startStamp;
				
				//== Error
				console.groupCollapsed(`%c Fail ${error.status} | ${request.method} | ${time}ms. | ${url}`, failStyles);
				console.log(`Backend returned code ${error.status}, message: ${error.message}`);
				console.log(`Method: ${request.method}`);
				console.log(`URL: ${request.url}`);
				console.log(`Time: ${time}ms.`);
				console.log('Raw Error: ', error);
				console.groupEnd();
				return Observable.of(new HttpResponse({
					body: { error: error.message }
				}));

			})
		);
	}

}
