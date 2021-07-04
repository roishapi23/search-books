import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  username: string = '';

  constructor(public sharedService: SharedService) {
    this.username = this.sharedService.username;
   }

  ngOnInit(): void {
  }

}
