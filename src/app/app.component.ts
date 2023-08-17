import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  setDefaultLanguage(language: string = 'en') {
    this.translate.setDefaultLang(language);
    this.translate.use(language);
    localStorage.setItem('language', language);
  }

  constructor(public translate: TranslateService) {
    const storedLanguage: string | null = localStorage.getItem('language');
    if (
      !storedLanguage ||
      !(storedLanguage === 'en' || storedLanguage === 'ar')
    ) {
      this.setDefaultLanguage();
      return;
    }
    this.setDefaultLanguage(storedLanguage);
  }
  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('language', language);
  }
}
