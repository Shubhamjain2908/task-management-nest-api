import { Injectable, NotFoundException } from '@nestjs/common';
// import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
    ) { }

    async getTaskById(id: number): Promise<Task> {
        return this.findTask(id);
    }

    // getAllTasks(): Task[] {
    //     return [...this.tasks];
    // }

    // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    //     const { status, search } = filterDto;
    //     let tasks = this.getAllTasks();
    //     if (status) {
    //         tasks = tasks.filter(t => t.status === status);
    //     }
    //     if (search) {
    //         tasks = tasks.filter(t => t.title.includes(search) || t.description.includes(search));
    //     }
    //     return tasks;
    // }

    // createTask(taskDto: CreateTaskDto): Task {
    //     const { title, description } = taskDto;
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };

    //     this.tasks.push(task);
    //     return task;
    // }

    // deleteTask(id: string): void {
    //     this.findTask(id);
    //     this.tasks = this.tasks.filter(task => task.id !== id);
    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.findTask(id);
    //     task.status = status;
    //     return task;
    // }

    private async findTask(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`No task found with the Id => ${id}`);
        }
        return found;
    }
}
