import { AbstractEntity } from 'src/database/abstract.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Listing } from './listing.entity';
@Entity({ name: 'items' })
export class Item extends AbstractEntity<Item> {
  @Column()
  name: string;

  @Column()
  public: boolean;

  @OneToOne(() => Listing, { cascade: true })
  @JoinColumn()
  listing: Listing;
}
