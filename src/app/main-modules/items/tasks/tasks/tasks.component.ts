import { HelperService } from './../../../../shared/services/helper.service';
import { AuthService } from './../../../../services/auth/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TaskData } from './../../../../interface/task/taskData';
import { TaskService } from './../../../../services/task/task.service';
import { TaskAll } from './../../../../interface/task/taskAll';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {StartRefresh} from '../../../../commons/classes/refresh';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  userId: any;

  // Responsive page
  cols: number;
  gridByBreakpoint = {
    xl: 4,
    lg: 4,
    md: 3,
    sm: 2,
    xs: 1
  };

  tasks: TaskData[];

  // pagination
  itemPerPage = 1;
  currentPage = 1;
  pageSizeOption = [1, 2, 4, 6, 12, 14];
  totalItem;

  startRefresh: StartRefresh = new StartRefresh();

  constructor(private breakpointObserver: BreakpointObserver,
              private taskService: TaskService,
              private authService: AuthService,
              private router: Router,
              public helperService: HelperService) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols = this.gridByBreakpoint.xs;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.cols = this.gridByBreakpoint.sm;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.cols = this.gridByBreakpoint.md;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.cols = this.gridByBreakpoint.lg;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.cols = this.gridByBreakpoint.xl;
        }
      }
    });

    this.userId = router.url.split('/')[2];
  }

  ngOnInit(): void {
    this.taskService.getAllTasks(
      this.userId,
      this.itemPerPage,
      this.currentPage).subscribe((tasks: TaskAll) => {
        this.tasks = tasks.tasks;
        this.totalItem = tasks.maxPosts;
      });
  }

  onChangePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.itemPerPage = pageData.pageSize;
    this.taskService.getAllTasks(
      this.userId,
      this.itemPerPage,
      this.currentPage).subscribe((tasks: TaskAll) => {
        this.tasks = tasks.tasks;
      });

  }

  refreshTasks(data: { startRefresh: StartRefresh, response: any }): void {
    const { startRefresh } = data;
    if (startRefresh.refresh === true || this.startRefresh.refresh === true) {
      console.log(data.response.response);
      this.taskService.getAllTasks(
        this.userId,
        this.itemPerPage,
        this.currentPage).subscribe((tasks: TaskAll) => {
        this.tasks = tasks.tasks;
        this.totalItem = tasks.maxPosts;
      });
    }

    this.startRefresh.refresh = false;
    startRefresh.refresh = false;
  }


  refreshTasksDelete(data: { startRefresh: StartRefresh }): void {
    const { startRefresh } = data;
    if (startRefresh.refresh === true || this.startRefresh.refresh === true) {
      this.taskService.getAllTasks(
        this.userId,
        this.itemPerPage,
        this.currentPage).subscribe((tasks: TaskAll) => {
        this.tasks = tasks.tasks;
        this.totalItem = tasks.maxPosts;
      });
    }

    this.startRefresh.refresh = false;
    startRefresh.refresh = false;
  }

  RefreshContentWhenEditTask(tasks) {
    this.tasks = tasks;
  }

}
