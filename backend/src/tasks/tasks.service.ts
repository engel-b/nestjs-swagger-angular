import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

@Injectable()
export class TasksService extends TypeOrmCrudService<Task> {
    constructor(@InjectRepository(Task) repo) {
      super(repo);
    }
  }
