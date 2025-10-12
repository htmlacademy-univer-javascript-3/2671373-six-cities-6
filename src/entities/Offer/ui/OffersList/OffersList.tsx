import {TOffer} from '@/shared/model/offer';
import {FC} from 'react';
import {OfferCard} from '@/entities/Offer';

interface IOffersList {
  offers: TOffer[];
}


const OffersList: FC<IOffersList> = (props) => {
  const { offers } = props;

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard offer={offer} key={offer.id} />
      ))}
    </div>
  );
};

export default OffersList;
