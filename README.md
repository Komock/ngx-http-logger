# NgxHttpLogger

Simple logger for HTTP requests, made with Native Angular HttpInterceptor


## Install


```sh
npm i --save-dev ngx-http-logger
```

## Example of use
```ts
// App Module (app.module.ts)
import { HttpLoggerModule } from 'http-logger.module';

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
