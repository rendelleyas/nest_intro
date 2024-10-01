import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const listing = createItemDto.listing ? new Listing(createItemDto.listing) : null;

    const tags = createItemDto.tags.map((createTagDto) => new Tag(createTagDto));

    const item = new Item({
      ...createItemDto,
      listing,
      comments: [],
      tags,
    });

    await this.entityManager.save(item);

    return item;
  }

  async findAll() {
    return await this.itemRepository.find();
  }

  findOne(id: number) {
    return this.itemRepository.findOne({
      where: { id: id },
      relations: ['listing', 'comments', 'tags'], 
    });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    // const item = await this.itemRepository.findOneBy({ id: id });

    // const comments = updateItemDto.comments.map(
    //   (createCommentDto) => new Comment(createCommentDto),
    // );

    // item.public = updateItemDto.public;
    // item.comments = comments;

    // return this.entityManager.save(item);

    await this.entityManager.transaction(async (entityManager) => {
        const item = await entityManager.findOneBy(Item, { id: id });

        const comments = updateItemDto.comments.map(
          (createCommentDto) => new Comment(createCommentDto),
        );

        item.public = updateItemDto.public;
        item.comments = comments;

        await entityManager.save(item);

    });
  }

  async remove(id: number) {
    await this.itemRepository.delete(id);
  }
}
