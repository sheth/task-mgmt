import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task.model';


export class TaskStatusValidationPipe implements PipeTransform {
    readonly validStatuses = [
        TaskStatus.CLOSE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.CLOSE
    ];

    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase();
        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is an invalid status`);
        }
        return value;
    }

    private isStatusValid(status: any) {
        const idx = this.validStatuses.indexOf(status);
        return idx !== -1; // if idx is one of [0,1,2] then return true
    }
}
