import {FC, memo} from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

interface ILocationsList {
  locations: string[];
  active: string;
}

const LocationsList: FC<ILocationsList> = memo((props: ILocationsList) => {

  const { active, locations } = props;

  return (
    <div className="tabs">
      <section className="locations container">
        <ul
          className="locations__list tabs__list"
          data-testid="offers-locations"
        >
          {locations.map((location) => (
            <li className="locations__item" key={location}>
              <Link
                className={classNames('locations__item-link tabs__item', active === location && 'tabs__item--active')}
                to={`?city=${location}`}
                data-testid={`location-${location}`}
              >
                <span>{location}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
});

LocationsList.displayName = 'LocationsList';

export default LocationsList;
