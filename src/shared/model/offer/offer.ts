export type TLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type TCity = {
  name: string;
  location: TLocation;
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
