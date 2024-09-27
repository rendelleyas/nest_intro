import { AbstractEntity } from "src/database/abstract.entity";
import { Column, Entity } from "typeorm";
@Entity({ name: 'items' })
export class Item extends AbstractEntity<Item> {

    @Column()
    name: string;

    @Column()
    public: boolean;

}
