import { RiShoppingBag3Fill } from 'react-icons/ri';

function Header() {
  return (
    <header className="header">
      <RiShoppingBag3Fill className="bag-shop" />
      <div className="title-header">
        <h1 className="title-header-h1">Front-End</h1>
        <h3 className="title-header-h3">Online Store</h3>
      </div>
    </header>

  );
}
export default Header;
