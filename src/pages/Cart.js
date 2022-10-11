import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getCartProducts, changeQuantityOfProduct, onRemoveProduct,
} from '../services/api';

export default function Cart() {
  const [products, setProducts] = useState(getCartProducts());

  const onChangeQuantity = (id, cb) => {
    changeQuantityOfProduct(id, cb);
    setProducts(getCartProducts());
  };

  const onRemove = (id) => {
    onRemoveProduct(id);
    setProducts(getCartProducts());
  };

  if (products.length <= 0) {
    return (
      <>
        <Link to="/">Back</Link>
        <p data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </p>
      </>
    );
  }

  return (
    <>
      <Link to="/">Back</Link>
      {products.map((product) => (
        <div key={ product.id }>
          <button
            type="button"
            data-testid="remove-product"
            onClick={ () => onRemove(product.id) }
          >
            Remove
          </button>
          {console.log(product)}
          <p data-testid="shopping-cart-product-name">{ product.title }</p>
          <button
            type="button"
            data-testid="product-decrease-quantity"
            onClick={ () => onChangeQuantity(product.id, (qt) => qt - 1) }
          >
            -
          </button>
          <p data-testid="shopping-cart-product-price">
            { (product.price * product.quantity).toFixed(2) }
          </p>
          <button
            type="button"
            data-testid="product-increase-quantity"
            onClick={ () => onChangeQuantity(product.id, (qt) => qt + 1) }
          >
            +
          </button>
          <p data-testid="shopping-cart-product-quantity">{ product.quantity }</p>
        </div>
      ))}
      <Link data-testid="checkout-products" to="/checkout">Terminar compra</Link>
    </>
  );
}
