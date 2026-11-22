export interface Art {
  _id: string;
  name: string;
  genre: string;
  year: number;
  imageUrl?: string;
}

export interface CreateArtDto {
  name: string;
  genre: string;
  year?: number;
  imageUrl?: string;
}

export interface UpdateArtDto {
  name: string;
  genre: string;
  year?: number;
}

