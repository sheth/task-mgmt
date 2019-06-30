import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task-dto';
import * as uuid from 'uuid/v1';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];


    getTaskById(id: string): Task {
        const found = this.tasks.find(task => task.id === id);
        if(!found) {
            throw new NotFoundException(`Task with id ${id} not found`);
        } else {
            return found;
        }
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

    getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
        const{ status, search } = filterDto;
        let tasks = this.getAllTasks();
        if(status) {
            tasks = tasks.filter(task => status === task.status)
        }

        if(search) {
            tasks = tasks.filter(task => 
                task.title.includes(search) ||
                task.description.includes(search),
            );
        }

        return tasks;
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter(task => (task.id !== id));
    }

    updateStatus(id: string, status: TaskStatus): Task {
        const t: Task = this.getTaskById(id);
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
