import { useState } from 'react';
import { TiArrowBack } from 'react-icons/ti';
import '../style/Cart.css';
import '../style/Header.css';
import '../style/ProductList.css';
import '../style/Checkout.css';
import { Link, useHistory } from 'react-router-dom';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import { BsX } from 'react-icons/bs';
import Header from '../component/Header';
import {
  getCartProducts, cleanCart, onRemoveProduct,
} from '../services/api';

export default function Checkout() {
  const history = useHistory();

  const [products, setProducts] = useState(getCartProducts());

  const onRemove = (id) => {
    onRemoveProduct(id);
    setProducts(getCartProducts());
  };

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
      <Header />
      <Link
        to="/cart"
        className="back-page"
      >
        <TiArrowBack className="icon-back" />
        Voltar
      </Link>
      <div className="content-cart">
        <div className="all-cart-products">
          <h2 className="title-cart">Revise seus Produtos</h2>
          {products.map((product) => (
            <>
              <div key={ product.id }>
                <div className="separator"> </div>
                <div className="content-revise">
                  <button
                    className="button-remove"
                    type="button"
                    data-testid="remove-product"
                    onClick={ () => onRemove(product.id) }
                  >
                    <BsX className="icon-delete" />
                  </button>
                  <img
                    src={ product.thumbnail }
                    alt={ product.id }
                    className="cart-img"
                  />
                  <p
                    data-testid="shopping-cart-product-name"
                    className="description-product"
                  >
                    { product.title }
                  </p>
                  <p data-testid="shopping-cart-product-price" className="total-product">
                    <span className="money">R$</span>
                    { (product.price * product.quantity).toFixed(2) }
                  </p>
                </div>
              </div>
              <Link
                data-testid="shopping-cart-button"
                to="/cart"
                className="cart-finaly"
              >
                <RiShoppingCart2Fill />
                <p
                  data-testid="shopping-cart-product-quantity"
                  className="quantity-cart finaly"
                >
                  { product.quantity }
                </p>
              </Link>
            </>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="fullName">
          Nome Completo:
          <input
            value={ state.fullName }
            onChange={ onChange('fullName') }
            data-testid="checkout-fullname"
            id="fullName"
          />
        </label>
        <div className="payment-form">
          <label htmlFor="email">
            E-mail:
            <input
              value={ state.email }
              onChange={ onChange('email') }
              data-testid="checkout-email"
              id="email"
            />
          </label>
          <label htmlFor="cpf">
            CPF:
            <input
              value={ state.cpf }
              onChange={ onChange('cpf') }
              data-testid="checkout-cpf"
            />
          </label>
          <label htmlFor="phone">
            Telefone:
            <input
              value={ state.phone }
              onChange={ onChange('phone') }
              data-testid="checkout-phone"
            />
          </label>
          <label htmlFor="cep">
            CEP:
            <input
              value={ state.cep }
              onChange={ onChange('cep') }
              data-testid="checkout-cep"
            />
          </label>
          <label htmlFor="address">
            Endereço:
            <input
              value={ state.address }
              onChange={ onChange('address') }
              data-testid="checkout-address"
            />
          </label>

          <label htmlFor="payment">
            Ticket
            <input
              type="radio"
              checked={ state.payment === 'ticket' }
              onChange={ onChecked }
              name="payment"
              value="ticket"
              data-testid="ticket-payment"
            />
          </label>
          <label htmlFor="payment">
            Visa
            <input
              type="radio"
              checked={ state.payment === 'visa' }
              onChange={ onChecked }
              name="payment"
              value="visa"
              data-testid="visa-payment"
            />
          </label>
          <label htmlFor="payment">
            Master
            <input
              type="radio"
              checked={ state.payment === 'master' }
              onChange={ onChecked }
              name="payment"
              value="master"
              data-testid="master-payment"
            />
          </label>
          <label htmlFor="payment">
            Elo
            <input
              type="radio"
              checked={ state.payment === 'elo' }
              onChange={ onChecked }
              name="payment"
              value="elo"
              data-testid="elo-payment"
            />
          </label>
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
