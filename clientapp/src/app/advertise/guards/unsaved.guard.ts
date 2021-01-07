import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AddAdvertiseComponent } from '../components/add-advertise.component';

@Injectable({
  providedIn: 'root',
})
export class UnSavedChangesGuard
  implements CanDeactivate<AddAdvertiseComponent> {
  canDeactivate(
    component: AddAdvertiseComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (component.createAdForm.untouched || component.createAdForm.valid) {
      return true;
    } else {
      return window.confirm('Unsaved changes!\n Are you sure to go back?');
    }
  }
}
