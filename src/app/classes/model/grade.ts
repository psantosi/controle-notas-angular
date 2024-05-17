import { Task } from '../model/task';

export interface Grade {
  id: Number;
  grade: Number;
  taskObj: Task;
}
