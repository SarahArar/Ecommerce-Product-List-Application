const productsContainer = document.getElementById("products-container");
let productItems;

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
  if (counterSpan && product.quantity != 0 ) {
    counterSpan.textContent = product.quantity;
  } else {
    // first time adding, create inner HTML with buttons
    console.log("from else", product.quantity);
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
  console.log("product", product);

  if (!product) {
    console.error(`Product with id ${id} not found`);
    return;
  }

  product.quantity += 1;

  updateButtonUI(products, product);
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

  console.log(" product.quantity ", product.quantity);

  updateButtonUI(products, product);
};

const init = async () => {
  const productItems = await getProducts();
  createProductsPage(productItems);
  // getProductsView(0, numberOfItemsPerPage);
  // selectDomElements();
  // paginationCreator(numberOfPages);
  // createCart();

  //   createPageShadow();
  //   createModal();
};

init();
