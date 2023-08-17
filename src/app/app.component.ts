import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalizationService } from './core/services/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {


  constructor(
    public translate: TranslateService,
    localizService: LocalizationService
  ) {
    const storedLanguage: string | null = localStorage.getItem('language');
    if (
      !storedLanguage ||
      !(storedLanguage === 'en' || storedLanguage === 'ar')
    ) {
      localizService.setDefaultLanguage();
      return;
    }
    localizService.setDefaultLanguage(storedLanguage);

    storedLanguage === 'ar'
      ? localizService.changeDirectionToRtl()
      : localizService.changeDirectionToLtr();
  }
}
