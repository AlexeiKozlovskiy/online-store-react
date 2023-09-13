import './ProductsList.scss';
import { ProductItem } from './Product';
import products from '@/assets/data/products.json';

interface IProductsList {
  swichedView: string;
}

export function ProductsList({ swichedView }: IProductsList) {
  return (
    <div className={`main-catalog__products ${swichedView === 'line' ? 'row-view' : ''}`}>
      {products.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </div>
  );
}
