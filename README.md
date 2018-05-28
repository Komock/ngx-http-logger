# NgxHttpLogger

Simple logger for HTTP requests, made with Native Angular HttpInterceptor.
Angular6+ required.


## Install


```sh
npm i --save-dev ngx-http-logger
```

## Example of use
```ts
// App Module (app.module.ts)
import { HttpLoggerModule } from 'ngx-http-logger';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		HttpLoggerModule
	],
	bootstrap: [AppComponent]
});
```
Then just open browser console and run some requests.

![preview](https://raw.githubusercontent.com/Komock/ngx-http-logger/master/preview.png)

Inside console group you still have access to raw response/error.

![preview-2](https://raw.githubusercontent.com/Komock/ngx-http-logger/master/preview-2.png)

After print info error will be passed up to stream as ErrorObservable.
