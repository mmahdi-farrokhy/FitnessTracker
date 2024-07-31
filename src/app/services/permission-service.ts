import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class PersmissionService {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // if (this.authService.isAuthenticated()) {
        //     return true;
        // }
        // else {
        //     this.router.navigate(['login']);
        //     return false;
        // }

        return true;
    }
}