import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { CrudRequest } from '@nestjsx/crud';
import { DeepPartial } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService extends TypeOrmCrudService<Task> {
    constructor(@InjectRepository(Task) repo) {
      super(repo);
    }

    createOne(req: CrudRequest, dto: DeepPartial<Task>): Promise<Task> {
      dto.status = TaskStatus.OPEN;
      return super.createOne(req, dto);
    }
  }
