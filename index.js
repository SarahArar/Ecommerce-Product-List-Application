const productsContainer = document.getElementById("products-container");
let productItems;
let cartItems = [];

const getProducts = async () => {
  try {
    const response = await fetch("http://localhost:3000/products"); // Pause until fetch Promise resolves
    const data = await response.json(); // Pause until json() Promise resolves
    data.map((product) => ({ ...product, quantity: 0 }));

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const createProductsPage = (productItems) => {
  productItems.forEach((product) => {
    const productCard = createProductCard(productItems, product);
    productsContainer.appendChild(productCard);
  });
};

const createProductCard = (products, product) => {
  const productElement = document.createElement("div");
  const iconPath = "/assets/images/icon-add-to-cart.svg";

  productElement.classList.add("product");

  productElement.innerHTML = `
      <div class="product__banner">
          <img class="product__image" src="${product.image.desktop}"/>
          <button class="product__button">
               <img src="${iconPath}">
               <span>Add to Cart</span>
          </button>
      </div>
      <div class="product__details">
          <h4 class="product__category fs-perset-4 fw-normal">${product?.category}</h4>
          <h3 class="product__name fs-perset-3 fw-semi-bold">${product.name}</h3>
          <span class="product__price fs-perset-3 fw-semi-bold">${product.price}$</span>
      </div>
      
                             
                              `;

  const productBtn = productElement.querySelector(".product__button");
  productBtn.id = `${product.id}`;

  productBtn.innerHTML = `<img src="${iconPath}">
            <span>Add to Cart</span>`;

  productBtn.addEventListener("click", () => {
    addProduct(products, product.id, true);
  });

  return productElement;
};

const updateButtonUI = (products, product) => {
  const id = product.id;
  const productButton = document.getElementById(`${id}`);

  // Update quantity only
  const counterSpan = productButton.querySelector(`#product_count_${id}`);
  if (counterSpan && product.quantity != 0) {
    counterSpan.textContent = product.quantity;
  } else {
    // first time adding, create inner HTML with buttons
    const iconPath = "/assets/images/icon-add-to-cart.svg";
    productButton.innerHTML =
      product.quantity == 0
        ? `<img src="${iconPath}"><span>Add to Cart</span>`
        : `
          <div class="product__button--active">
            <button id="remove__product_${id}" class="remove__product">-</button>
            <span class="product_count" id="product_count_${id}">${product.quantity}</span>
            <button id="add__product_${id}" class="add__product">+</button>
          </div>
        `;

    // Use delegation to avoid adding multiple listeners
    const addBtn = document.getElementById(`add__product_${id}`);
    const removeBtn = document.getElementById(`remove__product_${id}`);

    if (addBtn) {
      addBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        addProduct(products, id);
      });
    }
    if (removeBtn) {
      removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        removeProduct(products, id);
      });
    }
  }
};

const addProduct = (products, id) => {
  const product = products.find((pro) => pro.id === id);

  if (!product) {
    console.error(`Product with id ${id} not found`);
    return;
  }

  product.quantity += 1;

  updateButtonUI(products, product);
  updateCartView(product);
};

const removeProduct = (products, id) => {
  const product = products.find((pro) => pro.id === id);

  if (!product) {
    console.error(`Product with id ${id} not found`);
    return;
  }

  if (product.quantity > 0) {
    product.quantity -= 1;
  }

  updateButtonUI(products, product);
  updateCartView(product);
};

const updateCartView = (item) => {
  let cart = document.getElementById("cartItems");
  let isAlreadyOnCart;

  if (item) {
    isAlreadyOnCart = cartItems.findIndex((ci) => ci.id === item.id);

    if (isAlreadyOnCart === -1) {
      cartItems.push(item);
    }
  }

  const itemsCartCount = document.getElementById("cart_items_count");
  if (cartItems.length === 0) {
    cart.innerHTML = defaultCartBackground();
    itemsCartCount.textContent = "Your Cart (0)";
  } else {
    const divCount = document.querySelectorAll(".cart__item");
    if (divCount.length == 0) {
      cart.innerHTML = "";
    }

    if (item) {
      const itemIndex = cartItems.findIndex((listItem) => {
        return listItem.id === item.id;
      });

      const cartItemElement = document.getElementById(`cart_item_${item.id}`);
      if (item.quantity > 0) {
        if (!cartItemElement) {
          const cartItemCard = createCartItem(item);
          cart.append(cartItemCard);
        } else {
          const itemQuantity = document.getElementById(
            `item_quantity_${item.id}`
          );
          const itemTotal = document.getElementById(`item_total_${item.id}`);

          itemQuantity.innerText = `${item.quantity}X`;
          itemTotal.innerText = `$ ${item.quantity * item.price}`;
        }
      } else {
        const removeItemIndex = cartItems.findIndex(
          (cartItem) => cartItem.id === item.id
        );

        cart.removeChild(cartItemElement);
        cartItems.splice(removeItemIndex, 1);

        if (cartItems.length === 0) {
          cart.innerHTML = defaultCartBackground();
        }
      }

      itemsCartCount.textContent = `Your Cart (${cartItems.length})`;
    }
  }
};

const defaultCartBackground = () => {
  const emptyCartSource = `/assets/images/illustration-empty-cart.svg`;

  return `
        <img src="${emptyCartSource}" alt="Empty Card" class="empty-cart-illustration"/>
        <span class="fs-perset-4 fw-semi-bold add-items-label">Your added items will appear here</span>
      `;
};

const createCartItem = (item) => {
  // container div

  let cartItemDetails = document.createElement("div");
  let cartItemCard = document.createElement("div");

  cartItemCard.id = `cart_item_${item.id}`;
  cartItemCard.className = "cart__item";

  // item name
  const nameSpan = document.createElement("span");
  nameSpan.className = "item__name";
  nameSpan.textContent = item.name;

  // details container
  const detailsDiv = document.createElement("div");
  detailsDiv.className = "item__details";

  // quantity
  const quantitySpan = document.createElement("span");
  quantitySpan.className = "item_quantity";
  quantitySpan.id = `item_quantity_${item.id}`;
  quantitySpan.textContent = `${item.quantity}X`;

  // price
  const priceSpan = document.createElement("span");
  priceSpan.className = "item_price";
  priceSpan.textContent = `@ $${item.price}`;

  // total
  const totalSpan = document.createElement("span");
  totalSpan.id = `item_total_${item.id}`;
  totalSpan.classList.add("item__total", "fw-bold");
  totalSpan.textContent = `$ ${item.quantity * item.price} `;

  // build structure
  detailsDiv.appendChild(quantitySpan);
  detailsDiv.appendChild(priceSpan);
  detailsDiv.appendChild(totalSpan);

  cartItemDetails.appendChild(nameSpan);
  cartItemDetails.appendChild(detailsDiv);

  cartItemCard.appendChild(cartItemDetails);

  return cartItemCard;
};

const init = async () => {
  const productItems = await getProducts();
  createProductsPage(productItems);
  updateCartView();
  // getProductsView(0, numberOfItemsPerPage);
  // selectDomElements();
  // paginationCreator(numberOfPages);
  // createCart();

  //   createPageShadow();
  //   createModal();
};

init();
