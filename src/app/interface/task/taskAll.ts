import {TaskData} from './taskData';

export interface TaskAll {
  message: string;
  tasks: TaskData[];
  maxPosts: number;
}
