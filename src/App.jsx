import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

// import { SortButtons } from './SortButtons';
// import { GoodList } from './GoodList';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const SortButtons = ({ visibleGoods, setVisibleGoods, goods }) => {
  const sortButtons = [
    'Sort alphabetically',
    'Sort by length',
    'Reverse',
    'Reset',
  ];

  const INFO = 'is-info';
  const SUCCESS = 'is-success';
  const WARNING = 'is-warning';
  const DANGER = 'is-danger';

  const [activeButton, setActiveButton] = useState('');

  useEffect(() => {
    if (activeButton === 'Sort alphabetically') {
      setVisibleGoods(
        [...visibleGoods].sort((good1, good2) => good1.localeCompare(good2)),
      );
    }

    if (activeButton === 'Sort by length') {
      setVisibleGoods(
        [...visibleGoods].sort((good1, good2) => good1.length - good2.length),
      );
    }

    if (activeButton === 'Reverse') {
      setVisibleGoods([...visibleGoods].reverse());
    }

    if (activeButton === 'Reset') {
      setVisibleGoods(goods);
    }
  }, [activeButton]);

  return (
    <div className="buttons">
      {sortButtons.map(button => (
        <button
          key={button}
          type="button"
          className={cn(
            'button',
            [
              button === 'Sort alphabetically' && INFO,
              button === 'Sort by length' && SUCCESS,
              button === 'Reverse' && WARNING,
              button === 'Reset' && DANGER,
            ],
            {
              'is-light': activeButton !== button,
            },
          )}
          onClick={() =>
            setActiveButton(prev =>
              // eslint-disable-next-line prettier/prettier
              prev !== button ? button : setVisibleGoods(goodsFromServer))
          }
        >
          {button}
        </button>
      ))}
    </div>
  );
};

export const GoodList = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <li key={good} data-cy="Good">
          {good}
        </li>
      ))}
    </ul>
  );
};

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);

  return (
    <div className="section content">
      <SortButtons
        visibleGoods={visibleGoods}
        setVisibleGoods={setVisibleGoods}
        goods={goodsFromServer}
      />

      <GoodList goods={visibleGoods} />
    </div>
  );
};
