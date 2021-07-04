import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  username = new FormControl();

  showError: boolean = false;

  constructor(public sharedService: SharedService) {
    this.username.valueChanges.subscribe( username => {
      this.sharedService.username = username;
    })
  }

  ngOnInit(): void {
  }

  handleNavClick(){
    this.showError = this.username.valid ? false : true; /* display error if form is not valid */
    sessionStorage.setItem("username", this.username.value); /* save username for better user experience if page will reload */
  }

}
