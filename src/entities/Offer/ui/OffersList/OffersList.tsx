import {TOffer} from '@/shared/model/offer';
import {FC, useState} from 'react';
import {OfferCard} from '@/entities/Offer';

interface IOffersList {
  offers: TOffer[];
  changeFavoriteStatus: (id: string, favorite: boolean) => Promise<void>;
}


const OffersList: FC<IOffersList> = (props) => {
  const { offers, changeFavoriteStatus } = props;

  const [activeOfferId, setActiveOfferId] = useState('');

  const selectActiveOfferId = (id: string) => {
    setActiveOfferId(id);
  };

  const isOfferActive = (id: string) => activeOfferId === id;

  return (
    <>
      {offers.map((offer) => (
        <OfferCard
          offer={offer}
          key={offer.id}
          isActive={isOfferActive(offer.id)}
          selectActiveOfferId={selectActiveOfferId}
          changeFavoriteStatus={changeFavoriteStatus}
        />
      ))}
    </>
  );
};

export default OffersList;
