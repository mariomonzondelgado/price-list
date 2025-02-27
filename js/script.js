let data = null; // Variable global para almacenar los datos

document.addEventListener("DOMContentLoaded", () => {
  fetch('data/data.json') // Ajusta la ruta según sea necesario
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al cargar el archivo JSON: ${response.status}`);
      }
      return response.json();
    })
    .then(jsonData => {
      data = jsonData; // Almacena los datos en la variable global
      console.log(data); // Aquí puedes trabajar con los datos JSON
      generateCategoryButtons(); // Genera los botones después de cargar los datos
    })
    .catch(error => {
      console.error("Error:", error);
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "Ocurrió un error al cargar los datos. Por favor, inténtalo más tarde.";
      errorMessage.style.color = "red";
      document.body.appendChild(errorMessage);
    });
});

// Función para generar botones de categorías
function generateCategoryButtons() {
  const categoryButtonsContainer = document.querySelector(".category-buttons");

  if (data && data.categories) {
    data.categories.forEach(category => {
      const button = document.createElement("button");
      button.textContent = category.name;
      button.addEventListener("click", () => {
        navigateToCategory(category);
      });
      categoryButtonsContainer.appendChild(button);
    });
  }
  if (!data || !data.categories) {
    console.error("Los datos de categorías no están disponibles.");
    return;
  }
}

// Función para navegar a la página de categoría
function navigateToCategory(category) {
  if (!category) {
    console.error("Categoría no válida");
    return;
  }
  localStorage.setItem("selectedCategory", JSON.stringify(category));
  window.location.href = "pages/category.html";
}

// Función para cargar los productos en la página de categoría
if (window.location.pathname.includes("pages/category.html")) {
  document.addEventListener("DOMContentLoaded", () => {
    const selectedCategory = JSON.parse(localStorage.getItem("selectedCategory"));
    const categoryTitle = document.getElementById("category-title");
    const productList = document.getElementById("product-list");

    if (selectedCategory) {
      categoryTitle.textContent = selectedCategory.name;

      selectedCategory.prices.forEach(product => {
        const listItem = document.createElement("li");

        // Nombre del producto
        const productName = document.createElement("span");
        productName.className = "product-name";
        productName.textContent = product.name;

        // Precio del producto
        const productPrice = document.createElement("span");
        productPrice.className = "product-price";
        productPrice.textContent = `${product.price.toFixed(2)} €`;

        // Agrega los elementos al <li>
        listItem.appendChild(productName);
        listItem.appendChild(productPrice);

        // Agrega el <li> a la lista
        productList.appendChild(listItem);
      });
    }
  });
}