import { AbstractEntity } from 'src/database/abstract.entity';
import { Entity } from 'typeorm';

@Entity()
export class Tag extends AbstractEntity<Tag> {
  content: string;
}
