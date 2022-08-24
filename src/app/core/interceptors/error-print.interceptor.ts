import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationService } from '../notification.service';
import { tap } from 'rxjs/operators';
import { getErrorMessage } from '../error/get-error-message';

@Injectable()
export class ErrorPrintInterceptor implements HttpInterceptor {
  constructor(private readonly notificationService: NotificationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        error: (event: unknown) => {
          const url = new URL(request.url);
          const errorMessage =
            getErrorMessage(event) ||
            `Request to "${url.pathname}" failed. Check the console for the details`;

          this.notificationService.showError(errorMessage, 0);
        },
      })
    );
  }
}
