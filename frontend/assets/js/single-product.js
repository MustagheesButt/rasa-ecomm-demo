const isSingleProductPage = document.querySelector('#single-product') !== null
const queryParams = new URLSearchParams(window.location.search)
const pid = queryParams.get('pid')

document.addEventListener('products-loaded', function() {
  if (pid !== null && isSingleProductPage) {
    const product = products.find(p => p.id == pid)

    document.querySelector('.product-images img').setAttribute('src', product.images[0])
    document.querySelector('.product-title').innerHTML = product.title
    document.querySelector('.product-price').innerHTML = `$${product.price}`
    document.querySelector('.product-short-description').innerHTML = product.short_description
    document.querySelector('.product-description').innerHTML = product.description
    document.querySelector('.add-to-cart').setAttribute('data-pid', product.id)
  }
})