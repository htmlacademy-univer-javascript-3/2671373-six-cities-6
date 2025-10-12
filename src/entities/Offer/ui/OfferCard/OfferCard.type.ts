import {TOffer} from '@/shared/model/offer/offer.ts';

export interface IOfferCard {
  offer: TOffer;
  selectActiveOfferId: (offerId: string) => void;
  isActive: boolean;
}
