import React, { createContext, useContext, useState, useEffect } from 'react';
import { CoffeeItem } from '../data/coffeeData';

export interface CartItem {
  coffee: CoffeeItem;
  quantity: number;
  temperature?: 'Iced' | 'Hot';
  milkChoice?: 'Oat Milk' | 'Whole Milk' | 'Almond Milk';
}

interface CartContextType {
  items: CartItem[];
  addItem: (coffee: CoffeeItem, options?: { temperature?: 'Iced' | 'Hot'; milkChoice?: 'Oat Milk' | 'Whole Milk' | 'Almond Milk' }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  freeStickerProgress: number; // threshold $20
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Initial sample items for great immediate preview experience
    return [
      {
        coffee: {
          id: 'iced-latte',
          name: 'Brew Crew Iced Latte',
          category: 'iced',
          description: 'Double ristretto shots poured over silky iced oat milk with Madagascar vanilla bean.',
          price: 5.75,
          badge: 'Bestseller',
          image: '/src/assets/images/hero_iced_latte_1790978074698.jpg',
          roastLevel: 'Medium',
          notes: ['Vanilla Bean', 'Toasted Oat', 'Honey Swirl'],
          volume: '16 oz',
        },
        quantity: 1,
        temperature: 'Iced',
        milkChoice: 'Oat Milk',
      },
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = (coffee: CoffeeItem, options?: { temperature?: 'Iced' | 'Hot'; milkChoice?: 'Oat Milk' | 'Whole Milk' | 'Almond Milk' }) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.coffee.id === coffee.id);
      if (existing) {
        return prev.map((item) =>
          item.coffee.id === coffee.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          coffee,
          quantity: 1,
          temperature: options?.temperature || (coffee.category === 'iced' || coffee.category === 'bottled' ? 'Iced' : 'Hot'),
          milkChoice: options?.milkChoice || 'Oat Milk',
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.coffee.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.coffee.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.coffee.price * item.quantity, 0);
  const freeStickerThreshold = 20;
  const freeStickerProgress = Math.min(100, Math.round((subtotal / freeStickerThreshold) * 100));

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        freeStickerProgress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
