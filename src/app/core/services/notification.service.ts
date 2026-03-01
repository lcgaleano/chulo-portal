import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _snackBar = inject(MatSnackBar);

  success(message: string, config?: MatSnackBarConfig): void {
    this._snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-success'],
      ...config
    });
  }

  error(message: string, config?: MatSnackBarConfig): void {
    this._snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['snackbar-error'],
      ...config
    });
  }

  info(message: string, config?: MatSnackBarConfig): void {
    this._snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-info'],
      ...config
    });
  }

  warning(message: string, config?: MatSnackBarConfig): void {
    this._snackBar.open(message, 'Cerrar', {
      duration: 4000,
      panelClass: ['snackbar-warning'],
      ...config
    });
  }
}
