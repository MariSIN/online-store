import { RiShoppingBag3Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <Link to="/online-store" className="store">
        <RiShoppingBag3Fill className="bag-shop" />
        <div className="title-header">
          <h1 className="title-header-h1">Front-End</h1>
          <h3 className="title-header-h3">Online Store</h3>
        </div>
      </Link>
    </header>

  );
}
export default Header;
