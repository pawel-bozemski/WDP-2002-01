import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './ProductBox.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faExchangeAlt,
  faShoppingBasket,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar, faHeart } from '@fortawesome/free-regular-svg-icons';
import Button from '../Button/Button';
import currencySymbol from '../../../utils/currencySymbol';
import currencyConverter from '../../../utils/currencyConverter';

const ProductBox = ({
  id,
  name,
  price,
  promo,
  stars,
  img,
  oldPrice,
  addToCompare,
  allComperedProducts,
  getCurrency,
}) => {
  const [data, setData] = useState();

  useEffect(() => {
    fetch('https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR,PLN,USD')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setData(data);
      });
  }, []);

  const handleClickToCompare = product => {
    const duplicates = allComperedProducts.filter(item => item.id === product.id)
      .length;

    if (allComperedProducts.length < 4 && !duplicates) {
      addToCompare(product);
    }
  };

  const formatedPrice = price => {
    if (data) {
      let rates = data.rates[getCurrency];
      return currencyConverter(price, getCurrency, rates);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.root}>
        <div className={styles.photo}>
          {promo && <div className={styles.sale}>{promo}</div>}
          <img src={img} alt={`${name} bed`} />
          <div className={styles.buttons}>
            <Button variant='small'>Quick View</Button>
            <Button variant='small'>
              <FontAwesomeIcon icon={faShoppingBasket} />
              ADD TO CART
            </Button>
          </div>
        </div>
        <div className={styles.content}>
          <h5>{name}</h5>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map(i => (
              <a key={i} href='#'>
                {i <= stars ? (
                  <FontAwesomeIcon icon={faStar}>{i} stars</FontAwesomeIcon>
                ) : (
                  <FontAwesomeIcon icon={farStar}>{i} stars</FontAwesomeIcon>
                )}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.line}></div>
        <div className={styles.actions}>
          <div className={styles.outlines}>
            <Button variant='outline'>
              <FontAwesomeIcon icon={faHeart}>Favorite</FontAwesomeIcon>
            </Button>
            <Button
              variant='outline'
              onClick={() => handleClickToCompare({ id, name, img })}
            >
              <FontAwesomeIcon icon={faExchangeAlt}>Add to compare</FontAwesomeIcon>
            </Button>
          </div>
          <div className={styles.price}>
            {oldPrice && <div className={styles.oldPrice}></div>}
            {oldPrice && (
              <Button noHover variant='outline'>
                <del>
                  {formatedPrice(oldPrice)} {currencySymbol(getCurrency)}
                </del>
              </Button>
            )}
            <Button noHover variant='small'>
              {formatedPrice(price)} {currencySymbol(getCurrency)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductBox.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  name: PropTypes.string,
  price: PropTypes.number,
  oldPrice: PropTypes.number,
  promo: PropTypes.string,
  stars: PropTypes.number,
  img: PropTypes.string,
  addToCompare: PropTypes.func,
  allComperedProducts: PropTypes.array,
  getCurrency: PropTypes.string,
};

export default ProductBox;
