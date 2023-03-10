import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import { BsX } from 'react-icons/bs';
import {
  getCartProducts, changeQuantityOfProduct, onRemoveProduct,
} from '../services/api';
import Header from '../component/Header';
import '../style/Cart.css';
import '../style/Header.css';
import '../style/ProductList.css';
import TotalProducts from '../component/TotalProducts';

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
        <Link to="/online-store" className="back-page">
          <TiArrowBack className="icon-back" />
          Voltar
        </Link>
        <div className="notFound">
          <HiOutlineEmojiSad
            className="sad"
          />
          <h2 data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <Link to="/online-store" className="back-page">
        <TiArrowBack className="icon-back" />
        Voltar
      </Link>
      <div className="content-cart">
        <div className="all-cart-products">
          <h2 className="title-cart">Carrinho de Compras</h2>
          {products.map((product) => (
            <div className="cart-content" key={ product.id }>
              <div className="separator"> </div>
              <button
                className="button-remove"
                type="button"
                data-testid="remove-product"
                onClick={ () => onRemove(product.id) }
              >
                <BsX className="icon-delete" />
              </button>
              <img src={ product.thumbnail } alt={ product.title } className="cart-img" />
              <p
                data-testid="shopping-cart-product-name"
                className="description-product"
              >
                { product.title }
              </p>
              <div className="content-quantity">
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
                  className="quantity"
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
              </div>
              <p data-testid="shopping-cart-product-price" className="total-product">
                <span className="money">R$</span>
                { `${(product.price * product.quantity).toFixed(2)}` }
              </p>
            </div>
          ))}
        </div>
        <div className="total-price-products">
          <div className="content-total-cart">
            <TotalProducts valor={ products } />
            <Link
              data-testid="checkout-products"
              to="/checkout"
              className="button-finish-shop"
            >
              Finalizar Compra
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
