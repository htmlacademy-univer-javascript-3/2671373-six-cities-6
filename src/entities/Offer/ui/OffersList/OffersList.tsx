import {TOffer} from '@/shared/model/offer';
import {FC, useState} from 'react';
import {OfferCard} from '@/entities/Offer';

interface IOffersList {
  offers: TOffer[];
}


const OffersList: FC<IOffersList> = (props) => {
  const { offers } = props;

  const [activeOfferId, setActiveOfferId] = useState('');

  const selectActiveOfferId = (id: string) => {
    setActiveOfferId(id);
  };

  const isOfferActive = (id: string) => activeOfferId === id;

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          offer={offer}
          key={offer.id}
          isActive={isOfferActive(offer.id)}
          selectActiveOfferId={selectActiveOfferId}
        />
      ))}
    </div>
  );
};

export default OffersList;
