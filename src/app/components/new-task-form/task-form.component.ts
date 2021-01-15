import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-task-form',
  templateUrl: 'task-form.component.html',
  styleUrls: ['task-form.component.scss']
})
export class TaskFormComponent {

  public taskTitle: string;
  @Output() create: EventEmitter<string>;

  constructor() {
    this.create = new EventEmitter<string>();
  }

  createTask(): void {
    if (this.taskTitle) {
      this.create.emit(this.taskTitle);
      this.taskTitle = '';
    }
  }
}
