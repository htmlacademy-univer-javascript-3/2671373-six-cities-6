export type TLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type TCity = {
  name: string;
  location: TLocation;
}

export type TUser = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export enum EOfferType {
  APARTMENT = 'apartment',
  ROOM = 'room',
  HOUSE = 'house',
  HOTEL = 'hotel',
}

export type TOfferRating = 1 | 2 | 3 | 4 | 5

export type TOffer = {
  id: string;
  title: string;
  type: EOfferType;
  price: number;
  city: {
    name: string;
    location: TLocation;
  };
  location: TLocation;
  isFavorite?: boolean;
  isPremium: boolean;
  rating: TOfferRating;
  previewImage: string;
};

export type TOfferCard = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: TCity;
  location: TLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: TUser;
  images: string[];
  maxAdults: number;
}

// TODO to another model
export type TComment = {
  id: string;
  date: string;
  user: TUser;
  comment: string;
  rating: number;
}
