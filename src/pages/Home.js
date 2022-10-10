import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../component/ProductList';

import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

export default function Home() {
  const [products, setProducts] = useState({ searched: false, results: [] });
  const [categories, setCategories] = useState([]);

  const [query, setQuery] = useState('');

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    });
  }, []);

  const onSearch = async () => {
    const result = await getProductsFromCategoryAndQuery(undefined, query);
    setProducts({ searched: true, results: result?.results });
  };

  const onCategoryFilter = async (id) => {
    const result = await getProductsFromCategoryAndQuery(id);
    setProducts({ searched: true, results: result?.results });
  };

  return (
    <>
      <div>
        {categories.length > 0 && categories.map((cat) => (
          <button
            type="button"
            key={ cat.id }
            data-testid="category"
            onClick={ () => onCategoryFilter(cat.id) }
          >
            { cat.name }
          </button>
        ))}
      </div>

      <div>
        <input
          data-testid="query-input"
          value={ query }
          onChange={ (e) => setQuery(e.target.value) }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ onSearch }
        >
          Busca
        </button>
      </div>
      <Link data-testid="shopping-cart-button" to="/cart">Carrinho</Link>
      <ProductList products={ products } />
    </>
  );
}
