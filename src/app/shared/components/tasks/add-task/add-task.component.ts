import { HelperService } from './../../../services/helper.service';
import { TaskService } from './../../../../services/task/task.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StartRefresh} from '../../../../commons/classes/refresh';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  @Input() userId: string;

  @Output() change: EventEmitter<any> = new EventEmitter();
  @Input() startRefresh: StartRefresh;

  taskDto: FormGroup;
  formData: FormData = new FormData();

  isSubmitted: boolean;
  selectedImage: string = null;

  constructor(private fb: FormBuilder,
              private taskService: TaskService,
              private helperService: HelperService) { }

  ngOnInit(): void {
    this.taskDto = this.fb.group({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      image: new FormControl(null, Validators.required)
    });
  }

  addTask(): void {
    this.formData.append('title', this.taskDto.value.title);
    this.formData.append('description', this.taskDto.value.description);
    this.isSubmitted = true;

    this.taskService.addTask(this.userId, this.formData)
      .subscribe((res: any) => {
        /////
        this.startRefresh.refresh = true;
        const data = { startRefresh: this.startRefresh, response: res };
        this.change.emit(data);

        this.isSubmitted = false;
        this.helperService.openSnackbar('Task created successfully', null);
        this.helperService.hideDialog();
        this.deleteFormContent();
      }, () => {

        this.isSubmitted = false;
        this.helperService.openSnackbar('An error has occurred!', null);
        this.deleteFormContent();
      });
  }

  deleteFormContent() {
    this.taskDto.reset();
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
