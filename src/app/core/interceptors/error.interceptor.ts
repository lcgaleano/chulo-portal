import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError(error => {
      let message = 'Ocurrió un error desconocido';

      if (error.status === 0) {
        message = 'Error de conexión. Verifica que el servidor esté disponible.';
      } else if (error.status === 400) {
        message = error.error?.message || 'Solicitud inválida';
      } else if (error.status === 401) {
        message = 'No autorizado';
      } else if (error.status === 403) {
        message = 'Acceso denegado';
      } else if (error.status === 404) {
        message = 'Recurso no encontrado';
      } else if (error.status >= 500) {
        message = 'Error del servidor. Por favor, intenta más tarde.';
      }

      notificationService.error(message);
      return throwError(() => error);
    })
  );
};
