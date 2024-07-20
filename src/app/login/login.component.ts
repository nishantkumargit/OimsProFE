import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../auth.service';
import { LoginPermissionGuard } from '../guards/login.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;
  validationError: boolean | undefined;
  showSpinner: any;

  constructor(private router: Router, private service: UserService, private http: HttpClient, private authService: AuthService) {
    localStorage.setItem("token", "");
  }


  onlogin(){
    this.service.authenticate({ "email": this.username, "password": this.password}).subscribe({
      next: (data) => {
          var token = data.token;
          localStorage.setItem("token", token);
          this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error);
        this.validationError = true;
      }
    });
  }


}
