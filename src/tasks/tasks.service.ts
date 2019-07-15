import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './tasks-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
    ) { }

    async createTask(taskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(taskDto, user);
    }

    async getTaskById(id: number, user: User): Promise<Task> {
        return this.findTask(id, user.id);
    }

    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, user);
    }

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`No task found with the Id => ${id}`);
        }
    }

    async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.findTask(id, user.id);
        task.status = status;
        await task.save();
        return task;
    }

    private async findTask(id: number, userId: number): Promise<Task> {
        const found = await this.taskRepository.findOne({ where: { id, userId } });
        if (!found) {
            throw new NotFoundException(`No task found with the Id => ${id}`);
        }
        return found;
    }
}
