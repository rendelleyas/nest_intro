export class CreateItemDto {
  name: string;
  public: boolean;
  listing: CreateListingDto;
}

export class CreateListingDto {
  description: string;
  rating: number;
}


