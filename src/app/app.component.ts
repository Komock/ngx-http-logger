import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public urls = [{
		type: 'success',
		name: 'Dogs API',
		url: 'https://dog.ceo/api/breed/akita/images'
	}, {
		type: 'success',
		name: 'Github API. Repos',
		url: 'https://api.github.com/search/repositories?q=ngx&sort=stars&order=desc'
	}, {
		type: 'error',
		name: 'Error',
		url: 'http://some.wrong.url'
	}];
	public btnsDisabled = false;
	public constructor(
		private _httpClient: HttpClient
	) { }
	public getData(url): void {
		this.btnsDisabled = true;
		this._httpClient.get(url)
			.subscribe((data: any) => {
				// console.log('----------');
				// console.log('Output in Component: ', data);
				this.btnsDisabled = false;
			});
	}
}
