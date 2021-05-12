import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from './profile/profile.component';


const routes: Routes = [
  {
    path: ':userId',
    component: ProfileComponent,
    children: [
      {
        path: 'tasks',
        loadChildren: () => import('./../../items/tasks/tasks.module').then(t => t.TasksModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
