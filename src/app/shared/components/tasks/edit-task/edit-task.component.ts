import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TaskService} from '../../../../services/task/task.service';
import {TaskData} from '../../../../interface/task/taskData';
import {TaskRes} from '../../../../interface/task/taskRes';
import {HelperService} from '../../../services/helper.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  @Input() task: TaskData;
  @Input() tasks: any;
  @Input() userId: string;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  isSubmitted: boolean;

  editTaskDto: FormGroup;
  formData: FormData = new FormData();

  selectedImage: string = null;

  constructor(private fb: FormBuilder,
              private taskService: TaskService,
              private helperService: HelperService) { }

  ngOnInit(): void {
    this.editTaskDto = this.fb.group({
      title: new FormControl(this.task.title),
      description: new FormControl(this.task.description),
      image: new FormControl(null)
    });

  }

  editTask() {
    this.formData.append('title', this.editTaskDto.value.title);
    this.formData.append('description', this.editTaskDto.value.description);
    this.isSubmitted = true;

    this.taskService.editTask(this.task._id, this.userId, this.formData)
      .subscribe((data: TaskRes) => {

        for (let i = 0; i < this.tasks.length; i++) {
          if (this.tasks[i]._id === this.task._id) {
            this.tasks[i] = data.task;
            this.change.emit(this.tasks);
            break;
          }
        }

        this.isSubmitted = false;
        this.deleteFormContent();
        this.helperService.hideDialog();
        this.helperService.openSnackbar('Task updated successfully', null);
      }, err => {
        this.isSubmitted = false;
        this.helperService.openSnackbar('An error has occurred', null);
        this.deleteFormContent();
      });
  }

  deleteFormContent() {
    this.editTaskDto.reset();
    this.formData.delete('title');
    this.formData.delete('description');
    this.formData.delete('image');
  }

  onChangeSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      this.selectedImage = file.name;
      this.formData.append('image', file);
    }
  }

}
