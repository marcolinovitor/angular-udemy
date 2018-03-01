import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { NotificationsService } from '../../shared/messages/notifications.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  navigateTo: string

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private notification: NotificationsService,
              private activatedRoute: ActivatedRoute,
              private router: Router
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

    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/')
  }

  onLogin(){
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password)
                     .subscribe(user => this.notification.notify(`Bem vindo, ${user.name}`),
                                response => this.notification.notify(response.error.message), //HttpErrorResponse
                                () => {
                                  this.router.navigate([atob(this.navigateTo)])
                                }
                      )
  }

}
