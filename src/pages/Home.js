import { useEffect, useState } from 'react';
import '../style/ProductList.css';
import { Link } from 'react-router-dom';
import { RiShoppingCartLine } from 'react-icons/ri';
import { ImSearch } from 'react-icons/im';
import ProductList from '../component/ProductList';

import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';

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
      <div className="input-categories">
        <div className="search">
          <input
            className="input-search"
            data-testid="query-input"
            value={ query }
            placeholder="Digite o que você busca..."
            onChange={ (e) => setQuery(e.target.value) }
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ onSearch }
            id="search-button"
          >
            <ImSearch />
          </button>
        </div>
        <Link data-testid="shopping-cart-button" to="/cart" id="cart">
          <RiShoppingCartLine />
        </Link>
      </div>
      <div className="content-category">
        <div id="all-classes">
          <h2 id="title-categories">Categorias</h2>
          <div className="detalhe"> </div>
          <div className="categories">
            {categories.length > 0
            && categories.map((cat) => (
              <button
                className="categorys-button"
                type="button"
                key={ cat.id }
                data-testid="category"
                onClick={ () => onCategoryFilter(cat.id) }
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <ProductList products={ products } />
      </div>
    </>
  );
}
