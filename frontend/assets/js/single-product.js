const queryParams = new URLSearchParams(window.location.search)
const pid = queryParams.get('pid')

document.addEventListener('products-loaded', function() {
  if (pid !== null) {
    const product = products.find(p => p.id == pid)

    const productPage = document.querySelector('#single-product')

    productPage.querySelector('.product-images img').setAttribute('src', product.images[0])
    productPage.querySelector('.product-title').innerHTML = product.title
    productPage.querySelector('.product-price').innerHTML = `$${product.price}`
    productPage.querySelector('.product-short-description').innerHTML = product.short_description
    productPage.querySelector('.product-description').innerHTML = product.description
    productPage.querySelector('.add-to-cart').setAttribute('data-pid', product.id)
  }
})