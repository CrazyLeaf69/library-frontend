import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ThemeObject {
  oldValue: string | null;
  newValue: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  initialSetting: ThemeObject = {
    oldValue: null,
    newValue: localStorage.getItem('theme') || 'bootstrap',
  };

  themeSelection: BehaviorSubject<ThemeObject> =
    new BehaviorSubject<ThemeObject>(this.initialSetting);

  constructor() {}

  setTheme(theme: string) {
    localStorage.setItem('theme', theme);
    this.themeSelection.next({
      oldValue: this.themeSelection.value.newValue,
      newValue: theme,
    });
  }

  themeChanges(): Observable<ThemeObject> {
    return this.themeSelection.asObservable();
  }

  getTheme(): string {
    return localStorage.getItem('theme') || 'bootstrap';
  }
}
