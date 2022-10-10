import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addToCart } from '../services/api';

function ProductList({ products }) {
  const history = useHistory();

  if (!products.searched) {
    return (
      <p data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
    );
  }

  if (products.results.length === 0) return <h2>Nenhum produto foi encontrado</h2>;

  return (
    products.results.map((prod) => (
      <div
        type="button"
        data-testid="product"
        key={ prod.id }
      >
        <button
          type="button"
          data-testid="product-detail-link"
          onClick={ () => history.push(`/product/${prod.id}`) }
        >
          { prod.title }
        </button>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => addToCart(prod) }
        >
          Adicionar ao carrinho
        </button>
      </div>
    ))
  );
}

ProductList.propTypes = {
  products: PropTypes.shape({
    searched: PropTypes.bool,
    results: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

export default ProductList;
