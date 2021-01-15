import {Component} from '@angular/core';
import {Task} from '../../models/task';
import {TaskService} from '../../services/task.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: 'task-list.component.html',
  styles: [`.table thead th {border-top: 0}`]
})
export class TaskListComponent {

  public tasks$: Observable<Task[]>;
  constructor(private taskService: TaskService) {
    this.tasks$ = taskService.tasks$;
  }

  onDeleteTask(task: Task): void {
    this.taskService.delete$(task).subscribe();
  }

  onStartTask(task: Task): void {
    this.taskService.start$(task).subscribe();
  }

  onCompleteTask(task: Task): void {
    this.taskService.complete$(task).subscribe();
  }
}
