import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { NotificationsService } from './shared/messages/notifications.service';
import { LoginService } from './security/login/login.service';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {
    constructor(private notification: NotificationsService,
                private injector: Injector,
                private zone: NgZone){
        super()
    }
    handleError(errorResponse: HttpErrorResponse | any){
        if(errorResponse instanceof HttpErrorResponse){
            const message = errorResponse.error.message
            this.zone.run(() => {
                switch(errorResponse.status){
                    case 401:
                        this.injector.get(LoginService).handleLogin()
                        break;
                    case 403:
                        this.notification.notify(message || 'Não autorizado.')
                        break;
                    case 404:
                        this.notification.notify(message || 'Recurso não encontrado. Verifique console para mais detalhes.')
                        break;
                }
            })
        }
        super.handleError(errorResponse)
    }
}