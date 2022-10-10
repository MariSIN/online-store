import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, addToCart, addEvaluation, getEvaluation } from '../services/api';

const validateEmail = (email) => String(email)
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [evaluations, setEvaluations] = useState([]);

  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');

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

  useEffect(() => {
    getProductById(id).then((res) => {
      setProduct(res);
    });
    setEvaluations(getEvaluation(id));
  }, [id]);

  return (
    <>
      <Link to="/">Back</Link>
      <Link data-testid="shopping-cart-button" to="/cart">Carrinho</Link>
      <p data-testid="product-detail-name">
        { product && product.title }
      </p>
      <img
        alt={ product && product.title }
        src={ product && product.thumbnail }
        data-testid="product-detail-image"
      />
      <p data-testid="product-detail-price">
        { product && product.price }
      </p>
      <button
        type="button"
        data-testid="product-detail-add-to-cart"
        onClick={ () => addToCart(product) }
      >
        Adicionar ao carrinho
      </button>

      <div>
        <input
          type="email"
          data-testid="product-detail-email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
        {Array.from({ length: 5 }, (_, i) => i).map((index) => (
          <input
            type="checkbox"
            key={ index }
            name="rating"
            checked={ rating >= (index + 1) }
            value={ index }
            data-testid={ `${index + 1}-rating` }
            onChange={
              () => { setRating(index + 1); }
            }
          />
        ))}
        <textarea
          value={ text }
          data-testid="product-detail-evaluation"
          onChange={ (e) => setText(e.target.value) }
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
