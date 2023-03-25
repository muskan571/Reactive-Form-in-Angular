import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationComponent } from './authentication.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { Page3Component } from './page3/page3.component';

import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {
        path: '',
        component: Page1Component,
        canDeactivate: [AuthGuard]

      },
      {
        path: 'enter-details',
        component: Page2Component,
        canActivate: [AuthGuard]
      },
      {
        path: 'get-details',
        component: Page3Component,
        canActivate: [AuthGuard]
      }
    ]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
