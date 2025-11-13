
import React, { useState, useRef } from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product, imageElement: HTMLImageElement) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewProduct, onAddToCart }) => {
  const [isAdded, setIsAdded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (imageRef.current) {
      onAddToCart(product, imageRef.current);
    }
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div className="group relative border border-gray-800 rounded-lg overflow-hidden bg-black transition-all duration-500 hover:border-brand-gold hover:shadow-gold-glow hover:scale-[1.03]">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
        <img
          ref={imageRef}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4 absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end">
        <h3 className="text-lg font-semibold text-white">
          <a href="#" onClick={(e) => { e.preventDefault(); onViewProduct(product); }} className="focus:outline-none">
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </a>
        </h3>
        <p className="text-sm text-gray-400">{product.brand}</p>
        <div className="flex justify-between items-center mt-2">
            <p className="text-xl font-bold text-brand-gold">R$ {product.price.toFixed(2).replace('.', ',')}</p>
             <div className="flex items-center space-x-2">
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onViewProduct(product);
                    }}
                    className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 border border-brand-gold text-brand-gold px-3 py-1 rounded-md text-sm font-semibold hover:bg-brand-gold hover:text-black focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-black active:scale-95"
                >
                    Detalhes
                </button>
                <button 
                    onClick={handleAddToCartClick}
                    disabled={isAdded}
                    className={`opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 px-3 py-1 rounded-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black
                      ${isAdded 
                        ? 'bg-green-600 text-white cursor-not-allowed' 
                        : 'bg-brand-gold text-black hover:bg-yellow-400 focus:ring-brand-gold active:scale-95'
                      }`}
                >
                    {isAdded ? 'Adicionado ✓' : 'Adicionar'}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
