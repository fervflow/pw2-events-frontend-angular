import { Inject, Injectable, InjectionToken } from '@angular/core';

export const BROWSER_STORAGE = new InjectionToken<Storage | null>('Browser Storage', {
  providedIn: 'root',
  factory: () => (typeof window !== 'undefined' ? localStorage : null)
});

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage | null
  ) {}

  getItem(key: string): string | null {
    return this.storage?.getItem(key) || null;
  }

  setItem(key: string, value: string): void {
    this.storage?.setItem(key, value);
  }

  removeItem(key: string): void {
    this.storage?.removeItem(key);
  }
}
