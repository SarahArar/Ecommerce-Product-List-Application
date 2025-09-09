const productsContainer = document.getElementById("products-container");
let productItems;

const getProducts = async () => {
  try {
    const response = await fetch("http://localhost:3000/products"); // Pause until fetch Promise resolves
    const data = await response.json(); // Pause until json() Promise resolves
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
      </div>
                             
                              `;

  const productBtn = productElement.querySelector(".product__button");
  productBtn.id = `product__button_${product.id}`;
  productBtn.addEventListener("click", () => {
    getButtonBackground(false, false, products, productBtn.id);
  });

  return productElement;
};

const getButtonBackground = (isInitial, isZeroItems, products, productId) => {
  console.log("getButtonBackground products", products);

  const productButton = document.getElementById(`${productId}`);
  console.log("productButton", productButton);

  productButton.innerHTML = "";

  if (isInitial || isZeroItems) {
    return (productButton.innerHTML = `<img src="${iconPath}">
            <span>Add to Cart</span>`);
  }

  productButton.innerHTML = `
       <div class="product__button--active">
        <button id="remove__product" class="remove__product">-</button>
        <span class="product_count">1</span>
        <button id="add__product" class="add__product">+</button>
       </div>
    `;

  const addBtn = document.getElementById("add__product");
  const removeProductBtn = document.getElementById("remove__product");

  addBtn.addEventListener("click", () => addProduct(products, productId));
  removeProductBtn.addEventListener("click", () =>
    removeProduct(products, productId)
  );
};

const addProduct = (products, productId) => {
  const product = products.find((pro) => productId.includes(pro.id));
};

const removeProduct = (products, productId) => {
  const product = products.find((pro) => productId.includes(pro.id));
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
