import { Controller, Get, Req, Request, Param, Post, Body, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task-dto';

@Controller('//tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks(@Req() request: Request): Task[] {
        console.log('--' + request.url + '--');
        return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        // console.log("--"+request.url+"--");
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id') 
    deleteTask(@Param('id') id: string): void {
        this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateStatus(@Param('id') id: string, @Body('status') status: TaskStatus): Task {
        return this.tasksService.updateStatus(id, status);
    }

}
