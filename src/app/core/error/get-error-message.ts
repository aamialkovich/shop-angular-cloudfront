import { HttpErrorResponse } from '@angular/common/http';

export const getErrorMessage = (event: unknown) => {
  if (event instanceof HttpErrorResponse) {
    switch (event.status) {
      case 401: {
        return 'Unauthorized!';
      }
      case 403: {
        return 'Forbidden!';
      }
      default: {
        return '';
      }
    }
  }
  return '';
};
