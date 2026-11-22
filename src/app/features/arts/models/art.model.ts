export interface Art {
  _id: string;
  name: string;
  genre: string;
  year: number;
}

export interface CreateArtDto {
  name: string;
  genre: string;
  year?: number;
}

export interface UpdateArtDto {
  name: string;
  genre: string;
  year?: number;
}

