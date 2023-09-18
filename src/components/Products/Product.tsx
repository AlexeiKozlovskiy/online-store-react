import './Product.scss';
import { Link } from 'react-router-dom';
import { Product } from '@/components/types/types';
import { useMyIdContext } from '@/components/Context/ContextClickID';
import { addProductsToCart, removeProductsFromCartAll } from '@/components/reducers/controller';

type ProductViewData = {
  isInCart: boolean;
  product: Product;
};

export function ProductItem(data: ProductViewData) {
  const {
    product: { id, images, name, price, color, collection, size, category, stock },
    isInCart,
  } = data;

  const { setClickId } = useMyIdContext();

  function productItemHandelClick(id: number) {
    setClickId(id);
  }

  function productItemAddClick(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    const { dataset } = e.target as HTMLElement;
    addProductsToCart(Number(dataset.id));
  }

  function productItemRemoveClick(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    const { dataset } = e.target as HTMLElement;
    removeProductsFromCartAll(Number(dataset.id));
  }

  return (
    <div className="product-item">
      <Link to={`/product/${id}`} onClick={() => productItemHandelClick(id)}>
        <img
          className="product-item__img"
          onClick={() => productItemHandelClick(id)}
          data-id={id}
          src={images[0]}
          alt="product image"
        />
      </Link>
      <div className="product-item__text-wrapper">
        {!isInCart ? (
          <div className="product-item__cart-add" data-id={id} onClick={productItemAddClick}>
            Add to cart
          </div>
        ) : (
          <div className="product-item__cart-added" data-id={id} onClick={productItemRemoveClick}>
            In cart
          </div>
        )}
      </div>
      <div className="product-item__info">
        <div className="item-info__name-price">
          <span className="item-info__name">{name}</span>
          <span className="item-info__price">${price}</span>
        </div>
        <div className="item-info__color">Color: {color}</div>
        <div className="item-info__colection">Colection: {collection}</div>
        <div className="item-info__size">Size: {size} cm</div>
        <div className="item-info__category">Category: {category}</div>
        <div className="item-info__in-stock">In stock: {stock}</div>
      </div>
    </div>
  );
}
