import './ProductsList.scss';
import { ProductItem } from './Product';
import products from '@/assets/data/products.json';
import { useSelector } from 'react-redux';
import { CartItemReducerProps, CartItem } from '@/components/types/types';

interface IProductsList {
  swichedView: string;
}

export function ProductsList({ swichedView }: IProductsList) {
  const cartItems = useSelector((state: CartItemReducerProps) => state.cart) as unknown as CartItem[];

  return (
    <div className={`main-catalog__products ${swichedView === 'line' ? 'row-view' : ''}`}>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          isInCart={cartItems.some(({ product: inCartProduct }) => {
            return inCartProduct.id === product.id;
          })}
        />
      ))}
    </div>
  );
}
