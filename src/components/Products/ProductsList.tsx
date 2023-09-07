import { ProductItem } from './Product';
import './ProductsList.scss';
import products from '../../assets/data/products.json';

export function ProductsList() {
  return (
    <div className="main-catalog__products">
      {products.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </div>
  );
}
