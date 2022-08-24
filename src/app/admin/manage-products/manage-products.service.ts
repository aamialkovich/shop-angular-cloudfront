import { Injectable, Injector } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { switchMap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../core/auth.service';

@Injectable()
export class ManageProductsService extends ApiService {
  private readonly authService: AuthService = this.injector.get(AuthService);

  constructor(injector: Injector) {
    super(injector);
  }

  uploadProductsCSV(file: File): Observable<unknown> {
    if (!this.endpointEnabled('import')) {
      console.warn(
        'Endpoint "import" is disabled. To enable change your environment.ts config'
      );
      return EMPTY;
    }

    return this.getPreSignedUrl(file.name).pipe(
      switchMap((url: { signedUrl: string }) =>
        this.http.put(url.signedUrl, file, {
          headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'text/csv',
          },
        })
      )
    );
  }

  private getPreSignedUrl(fileName: string): Observable<{ signedUrl: string }> {
    const url = this.getUrl('import', 'import');

    return this.http.get<{ signedUrl: string }>(url, {
      params: {
        name: fileName,
      },
      headers: new HttpHeaders().set(
        'Authorization',
        `Basic ${this.authService.getToken()}`
      ),
    });
  }
}
