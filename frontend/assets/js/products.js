const productsContainer = document.querySelector('#products')

const products = [
  { title: "Shoes", description: "If a dog chews shoes whose shoes does he choose?" },
  { title: "Shoes", description: "If a dog chews shoes whose shoes does he choose?" },
  { title: "Shoes", description: "If a dog chews shoes whose shoes does he choose?" },
  { title: "Shoes", description: "If a dog chews shoes whose shoes does he choose?" },
  { title: "Shoes", description: "If a dog chews shoes whose shoes does he choose?" },
]

products.forEach(p => {
  productsContainer.append(newProduct(p.title, p.description))
})

function newProduct(title, description) {
  const p = document.createElement('div')
  p.classList.add('card', 'w-80', 'md:w-[24%]', 'bg-base-100', 'shadow-xl')
  p.innerHTML = `
    <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">${title}</h2>
      <p>${description}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Buy Now</button>
      </div>
    </div>`

  return p
}