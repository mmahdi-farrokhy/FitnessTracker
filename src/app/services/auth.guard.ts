import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { PersmissionService } from "./permission-service";

export const AuthGuard: CanActivateFn =
    (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(PersmissionService).canActivate(next, state);
    }