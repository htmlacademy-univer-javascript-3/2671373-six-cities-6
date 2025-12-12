import {FC} from 'react';
import * as classNames from 'classnames';
import {Link} from 'react-router-dom';

interface ILocationsList {
  locations: string[];
  active: string;
}

const LocationsList: FC<ILocationsList> = (props) => {

  const { active, locations } = props;

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {locations.map((location) => (
            <li className="locations__item" key={location}>
              <Link className={classNames('locations__item-link tabs__item', active === location && 'tabs__item--active')} to={`?city=${location}`}>
                <span>{location}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default LocationsList;
