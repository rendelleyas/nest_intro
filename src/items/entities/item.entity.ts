import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { Listing } from './listing.entity';
import { Comment } from './comment.entity';
import { Tag } from './tag.entity';
@Entity({ name: 'items' })
export class Item extends AbstractEntity<Item> {
  @Column()
  name: string;

  @Column()
  public: boolean;

  @OneToOne(() => Listing, { cascade: true })
  @JoinColumn()
  listing: Listing;

  @OneToMany(() => Comment, (comment) => comment.item, { cascade: true })
  comments: Comment[];

  @ManyToMany(() => Tag, {cascade: true})
  @JoinTable()
  tags: Tag[]
}
