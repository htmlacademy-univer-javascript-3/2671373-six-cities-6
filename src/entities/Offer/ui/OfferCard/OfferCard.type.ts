import {TOffer} from '@/shared/model/offer/offer.ts';

export interface IOfferCard {
  offer: TOffer;
  onChangeFavoriteStatus: (id: string, favorite: boolean) => Promise<void>;
  onSelectOffer?: (offer?: TOffer) => void;
}
