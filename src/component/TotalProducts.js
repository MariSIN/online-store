import { useState, useEffect } from 'react';
import '../style/Cart.css';
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
    <div className="content-total">
      <h3 className="title-total-price-products">Valor Total da Compra:</h3>
      <div className="total-value">
        R$
        {total.toFixed(2)}
      </div>
    </div>
  );
}

TotalProducts.propTypes = {
  valor: PropTypes.instanceOf(Array).isRequired,
};
