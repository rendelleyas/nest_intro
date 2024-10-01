import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {
    comments: CreateCommentDto[];
}

export class CreateCommentDto {
  content: string;
}
