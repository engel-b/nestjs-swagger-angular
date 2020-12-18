import { TaskStatus } from '../../tasks/task-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty({ type: 'number' })
  id: string;

  @ApiProperty({ type: 'string' })
  title: string;

  @ApiProperty({ type: 'string' })
  domain: string;

  @ApiProperty({ type: 'string' })
  description: string;

  @ApiProperty({ type: 'string' })
  status: TaskStatus;

  @ApiProperty({ type: 'string' })
  userId: number;
}