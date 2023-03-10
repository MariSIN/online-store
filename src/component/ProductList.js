import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import { addToCart } from '../services/api';
import '../style/ProductList.css';
import '../style/Home.css';

function ProductList({ products, onAddItems }) {
  const history = useHistory();

  if (!products.searched) {
    return (
      <div className="initial-message">
        <h1 className="title-initial">
          Você ainda não realizou uma busca
        </h1>
        <h4
          data-testid="home-initial-message"
          className="describe-initial"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h4>
      </div>
    );
  }

  if (products.results.length === 0) {
    return (
      <>
        <div className="notFound">
          <HiOutlineEmojiSad
            className="sad"
          />
          <h1 className="title-initial">
            Nenhum produto foi encontrado
          </h1>
          <h4
            className="describe-initial"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h4>
        </div>
        <div className="empty-content"> </div>
      </>
    );
  }
  return (
    <div className="all-products">
      { products.results.map((prod) => (
        <div
          type="button"
          data-testid="product"
          key={ prod.id }
          className="product-content"
        >
          <button
            type="button"
            data-testid="product-detail-link"
            className="button-products"
            onClick={ () => history.push(`/product/${prod.id}`) }
          >
            {prod.shipping.free_shipping && (
              <div data-testid="free-shipping" className="free">Frete Grátis!</div>)}
            <img src={ prod.thumbnail } alt={ prod.title } className="img-products" />
            <span>
              <p className="description-products">{ prod.title }</p>
              <p className="price">
                <span className="money">R$</span>
                {`${(prod.price).toFixed(2)}`}
              </p>
            </span>
          </button>
          <button
            type="button"
            className="button-add"
            data-testid="product-add-to-cart"
            onClick={ () => {
              addToCart(prod);
              onAddItems();
            } }
          >
            Adicionar ao carrinho
          </button>
        </div>
      ))}
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.shape({
    searched: PropTypes.bool,
    results: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  onAddItems: PropTypes.func.isRequired,
};

export default ProductList;
