import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from './modules/material.module';
import {NgxModule} from './modules/ngx.module';
import { AddTaskComponent } from './components/tasks/add-task/add-task.component';
import { EditTaskComponent } from './components/tasks/edit-task/edit-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteTaskComponent } from './components/tasks/delete-task/delete-task.component';

@NgModule({
  declarations: [AddTaskComponent, EditTaskComponent, DeleteTaskComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NgxModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    NgxModule,
    AddTaskComponent,
    EditTaskComponent,
    DeleteTaskComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
