import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTaskDto {
    @ApiProperty({ type: 'string' })
    @IsNotEmpty()
    title: string;

    @ApiProperty({ type: 'string' })
    @IsNotEmpty()
    description: string;
}