import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task-dto';
import * as uuid from 'uuid/v1';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];


    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const {title, description} = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        console.log('in createTask taskService.ts size=' + this.tasks.length);
        return task;
    }

    getAllTasks(): Task[] {
        console.log('in getAllTasks taskService.ts size=' + this.tasks.length);
        return this.tasks;
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter(task => (task.id !== id));
    }

    updateStatus(id: string, status: TaskStatus): Task {
        const t: Task = this.tasks.find(task => task.id === id);
        if(t) {
            // console.log('in updateStatus status=' + status);
            // t.status = TaskStatus[status];
            // console.log('in updateStatus task.status=' + t.status);
            //this.deleteTask(id);            
            //this.tasks.push(t);
            t.status = status;
            return t;
        } else {
            return null;
        }
    }
}
