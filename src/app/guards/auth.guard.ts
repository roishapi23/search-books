import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SharedService } from '../services/shared/shared.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sharedService: SharedService, private router: Router){}

  canActivate(): boolean {
    if (!!this.sharedService.username) { /* is username exist - allow navigation */
      return true;
    }
    this.router.navigate(['/welcome']); /* else nav to welcome form */
    return false;
  }

}
