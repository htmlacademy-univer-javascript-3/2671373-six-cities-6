import {TOffer} from '@/shared/model/offer';
import {FC, memo} from 'react';
import {OfferCard} from '@/entities/Offer';

interface IOffersList {
  offers: TOffer[];
  onSelectOffer?: (offer?: TOffer) => void;
  onChangeFavoriteStatus: (id: string, favorite: boolean) => Promise<void>;
}


const OffersList: FC<IOffersList> = memo((props: IOffersList) => {
  const { offers, onChangeFavoriteStatus, onSelectOffer } = props;

  return (
    <>
      {offers.map((offer) => (
        <OfferCard
          offer={offer}
          key={offer.id}
          onChangeFavoriteStatus={onChangeFavoriteStatus}
          onSelectOffer={onSelectOffer}
        />
      ))}
    </>
  );
});

OffersList.displayName = 'OffersList';

export default OffersList;
