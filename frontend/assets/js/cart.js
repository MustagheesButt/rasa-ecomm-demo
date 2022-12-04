class Cart {
  static init() {
    document.addEventListener('products-rendered', function () {
      const addToCartBtns = document.querySelectorAll('.add-to-cart')

      // 1. add icon to all add to cart buttons
      // 2. add click listener to all add to cart buttons
      addToCartBtns.forEach(btn => {
        btn.innerHTML = `Add To &nbsp;
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
        `

        btn.addEventListener('click', Cart.addToCart)
      })
    })

    document.addEventListener('products-loaded', function () {
      Cart.renderCart()

      Cart.setRemoveFromCartListeners()
    })

    document.addEventListener('cart-updated', Cart.renderCartCount)

    Cart.renderCartCount()
  }

  static addToCart(e) {
    const pid = parseInt(e.currentTarget.dataset.pid)
    const cart = Cart.getCart()

    if (pid) {
      // if already exists, increment quantity
      const i = cart.findIndex(p => p.pid === pid)
      if (i !== -1) {
        cart[i].qty += 1
      } else {
        cart.push({ pid, qty: 1 })
      }

      localStorage.setItem('cart', JSON.stringify(cart))

      const product = products.find(p => p.id === pid)
      alert(product.title + " was added to cart")
    }

    document.dispatchEvent(new Event('cart-updated'))
  }

  static removeFromCart(e) {
    const pid = parseInt(e.currentTarget.dataset.pid)
    let cart = Cart.getCart()
    cart = cart.filter(p => p.pid !== pid)

    localStorage.setItem('cart', JSON.stringify(cart))

    document.dispatchEvent(new Event('cart-updated'))
    // re-render table
    Cart.renderCart()
  }

  static getCart() {
    const cart = localStorage.getItem('cart')
    if (cart)
      return JSON.parse(cart)
    return []
  }

  static setRemoveFromCartListeners() {
    const removeFromCartBtns = document.querySelectorAll('.remove-from-cart')
    removeFromCartBtns.forEach(btn => {
      btn.addEventListener('click', Cart.removeFromCart)
    })
  }

  static renderCart() {
    // #cart-table is only in cart page
    const cartTable = document.querySelector('#cart-table')
    const toHideOnEmpty = document.querySelectorAll('.hide-on-empty-cart')

    if (!cartTable) {
      return
    }

    const cart = Cart.getCart()

    if (cart.length === 0) {
      const emptyMsg = document.createElement('h2')
      emptyMsg.classList.add('text-2xl', 'text-center', 'min-h-[60vh]')
      emptyMsg.innerHTML = "Your cart is empty!"
      cartTable.replaceWith(emptyMsg)
      toHideOnEmpty.forEach(ele => {
        ele.classList.add('hidden')
      })
      return
    }

    let subtotal = 0
    const tableBody = cartTable.querySelector('tbody')
    tableBody.innerHTML = ''
    cart.forEach(({ pid, qty }, i) => {
      const product = products.find(p => p.id === pid)
      const _subtotal = product.price * qty
      subtotal += _subtotal

      tableBody.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${product.title}</td>
          <td>$${product.price}</td>
          <td>${qty}</td>
          <td>$${_subtotal}</td>
          <td>
            <button class="remove-from-cart" data-pid="${product.id}">Remove</button>
          </td>
        </tr>
      `
    })

    const subTotalEle = document.querySelector('.subtotal')
    subTotalEle.innerHTML = `$${subtotal}`

    const totalEle = document.querySelector('.total')
    totalEle.innerHTML = `$${subtotal}`

    Cart.setRemoveFromCartListeners()
  }

  static renderCartCount() {
    const elements = document.querySelectorAll('.cart-count')

    elements.forEach(ele => {
      ele.innerHTML = Cart.getCart().length
    })
  }
}

Cart.init()