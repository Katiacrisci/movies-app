import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  register(form: NgForm) {
      console.log(form.value);
      try {
          this.authSrv.register(form.value).subscribe();
      } catch (error: any) {
          console.log(error);
          alert(error);
          this.router.navigate(['/register']);
      }
  }
}