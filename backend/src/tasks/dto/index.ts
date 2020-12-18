import { GetTasksDto } from './get-tasks.dto';
import { SerializeOptions } from '@nestjsx/crud';
import { TaskDto } from './task.dto';
import { CreateTaskDto } from './create-task.dto';

// Requests
export const dto = {
  create: CreateTaskDto,
};

// Responses
export const serialize: SerializeOptions = {
  get: TaskDto,
  getMany: GetTasksDto,
};
