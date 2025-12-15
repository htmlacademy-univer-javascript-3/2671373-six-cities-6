import {TOffer} from '@/shared/model/offer/offer.ts';

export interface IOfferCard {
  offer: TOffer;
  changeFavoriteStatus: (id: string, favorite: boolean) => Promise<void>;
  selectOffer?: (offer?: TOffer) => void;
}
