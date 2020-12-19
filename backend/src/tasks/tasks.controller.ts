import { dto, serialize } from './dto';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';

@Crud({
    model: {
      type: Task
    },
    dto,
    serialize,
    query: {
      alwaysPaginate: true,
    },
})
@Controller('tasks')
@ApiTags('tasks')
export class TasksController implements CrudController<Task> {
  constructor(public service: TasksService) {}
}
