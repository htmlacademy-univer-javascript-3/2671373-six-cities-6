import {TOffer} from '@/shared/model/offer';
import {FC, memo} from 'react';
import {OfferCard} from '@/entities/Offer';

interface IOffersList {
  offers: TOffer[];
  selectOffer?: (offer?: TOffer) => void;
  changeFavoriteStatus: (id: string, favorite: boolean) => Promise<void>;
}


const OffersList: FC<IOffersList> = memo((props: IOffersList) => {
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
});

OffersList.displayName = 'OffersList';

export default OffersList;
