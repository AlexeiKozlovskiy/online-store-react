import './ProductsList.scss';
import { ProductItem } from './Product';
import { useSelector } from 'react-redux';
import { CartItemReducerProps, CartItem, Product } from '@/components/types/types';

interface IProductsList {
  swichedView: string;
  products: Product[];
}

export function ProductsList({ swichedView, products }: IProductsList) {
  const cartItems = useSelector(
    (state: CartItemReducerProps) => state.cart
  ) as unknown as CartItem[];

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
