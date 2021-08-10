// elementos padre
const sectionCenter = document.querySelector(".section-center");
const btnContainer = document.querySelector(".btn-container");

//ejecucion cuando la pag este lista
window.addEventListener("DOMContentLoaded", function () {
  crearProd(menu);
  crearBotonesDelMenu();
});

function crearProd(menu) {
  let displayMenu = menu.map((item) => {
    return `        
    <article class="menu-item">
          <img src=${item.img} alt=${item.title} class="photo" />
          <div class="item-info">
            <header>
              <h4>${item.title}</h4>
              <h4 class="price">$${item.price}</h4>
            </header>
            <p class="item-text">
              ${item.desc}
            </p>
          </div>
        </article>`;
  });

  //join une todos los elementos de un objeto en una cadena y devuelve la misma
  displayMenu = displayMenu.join("");
  sectionCenter.innerHTML = displayMenu;
}

function crearBotonesDelMenu() {
  const categorias = menu.reduce(
    (values, item) => {
      //si el valor no incluye categoria, guarda todos los productos en 'all'
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["todo"]
  );

  const botonesPorCategoria = categorias
    .map((category) => {
      return `
    <button type="button" class="filter-btn" data-id="${category}">
        ${category}
    </button>
    `;
    })
    .join("");

  btnContainer.innerHTML = botonesPorCategoria;

  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      //currentTarget nos trae el elemento
      //dataset nos trae el valor del data-id (puede ser otro) de un elemento, en este caso el id
      const categorias = e.currentTarget.dataset.id;
      const categoriasDelMenu = menu.filter((menuItem) => {
        if (menuItem.category === categorias) {
          return menuItem;
        }
      });
      if (categorias === "todo") {
        crearProd(menu);
      } else {
        crearProd(categoriasDelMenu);
      }
    });
  });
}
