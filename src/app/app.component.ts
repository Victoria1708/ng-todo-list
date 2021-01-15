import {Component} from '@angular/core';
import {Task} from './models/task';
import {TaskService} from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private taskService: TaskService) {}

  createTask(title: string): void {
    this.taskService.createFromTitle$(title).subscribe();
  }

  startTask(task: Task): void {
    // this.tasksRestService.start$(task).subscribe(() => this.tasks$ = this.tasksRestService.getAll$());
  }

  toggleStatus(task: Task): void {
    // this.tasksRestService.toggle$(task).subscribe(() => this.tasks$ = this.tasksRestService.getAll$());
  }
}
