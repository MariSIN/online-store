export async function getCategories() {
  const URL = 'https://api.mercadolibre.com/sites/MLB/categories';
  const result = await fetch(URL);
  const data = await result.json();

  return data;
}

export async function getProductsFromCategoryAndQuery(categoryID, query) {
  const URL = categoryID
    ? `https://api.mercadolibre.com/sites/MLB/search?category=${categoryID}`
    : `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;

  const result = await fetch(URL);
  const data = result.json();

  return data;
}

export async function getProductById(id) {
  const URL = `https://api.mercadolibre.com/items/${id}`;
  const result = await fetch(URL);
  const data = await result.json();

  return data;
}

export function cleanCart() {
  window.localStorage.setItem('cart', JSON.stringify([]));
}

export function addToCart(product) {
  const cart = JSON.parse(window.localStorage.getItem('cart'));
  const productIndex = cart.map((prod) => prod.id).indexOf(product.id);

  const negativeOne = -1;

  if (productIndex === negativeOne) {
    cart.push(
      { id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        available_quantity: product.available_quantity,
      },
    );
  } else {
    const quantity = cart[productIndex].quantity + 1;

    cart[productIndex] = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity,
      available_quantity: product.available_quantity,
    };
  }
  window.localStorage.setItem('cart', JSON.stringify(cart));
}

export function changeQuantityOfProduct(id, cb) {
  const cart = JSON.parse(window.localStorage.getItem('cart'));
  const productIndex = cart.map((prod) => prod.id).indexOf(id);

  const negativeOne = -1;

  if (productIndex === negativeOne) return;

  const quantity = cb(cart[productIndex].quantity);

  if (quantity < 1) return;
  if (quantity > cart[productIndex].available_quantity) return;

  cart[productIndex].quantity = quantity;
  window.localStorage.setItem('cart', JSON.stringify(cart));
}

export function onRemoveProduct(id) {
  const cart = JSON.parse(window.localStorage.getItem('cart'));
  const productIndex = cart.map((prod) => prod.id).indexOf(id);

  const negativeOne = -1;

  if (productIndex === negativeOne) return;

  cart.splice(productIndex, 1);
  window.localStorage.setItem('cart', JSON.stringify(cart));
}

export function getCartProducts() {
  return JSON.parse(window.localStorage.getItem('cart'));
}

export function addEvaluation(id, evaluation) {
  const evaluationStorage = window.localStorage.getItem(id);

  if (!evaluationStorage) {
    return window.localStorage.setItem(id, JSON.stringify([evaluation]));
  }

  const evaluationItems = JSON.parse(evaluationStorage);
  evaluationItems.push(evaluation);

  return window.localStorage.setItem(id, JSON.stringify(evaluationItems));
}

export function getEvaluation(id) {
  const evaluationStorage = window.localStorage.getItem(id);

  return evaluationStorage ? JSON.parse(evaluationStorage) : [];
}
