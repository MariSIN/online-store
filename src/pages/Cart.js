import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TiDelete } from 'react-icons/ti';
import {
  getCartProducts, changeQuantityOfProduct, onRemoveProduct,
} from '../services/api';
import '../style/Cart.css';

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
      <div id="all-cart-products">
        <h2 id="title-cart">Revise seus Produtos</h2>
        {products.map((product) => (
          <div id="cart-content" key={ product.id }>
            <div className="separator"> </div>
            <button
              id="button-remove"
              type="button"
              data-testid="remove-product"
              onClick={ () => onRemove(product.id) }
            >
              <TiDelete id="icon-delete" />
            </button>
            <img src={ product.thumbnail } alt={ product.title } className="cart-img" />
            <p
              data-testid="shopping-cart-product-name"
              id="description-product"
            >
              { product.title }
            </p>
            <button
              type="button"
              data-testid="product-decrease-quantity"
              onClick={ () => onChangeQuantity(product.id, (qt) => qt - 1) }
              className="sub-sum-buttom"
            >
              -
            </button>
            <div
              data-testid="shopping-cart-product-quantity"
              id="quantity"
            >
              { product.quantity }
            </div>
            <button
              type="button"
              data-testid="product-increase-quantity"
              className="sub-sum-buttom"
              onClick={ () => onChangeQuantity(product.id, (qt) => qt + 1) }
            >
              +
            </button>
            <p data-testid="shopping-cart-product-price">
              { (product.price * product.quantity).toFixed(2) }
            </p>
          </div>
        ))}
      </div>
      <Link data-testid="checkout-products" to="/checkout">Terminar compra</Link>
    </>
  );
}
