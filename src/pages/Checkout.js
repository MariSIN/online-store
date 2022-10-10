import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  getCartProducts, cleanCart,
} from '../services/api';

export default function Checkout() {
  const history = useHistory();

  const products = getCartProducts();

  const [state, setState] = useState({
    fullName: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    payment: '',
  });
  const [error, setError] = useState(false);

  const onChange = (key) => (e) => {
    setState((oldValue) => ({
      ...oldValue,
      [key]: e.target.value,
    }));
  };

  const onChecked = (e) => {
    setState((oldValue) => ({
      ...oldValue,
      payment: e.target.value,
    }));
  };

  const onBuy = () => {
    setError(false);

    if ([
      state.fullName,
      state.email,
      state.phone,
      state.cpf,
      state.address,
      state.cep,
      state.payment,
    ].some((i) => i === '')) return setError(true);

    cleanCart();
    history.push('/');
  };

  if (products.length <= 0) {
    history.push('/');
  }

  return (
    <>
      <Link to="/cart">Back</Link>
      {products.map((product) => (
        <div key={ product.id }>
          <p data-testid="shopping-cart-product-name">{ product.title }</p>
          <p data-testid="shopping-cart-product-price">
            { (product.price * product.quantity).toFixed(2) }
          </p>
          <p data-testid="shopping-cart-product-quantity">{ product.quantity }</p>
        </div>
      ))}
      <div>
        <input
          value={ state.fullName }
          onChange={ onChange('fullName') }
          data-testid="checkout-fullname"
        />
        <input
          value={ state.email }
          onChange={ onChange('email') }
          data-testid="checkout-email"
        />
        <input
          value={ state.cpf }
          onChange={ onChange('cpf') }
          data-testid="checkout-cpf"
        />
        <input
          value={ state.phone }
          onChange={ onChange('phone') }
          data-testid="checkout-phone"
        />
        <input
          value={ state.cep }
          onChange={ onChange('cep') }
          data-testid="checkout-cep"
        />
        <input
          value={ state.address }
          onChange={ onChange('address') }
          data-testid="checkout-address"
        />

        <div>
          <input
            type="radio"
            checked={ state.payment === 'ticket' }
            onChange={ onChecked }
            name="payment"
            value="ticket"
            data-testid="ticket-payment"
          />
          <input
            type="radio"
            checked={ state.payment === 'visa' }
            onChange={ onChecked }
            name="payment"
            value="visa"
            data-testid="visa-payment"
          />
          <input
            type="radio"
            checked={ state.payment === 'master' }
            onChange={ onChecked }
            name="payment"
            value="master"
            data-testid="master-payment"
          />
          <input
            type="radio"
            checked={ state.payment === 'elo' }
            onChange={ onChecked }
            name="payment"
            value="elo"
            data-testid="elo-payment"
          />
        </div>

        <button
          type="button"
          data-testid="checkout-btn"
          onClick={ onBuy }
        >
          Comprar
        </button>
      </div>
      {error && <p data-testid="error-msg">Campos inválidos</p>}
    </>
  );
}
