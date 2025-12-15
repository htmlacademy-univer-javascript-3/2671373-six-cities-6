import {TOffer} from '@/shared/model/offer';
import {FC} from 'react';
import {OfferCard} from '@/entities/Offer';

interface IOffersList {
  offers: TOffer[];
  selectOffer?: (offer?: TOffer) => void;
  changeFavoriteStatus: (id: string, favorite: boolean) => Promise<void>;
}


const OffersList: FC<IOffersList> = (props) => {
  const { offers, changeFavoriteStatus, selectOffer } = props;

  return (
    <>
      {offers.map((offer) => (
        <OfferCard
          offer={offer}
          key={offer.id}
          changeFavoriteStatus={changeFavoriteStatus}
          selectOffer={selectOffer}
        />
      ))}
    </>
  );
};

export default OffersList;
