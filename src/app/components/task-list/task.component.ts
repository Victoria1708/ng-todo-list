import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from '../../models/task';
import {TaskStatus} from '../../models/task-status';

/* tslint:disable:component-selector no-output-native */
@Component({
  selector: 'tr[appTask]',
  styleUrls: ['task.component.scss'],
  templateUrl: 'task.component.html'
})
export class TaskComponent {

  public TaskStatus: typeof TaskStatus;
  @Input() task: Task;
  @Output() start: EventEmitter<Task>;
  @Output() delete: EventEmitter<Task>;
  @Output() complete: EventEmitter<Task>;

  constructor() {
    this.start = new EventEmitter<Task>();
    this.delete = new EventEmitter<Task>();
    this.complete = new EventEmitter<Task>();
    this.TaskStatus = TaskStatus;
  }

  onDeleteTask(task: Task): void {
    this.delete.emit(task);
  }

  onStartTask(task: Task): void {
    this.start.emit(task);
  }

  toggleStatus(task: Task): void {
    if (task.status === TaskStatus.DONE) {
      this.start.emit(task);
    } else {
      this.complete.emit(task);
    }
  }
}
