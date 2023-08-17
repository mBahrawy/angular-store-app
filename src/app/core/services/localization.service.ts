import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  private renderer!: Renderer2;

  constructor(
    public translate: TranslateService,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  setDefaultLanguage(language: string = 'en') {
    this.translate.setDefaultLang(language);
    this.translate.use(language);
    localStorage.setItem('language', language);
  }

  changeDirectionToRtl() {
    this.renderer.setAttribute(document.documentElement, 'dir', 'rtl');
  }

  changeDirectionToLtr() {
    this.renderer.setAttribute(document.documentElement, 'dir', 'ltr');
  }

  switchLanguage(language: string) {
    language === 'ar' ? this.changeDirectionToRtl() : this.changeDirectionToLtr();

    this.translate.use(language);
    localStorage.setItem('language', language);
  }

  getLang(): 'en' | 'ar' {
    return this.translate.currentLang as 'en' | 'ar'
  }
}
