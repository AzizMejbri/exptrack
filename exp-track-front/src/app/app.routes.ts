import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { SignupComponent } from './signup/signup';
import { authGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { DashboardUserComponent } from './dashboard-user/dashboard-user';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard/:user_id', component: DashboardUserComponent, canActivate: [authGuard] },
  // Add your other routes here
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
