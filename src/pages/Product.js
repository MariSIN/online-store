import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RiShoppingCart2Fill, RiStarFill } from 'react-icons/ri';
import { TiArrowBack } from 'react-icons/ti';
import TotalProductsCart from '../component/TotalProductsCart';
import {
  getProductById,
  addToCart, addEvaluation,
  getEvaluation,
  getCartProducts } from '../services/api';
import '../style/Product.css';
import Header from '../component/Header';

const validateEmail = (email) => String(email)
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [evaluations, setEvaluations] = useState([]);
  const [quantityProducts, setQuantity] = useState(getCartProducts());

  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [shipping, setShipping] = useState(false);

  const [error, setError] = useState(false);

  const onSubmitEvaluation = () => {
    setError(false);
    const ratingMinSize = 1;
    const ratingMaxSize = 5;

    if (rating < ratingMinSize || rating > ratingMaxSize) return setError(true);
    if (!email || !validateEmail(email)) return setError(true);

    addEvaluation(product.id, { email, rating, text });
    setEvaluations(getEvaluation(product.id));
    setEmail('');
    setRating(1);
    setText('');
  };

  const number5 = 5;

  useEffect(() => {
    getProductById(id).then((res) => {
      setProduct(res);
      setShipping(res.shipping.free_shipping);
    });
    setEvaluations(getEvaluation(id));
  }, [id]);

  const onAddItems = () => {
    setQuantity(getCartProducts());
  };

  return (
    <>
      <Header />
      <Link to="/" className="back-page">
        <TiArrowBack className="icon-back" />
        Voltar
      </Link>
      <div className="content-cart">
        <div className="product-content details">
          <p
            data-testid="product-detail-name"
            className="details-p"
          >
            { product && product.title }
          </p>
          <div className="the-product">
            <span className="free produtc-free">{ shipping && 'Frete Grátis'}</span>
            <img
              alt={ product && product.title }
              src={ product && product.thumbnail }
              data-testid="product-detail-image"
              className="product-image"
            />
          </div>
          <p className="price size-price" data-testid="product-detail-price">
            <span className="money size-money">R$</span>
            { product && product.price }
          </p>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            className="button-add"
            onClick={ () => {
              onAddItems();
              addToCart(product);
            } }
          >
            Adicionar ao carrinho
          </button>
        </div>

        <Link
          data-testid="shopping-cart-button"
          to="/cart"
          className="cart-finaly cart-product content-quantity-product"
        >
          <RiShoppingCart2Fill />
          <TotalProductsCart
            valor={ quantityProducts }
          />
        </Link>
        <span className="content-avaluation">
          <div className="form-rating">
            <input
              type="email"
              data-testid="product-detail-email"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
              className="Email"
              placeholder="Email"
            />
            <div className="container">
              {[...Array(number5)].map((index, i) => {
                const ratingValue = i + 1;
                return (
                  <label htmlFor={ index } key={ index }>
                    <input
                      type="radio"
                      name="rating"
                      id={ index }
                      value={ ratingValue }
                      data-testid={ `${ratingValue}-rating` }
                      onClick={
                        () => { setRating(ratingValue); }
                      }
                      className="rating"
                    />
                    <RiStarFill
                      className="star"
                      size={ 25 }
                      color={ ratingValue <= rating ? '#ffc107' : '#91829C' }
                    />
                  </label>
                );
              })}
            </div>
            <textarea
              value={ text }
              data-testid="product-detail-evaluation"
              onChange={ (e) => setText(e.target.value) }
              placeholder="Mensagem (opcional)"
            />
            <button
              type="button"
              data-testid="submit-review-btn"
              onClick={ onSubmitEvaluation }
            >
              Avaliar
            </button>
            {error && <p data-testid="error-msg">Campos inválidos</p>}
          </div>
        </span>
      </div>
      <div>
        {evaluations.map((ev, key) => (
          <div key={ key }>
            <p data-testid="review-card-email">{ev.email}</p>
            <p data-testid="review-card-rating">{ev.rating}</p>
            <p data-testid="review-card-evaluation">{ev.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}
