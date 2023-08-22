/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { WithCredentialsInterceptor } from './WithCredentialsInterceptor';
import { CorrectHeadersInterceptor } from './CorrectHeadersInterceptor';
import { UnauthorizedInterceptor } from './UnauthorizedInterceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CorrectHeadersInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: WithCredentialsInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: UnauthorizedInterceptor,
    multi: true,
  },
];
