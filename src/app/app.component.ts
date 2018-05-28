import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	public testApiUrls = [{
		type: 'success',
		method: 'get',
		name: '/get-200/',
		url: 'http://localhost:3090/api/get-200/'
	}, {
		type: 'success',
		method: 'get',
		name: '/get-302/',
		url: 'http://localhost:3090/api/get-302/'
	}, {
		type: 'error',
		method: 'get',
		name: '/get-400/',
		url: 'http://localhost:3090/api/get-400/'
	}, {
		type: 'error',
		method: 'get',
		name: '/get-403/',
		url: 'http://localhost:3090/api/get-403/'
	}, {
		type: 'error',
		method: 'get',
		name: '/get-500/',
		url: 'http://localhost:3090/api/get-500/'
	}];

	public vendorUrls = [{
		type: 'success',
		method: 'get',
		name: 'Dogs API',
		url: 'https://dog.ceo/api/breed/akita/images'
	}, {
		type: 'success',
		method: 'get',
		name: 'Github API. Repos',
		url: 'https://api.github.com/search/repositories?q=ngx&sort=stars&order=desc'
	}, {
		type: 'error',
		method: 'get',
		name: 'Nonexistent URL',
		url: 'http://some.wrong.url'
	}];

	public btnsDisabled = false;
	public constructor(
		private _httpClient: HttpClient
	) { }
	public getData(url: string, method: string): void {
		this.btnsDisabled = true;
		switch (method) {
			case 'get':
				this._httpClient.get(url)
					.pipe(catchError(this.errorHandler))
					.subscribe((data: any) => {
						// if (data) {
						// 	console.log('GET. Output in Component: ', data);
						// 	console.log('\n');
						// }
						this.btnsDisabled = false;
					});
				break;
			case 'post':
				this._httpClient.post(url, { foo: 'bar' })
					.subscribe((data: any) => {
						// if (data) {
						// 	console.log('POST. Output in Component: ', data);
						// 	console.log('\n');
						// }
						this.btnsDisabled = false;
					});
				break;
		}
	}

	public errorHandler(error: any): Observable<any> {
		// console.log('Output Error in Component: ', error);
		return of(null);
	}
}
