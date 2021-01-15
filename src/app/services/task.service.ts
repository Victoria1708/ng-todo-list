import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Task} from '../models/task';
import {TasksRestService} from '../rest/tasks-rest.service';
import {tap} from 'rxjs/operators';
import {TaskStatus} from '../models/task-status';

@Injectable({providedIn: 'root'})
export class TaskService {

  private tasksSubject$: BehaviorSubject<Task[]>;
  public tasks$: Observable<Task[]>;

  constructor(private tasksRestService: TasksRestService) {
    this.tasksSubject$ = new BehaviorSubject<Task[]>([]);
    this.tasks$ = this.tasksSubject$.asObservable();

    this.tasksRestService.getAll$().subscribe((tasks: Task[]) => {
      this.tasksSubject$.next(tasks);
    });
  }

  createFromTitle$(title: string): Observable<Task> {
    const task: Task = {title, status: TaskStatus.NOT_STARTED};
    return this.tasksRestService.create$(task)
      .pipe(tap((newTask: Task) => {
      const tasks = this.tasksSubject$.getValue();
      tasks.push(newTask);
      this.tasksSubject$.next(tasks);
    }));
  }

  delete$(task: Task): Observable<Task> {
    return this.tasksRestService.delete$(task.id)
      .pipe(tap(() => {
      const currentTasks = this.tasksSubject$.getValue();
      const newTasks = currentTasks.filter(t => t.id !== task.id);
      this.tasksSubject$.next(newTasks);
    }));
  }

  start$(task): Observable<Task> {
    return this.tasksRestService.update$({...task, status: TaskStatus.IN_PROGRESS})
      .pipe(tap((updatedTask) => {
      const currentTasks = this.tasksSubject$.getValue();
      const updatedTasks = currentTasks.map((item) => {
        if (updatedTask.id === item.id) {
          return updatedTask;
        }
        return item;
      });
      this.tasksSubject$.next(updatedTasks);
    }));
  }

  complete$(task): Observable<Task> {
    return this.tasksRestService.update$({...task, status: TaskStatus.DONE})
      .pipe(tap((completedTask) => {
        const currentTasks = this.tasksSubject$.getValue();
        const updatedTasks = currentTasks.map((item) => {
          if (completedTask.id === item.id) {
            return completedTask;
          }
          return item;
        });
        this.tasksSubject$.next(updatedTasks);
      }));
  }
}
