import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function TotalProducts(props) {
  const { valor } = props;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(0);
    let sum = 0;
    valor.forEach((e) => {
      sum += e.price * e.quantity;
    });
    setTotal((prev) => prev + sum);
  }, [valor]);

  return (
    <div>
      <div>{total.toFixed(2)}</div>
    </div>
  );
}

TotalProducts.propTypes = {
  valor: PropTypes.instanceOf(Array).isRequired,
};
