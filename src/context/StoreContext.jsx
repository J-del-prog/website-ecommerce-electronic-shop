import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, VALID_COUPONS } from '../data/products';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  // Navigation / Page state
  const [activePage, setActivePage] = useState('home');
  const [pageParams, setPageParams] = useState({});

  // Admin auth state
  const [isAdminAuthenticated, setAdminAuthenticated] = useState(() => {
    return localStorage.getItem('jp_admin_auth') === 'true';
  });

  // Products state (persisted to LocalStorage so Admin actions persist)
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('jp_store_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('jp_store_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state (array of product IDs)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('jp_store_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders state (persisted)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('jp_store_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Cart drawer visibility
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Applied Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Toast notification state
  const [toast, setToast] = useState(null);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('jp_store_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('jp_store_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);

  useEffect(() => {
    if (isAdminAuthenticated) {
      localStorage.setItem('jp_admin_auth', 'true');
    } else {
      localStorage.removeItem('jp_admin_auth');
    }
  }, [isAdminAuthenticated]);

  useEffect(() => {
    try {
      localStorage.setItem('jp_store_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('jp_store_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders', e);
    }
  }, [orders]);

  // Toast helper
  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 3500);
  };

  // Navigation helper
  const navigate = (page, params = {}) => {
    setActivePage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Actions
  const addToCart = (product, quantity = 1) => {
    if (product.stock <= 0) {
      showToast('Maaf, stok produk ini sedang habis!', 'error');
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stock);
        showToast(`Jumlah "${product.name.slice(0, 24)}..." diperbarui (${newQty})`);
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: newQty } : item
        );
      } else {
        showToast(`"${product.name.slice(0, 24)}..." ditambahkan ke keranjang!`);
        return [...prev, { ...product, quantity: Math.min(quantity, product.stock) }];
      }
    });
  };

  const updateCartQuantity = (productId, delta) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            const targetProd = products.find(p => p.id === productId);
            const maxStock = targetProd ? targetProd.stock : 99;
            if (newQty <= 0) return null;
            return { ...item, quantity: Math.min(newQty, maxStock) };
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    showToast('Produk dihapus dari keranjang', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Actions
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Dihapus dari wishlist Anda', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Ditambahkan ke daftar keinginan favorit!', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Coupon helper
  const applyCouponCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (VALID_COUPONS[cleanCode]) {
      setAppliedCoupon({ code: cleanCode, ...VALID_COUPONS[cleanCode] });
      showToast(`Kupon ${cleanCode} berhasil digunakan!`, 'success');
      return { success: true };
    } else {
      showToast('Kode kupon tidak valid atau kadaluarsa', 'error');
      return { success: false, message: 'Kode kupon tidak valid' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Kupon dihapus', 'info');
  };

  // Price calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      const calculated = (cartSubtotal * appliedCoupon.discountPercent) / 100;
      discountAmount = appliedCoupon.maxDiscount ? Math.min(calculated, appliedCoupon.maxDiscount) : calculated;
    } else if (appliedCoupon.discountFixed) {
      discountAmount = appliedCoupon.discountFixed;
    }
  }

  // Create new Order (Checkout Gateway)
  const placeOrder = ({ customerDetails, shippingMethod, paymentMethod }) => {
    const newOrderId = `JP-${Math.floor(10000 + Math.random() * 90000)}`;
    const shippingFee = shippingMethod.price || 0;
    const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

    const now = new Date();
    const dateFormatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newOrder = {
      id: newOrderId,
      customerName: customerDetails.fullName,
      email: customerDetails.email,
      phone: customerDetails.phone,
      address: `${customerDetails.address}, ${customerDetails.city}, ${customerDetails.postalCode}`,
      notes: customerDetails.notes || '-',
      items: cart.map(i => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        image: i.image
      })),
      subtotal: cartSubtotal,
      discount: discountAmount,
      shippingFee,
      courier: shippingMethod.name,
      paymentMethod,
      totalAmount: finalTotal,
      status: paymentMethod === 'QRIS' || paymentMethod.includes('Virtual') ? 'Menunggu Pembayaran' : 'Diproses',
      trackingNumber: `JPEXP-${Math.floor(100000 + Math.random() * 900000)}-${shippingMethod.code || 'EXP'}`,
      date: dateFormatted,
      history: [
        { time: dateFormatted, status: `Pesanan dibuat via metode ${paymentMethod}` }
      ]
    };

    // Deduct stock in products
    setProducts(prev => {
      return prev.map(p => {
        const orderedItem = cart.find(c => c.id === p.id);
        if (orderedItem) {
          return { ...p, stock: Math.max(0, p.stock - orderedItem.quantity) };
        }
        return p;
      });
    });

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);

    return newOrder;
  };

  // Admin Order & Product Management
  const updateOrderStatus = (orderId, newStatus) => {
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status: newStatus,
            history: [
              ...ord.history,
              { time: timeStr, status: `Status diperbarui menjadi: ${newStatus}` }
            ]
          };
        }
        return ord;
      })
    );
    showToast(`Status pesanan ${orderId} diubah menjadi "${newStatus}"`);
  };

  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: `jp-prod-${Date.now()}`,
      reviewsCount: 0,
      rating: 5.0,
      gallery: [newProduct.image]
    };
    setProducts(prev => [productWithId, ...prev]);
    showToast('Produk baru berhasil ditambahkan ke katalog!', 'success');
  };

  const updateProduct = (updatedProduct) => {
    setProducts(prev =>
      prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    showToast('Data produk berhasil diperbarui!', 'success');
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast('Produk berhasil dihapus dari katalog', 'info');
  };

  const resetToDefaultData = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    localStorage.removeItem('jp_store_products');
    localStorage.removeItem('jp_store_orders');
    showToast('Data toko telah di-reset ke katalog demo asli', 'info');
  };

  // Currency Formatter
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(number);
  };

  const value = {
    activePage,
    pageParams,
    navigate,
    products,
    cart,
    cartCount,
    cartSubtotal,
    discountAmount,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    wishlist,
    toggleWishlist,
    isInWishlist,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    orders,
    placeOrder,
    updateOrderStatus,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToDefaultData,
    toast,
    showToast,
    formatRupiah,
    isAdminAuthenticated,
    setAdminAuthenticated
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
