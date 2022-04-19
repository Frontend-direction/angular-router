import {Injectable} from "@angular/core";
import {AuthStore} from "./auth.store";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private auth: AuthStore,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>  {
    return this.checkIfAuthenticated();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.checkIfAuthenticated();
  }

  private checkIfAuthenticated(): Observable<boolean | UrlTree> {
    return this.auth.isLoggedIn$.pipe(map(isLoggedIn => {
      return isLoggedIn ? true : this.router.parseUrl('/login');
    }));
  }
}
