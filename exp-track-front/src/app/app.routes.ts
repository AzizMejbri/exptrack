import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { SignupComponent } from './signup/signup';
import { authGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard-user/dashboard-user.component';
import { LayoutComponent } from './layout/layout.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CategoryStatsComponent } from './category-stats/category-stats.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard/:user_id', component: DashboardComponent },
      { path: 'transactions/:user_id', component: TransactionsComponent },
      { path: 'category-stats/:user_id', component: CategoryStatsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
