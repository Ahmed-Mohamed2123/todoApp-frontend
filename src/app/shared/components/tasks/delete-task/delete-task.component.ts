import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskService} from '../../../../services/task/task.service';
import {TaskData} from '../../../../interface/task/taskData';
import {StartRefresh} from '../../../../commons/classes/refresh';
import {HelperService} from '../../../services/helper.service';
import {THREE} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss']
})
export class DeleteTaskComponent implements OnInit {

  @Input() userId: string;
  @Input() task: TaskData;
  @Input() tasks: any;

  @Output() change: EventEmitter<any> = new EventEmitter();
  @Input() startRefresh: StartRefresh;

  isSubmitted: boolean;

  constructor(private taskService: TaskService,
              private helperService: HelperService) { }

  ngOnInit(): void {
  }

  deleteTask() {
    this.isSubmitted = true;

    this.taskService.deleteTask(this.task._id, this.userId)
      .subscribe(() => {

        for (let i = 0; i < this.tasks.length; i++) {
          if (this.tasks[i]._id === this.task._id) {
            this.tasks.splice(i, 1);

            this.startRefresh.refresh = true;
            const data = { startRefresh: this.startRefresh };
            this.change.emit(data);
            break;
          }
        }

        this.isSubmitted = false;
        this.helperService.openSnackbar('This task deleted successfully', null);
        this.helperService.hideDialog();
      }, () => {
        this.isSubmitted = false;
        this.helperService.openSnackbar('An error has occurred!', null);
        this.helperService.hideDialog();
      })
  }

}
