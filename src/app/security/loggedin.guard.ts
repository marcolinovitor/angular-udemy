import { LoginService } from './login/login.service';
import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { NotificationsService } from '../shared/messages/notifications.service';

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

    constructor(private loginService: LoginService, private notification: NotificationsService){}

    checkAuthentication(path: string): boolean {
        const loggedIn = this.loginService.isLoggedIn()
        if(!loggedIn){
            this.loginService.handleLogin(`/${path}`)
            this.notification.notify('Para continuar, efetue seu login')
        }
        return loggedIn
    }

    canLoad(route: Route): boolean {
        return this.checkAuthentication(route.path)
    }

    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean{
        return this.checkAuthentication(activatedRoute.routeConfig.path)
    }

}