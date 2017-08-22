import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
const appRoutes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  }
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
