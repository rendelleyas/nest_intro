export class CreateItemDto {
  name: string;
  public: boolean;
  listing: CreateListingDto;
  tags : CreateTagDto[];
}

export class CreateListingDto {
  description: string;
  rating: number;
}


export class CreateTagDto {
  content: string;
}


