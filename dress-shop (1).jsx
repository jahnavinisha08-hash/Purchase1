import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus, ArrowLeft, Check } from 'lucide-react';

const DressShop = () => {
  const [currentPage, setCurrentPage] = useState('shop');
  const [cart, setCart] = useState([]);
  const [selectedDress, setSelectedDress] = useState(null);
  const [checkoutData, setCheckoutData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const dresses = [
    {
      id: 1,
      name: "Elegant Evening Gown",
      price: 189.99,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=700&fit=crop",
      description: "Stunning floor-length gown perfect for formal events",
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'Navy', 'Burgundy']
    },
    {
      id: 2,
      name: "Summer Floral Dress",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=700&fit=crop",
      description: "Light and breezy floral print for warm days",
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Pink', 'Blue', 'Yellow']
    },
    {
      id: 3,
      name: "Cocktail Party Dress",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&h=700&fit=crop",
      description: "Chic knee-length dress for cocktail parties",
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Red', 'Black', 'Emerald']
    },
    {
      id: 4,
      name: "Casual Midi Dress",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=700&fit=crop",
      description: "Comfortable everyday midi dress",
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['White', 'Beige', 'Gray']
    },
    {
      id: 5,
      name: "Maxi Boho Dress",
      price: 94.99,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=700&fit=crop",
      description: "Flowing bohemian style maxi dress",
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Coral', 'Turquoise', 'Purple']
    },
    {
      id: 6,
      name: "Little Black Dress",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500&h=700&fit=crop",
      description: "Classic LBD for any occasion",
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black']
    }
  ];

  const addToCart = (dress, size, color) => {
    const cartItem = {
      ...dress,
      selectedSize: size,
      selectedColor: color,
      cartId: Date.now()
    };
    setCart([...cart, cartItem]);
    setCurrentPage('shop');
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    setCurrentPage('confirmation');
  };

  // Shop Page
  const ShopPage = () => (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Elegant Dresses</h1>
          <button
            onClick={() => setCurrentPage('cart')}
            className="relative p-2 hover:bg-gray-100 rounded-full"
          >
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dresses.map(dress => (
            <div key={dress.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src={dress.image}
                alt={dress.name}
                className="w-full h-80 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{dress.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{dress.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">${dress.price}</span>
                  <button
                    onClick={() => {
                      setSelectedDress(dress);
                      setCurrentPage('product');
                    }}
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );

  // Product Detail Page
  const ProductPage = () => {
    const [selectedSize, setSelectedSize] = useState(selectedDress?.sizes[0] || '');
    const [selectedColor, setSelectedColor] = useState(selectedDress?.colors[0] || '');

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <button
              onClick={() => setCurrentPage('shop')}
              className="flex items-center text-gray-700 hover:text-gray-900"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Shop
            </button>
            <button
              onClick={() => setCurrentPage('cart')}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <img
                src={selectedDress.image}
                alt={selectedDress.name}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{selectedDress.name}</h1>
              <p className="text-3xl font-bold text-gray-900 mt-4">${selectedDress.price}</p>
              <p className="text-gray-600 mt-4">{selectedDress.description}</p>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Size</label>
                <div className="flex gap-2">
                  {selectedDress.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Color</label>
                <div className="flex gap-2">
                  {selectedDress.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-md ${
                        selectedColor === color
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => addToCart(selectedDress, selectedSize, selectedColor)}
                className="w-full bg-black text-white py-3 rounded-md mt-8 hover:bg-gray-800 transition-colors text-lg font-semibold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  };

  // Cart Page
  const CartPage = () => (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => setCurrentPage('shop')}
            className="flex items-center text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft size={20} className="mr-2" />
            Continue Shopping
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some beautiful dresses to your cart</p>
            <button
              onClick={() => setCurrentPage('shop')}
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              {cart.map(item => (
                <div key={item.cartId} className="flex items-center gap-4 py-4 border-b last:border-b-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-32 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
                    <p className="text-sm text-gray-600">Color: {item.selectedColor}</p>
                    <p className="text-lg font-bold text-gray-900 mt-2">${item.price}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.cartId)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Subtotal</span>
                <span className="text-lg">${getTotalPrice()}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Shipping</span>
                <span className="text-lg">Free</span>
              </div>
              <div className="border-t pt-4 flex justify-between items-center mb-6">
                <span className="text-2xl font-bold">Total</span>
                <span className="text-2xl font-bold">${getTotalPrice()}</span>
              </div>
              <button
                onClick={() => setCurrentPage('checkout')}
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors text-lg font-semibold"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );

  // Checkout Page
  const CheckoutPage = () => (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <form onSubmit={handleCheckout} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={checkoutData.firstName}
                    onChange={(e) => setCheckoutData({...checkoutData, firstName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={checkoutData.lastName}
                    onChange={(e) => setCheckoutData({...checkoutData, lastName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={checkoutData.email}
                  onChange={(e) => setCheckoutData({...checkoutData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  required
                  value={checkoutData.address}
                  onChange={(e) => setCheckoutData({...checkoutData, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={checkoutData.city}
                    onChange={(e) => setCheckoutData({...checkoutData, city: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input
                    type="text"
                    required
                    value={checkoutData.zipCode}
                    onChange={(e) => setCheckoutData({...checkoutData, zipCode: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  required
                  placeholder="1234 5678 9012 3456"
                  value={checkoutData.cardNumber}
                  onChange={(e) => setCheckoutData({...checkoutData, cardNumber: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    required
                    placeholder="MM/YY"
                    value={checkoutData.expiryDate}
                    onChange={(e) => setCheckoutData({...checkoutData, expiryDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="text"
                    required
                    placeholder="123"
                    value={checkoutData.cvv}
                    onChange={(e) => setCheckoutData({...checkoutData, cvv: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors text-lg font-semibold"
              >
                Place Order
              </button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {cart.map(item => (
                  <div key={item.cartId} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.name}</span>
                    <span className="font-semibold">${item.price}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${getTotalPrice()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${getTotalPrice()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  // Confirmation Page
  const ConfirmationPage = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Order Details</h3>
            <p className="text-sm text-gray-600">Order Number: #{Math.floor(Math.random() * 1000000)}</p>
            <p className="text-sm text-gray-600">Total: ${getTotalPrice()}</p>
            <p className="text-sm text-gray-600">Items: {cart.length}</p>
          </div>
          <button
            onClick={() => {
              setCart([]);
              setCurrentPage('shop');
            }}
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {currentPage === 'shop' && <ShopPage />}
      {currentPage === 'product' && <ProductPage />}
      {currentPage === 'cart' && <CartPage />}
      {currentPage === 'checkout' && <CheckoutPage />}
      {currentPage === 'confirmation' && <ConfirmationPage />}
    </>
  );
};

export default DressShop;
