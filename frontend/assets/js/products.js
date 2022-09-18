const productsContainer = document.querySelector('#products')

let products = []

async function init() {
  await loadProducts()

  renderProducts()
}

async function loadProducts() {
  // fetch products
  try {
    // Note: Make sure you are running the frontend on a webserver like `python3 -m http.server`
    // otherwise you could get a CORS error
    const response = await fetch("data/products.json")
    products = await response.json()
  } catch (err) {
    console.error("If you are running the file directly you could get a CORS error. Please see README.md")
    if (productsContainer)
      productsContainer.innerHTML = "<h2 class=\"text-3xl text-center\">Could not fetch products. Something went wrong!</h2>"
  }

  document.dispatchEvent(new Event("products-loaded"))
}

function renderProducts() {
  if (productsContainer) {
    products.forEach(p => {
      productsContainer.append(newProduct(p.id, p.title, p.price, p.short_description, p.images[0]))
    })
  }

  document.dispatchEvent(new Event("products-rendered"))
}

// function to render a product card
function newProduct(id, title, price, description, thumbnail = 'https://placeimg.com/400/225/arch') {
  const p = document.createElement('div')
  p.classList.add('card', 'w-80', 'md:w-[31%]', 'lg:w-[23%]', 'bg-base-100', 'shadow-xl')
  p.innerHTML = `
    <a href="/product.html?pid=${id}">
      <div><img class="object-contain h-64" src="${thumbnail}" alt="${title}" width="300" height="300" /></div>
    </a>
    <div class="card-body">
      <a href="/product.html?pid=${id}">
        <h2 class="card-title">${title}</h2>
      </a>
      <p>${description.slice(0, 90) + (description.length > 50 ? '...' : '')}</p>
      <div class="card-actions justify-between">
        <strong>$${price}</strong>
        <button class="btn btn-primary add-to-cart" data-pid="${id}"></button>
      </div>
    </div>`

  return p
}

init()