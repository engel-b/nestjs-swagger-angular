import { TaskDto } from './task.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetTasksDto {
  @ApiProperty({ type: [TaskDto] })
  data: Array<TaskDto>;

  @ApiProperty({ type: Number })
  total: number;

  @ApiProperty({ type: Number })
  count: number;

  @ApiProperty({ type: Number })
  page: number;

  @ApiProperty({ type: Number })
  pageCount: number;
}