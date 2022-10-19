import { useState, useEffect } from 'react';
import '../style/Cart.css';
import PropTypes from 'prop-types';

export default function TotalProductsCart(props) {
  const { valor } = props;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(0);
    let sum = 0;
    valor.forEach((e) => {
      sum += e.quantity;
    });
    setTotal((prev) => prev + sum);
  }, [valor]);

  return <div>{total}</div>;
}

TotalProductsCart.propTypes = {
  valor: PropTypes.instanceOf(Array).isRequired,
};
