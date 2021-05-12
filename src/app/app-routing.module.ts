import { UserIsNotLoggedGuard } from './commons/guards/user-is-not-logged.guard';
import { UserIsLoggedGuard } from './commons/guards/userIsLogged.guard';
import { AdminGuard } from './commons/guards/admin.guard';
import { TestComponent } from './main-components/test/test.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './main-components/home/home.component';
import {NotFoundPageComponent} from './main-components/not-found-page/not-found-page.component';
import {ApplicationErrorComponent} from './main-components/application-error/application-error.component';
import {NotFoundResourceComponent} from './main-components/not-found-resource/not-found-resource.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'test',
    component: TestComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'auth',
    canActivate: [UserIsLoggedGuard],
    loadChildren: () => import('./main-dashboard/auth/auth.module').then(a => a.AuthModule),
  },
  {
    path: 'profile',
    canActivate: [UserIsNotLoggedGuard],
    loadChildren: () => import('./main-modules/layout/profile/profile.module').then(p => p.ProfileModule)
  },
  {
    path: 'applicationError/:status',
    component: ApplicationErrorComponent
  },
  {
    path: 'notFoundResource/:status',
    component: NotFoundResourceComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
