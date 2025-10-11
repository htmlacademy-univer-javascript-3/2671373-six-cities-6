export enum EOfferType {
    APARTMENT= 'Apartment',
    ROOM = 'Room',
}

export type TOfferRating = 1 | 2 | 3 | 4 | 5

export type TOffer = {
  id: string;
  title: string;
  img: string;
  price: number;
  type: EOfferType;
  rating: TOfferRating;
}
