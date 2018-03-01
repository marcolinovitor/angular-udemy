import { User } from './../security/login/user.model';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../security/login/login.service';

@Component({
  selector: 'mt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  
}
