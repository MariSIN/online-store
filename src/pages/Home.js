import { useEffect, useState } from 'react';
import '../style/ProductList.css';
import { Link } from 'react-router-dom';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import { ImSearch } from 'react-icons/im';
import TotalProductsCart from '../component/TotalProductsCart';
import ProductList from '../component/ProductList';

import { getCartProducts,
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import Header from '../component/Header';

export default function Home() {
  const [quantityProducts, setQuantity] = useState(getCartProducts());

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

  const onAddItems = () => {
    setQuantity(getCartProducts());
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
            className="search-button"
          >
            <ImSearch />
          </button>
        </div>
        <Header />
        <Link data-testid="shopping-cart-button" to="/cart" className="cart">
          <RiShoppingCart2Fill />
          <TotalProductsCart valor={ quantityProducts } />
        </Link>
      </div>
      <div className="content-category">
        <div className="all-classes">
          <h2 className="title-categories">Categorias</h2>
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
        <ProductList products={ products } onAddItems={ onAddItems } />
        <div> </div>
      </div>
    </>
  );
}
