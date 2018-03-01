import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { NotificationsService } from '../../shared/messages/notifications.service';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private notification: NotificationsService
            ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [
        Validators.required,
        Validators.email
      ]),
      password: this.fb.control('', [
        Validators.required
      ])
    })
  }

  onLogin(){
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password)
                     .subscribe(user => this.notification.notify(`Bem vindo, ${user.name}`),
                                response => this.notification.notify(response.error.message) //HttpErrorResponse
                      )
  }

}
