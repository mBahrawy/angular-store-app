import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HttpBackend,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(
  httpHandler: HttpBackend
): TranslateHttpLoader {
  return new TranslateHttpLoader(
    new HttpClient(httpHandler),
    './assets/i18n/',
    '.json'
  );
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend],
      },
    }),
  ],
  exports: [TranslateModule],
})
export class TranslationModule {}
