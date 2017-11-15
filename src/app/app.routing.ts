import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './login/login.components';
import { DashboardComponent} from './dashboard/dashboard.component';

const appRoutes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
