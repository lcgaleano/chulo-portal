import { Injectable } from '@angular/core';
import { signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _activeRequests = signal(0);

  isLoading = computed(() => this._activeRequests() > 0);

  incrementLoading(): void {
    this._activeRequests.update(count => count + 1);
  }

  decrementLoading(): void {
    this._activeRequests.update(count => Math.max(0, count - 1));
  }

  resetLoading(): void {
    this._activeRequests.set(0);
  }
}
