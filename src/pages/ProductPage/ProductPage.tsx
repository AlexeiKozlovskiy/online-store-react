import './ProductPage.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { QuantityPieces } from '@/components/QuantityPieces/QuantityPieces';
import { formatPrice } from '@/components/helpers/helpers';
import { Product } from '@/components/types/product';
import products from '@/assets/data/products.json';

interface IProductPage {
  clickId: number;
}

export function ProductPage({ clickId }: IProductPage) {
  const [curImage, setCurImage] = useState(0);
  const [isInCart] = useState(false);
  const [{ id, name, price, collection, stock, color, size, category, images }, setProduct] =
    useState<Product>({
      id: 1,
      name: '',
      category: '',
      color: '',
      size: 1,
      collection: 1,
      stock: 1,
      price: 1,
      images: ['', ''],
    });
  const [firstImg, secondImg] = images;

  useEffect(() => {
    const foundProductClick = products.find((el) => el.id === clickId);
    if (foundProductClick) {
      setProduct(foundProductClick);
    }
  }, [clickId]);

  function handelImageClick(numberImage: number) {
    setCurImage(numberImage);
  }

  const inCart = <div className="product-summary__state-in-cart">In cart</div>;

  const addToCart = (
    <button className="button-add-cart button" data-id={id}>
      ADD TO CART
    </button>
  );

  const addMore = (
    <button className="button-add-cart button" data-id={id}>
      ADD MORE
    </button>
  );

  return (
    <main>
      <div className="product-page__bread-crumbs bread-crumbs">
        <div className="bread-crumbs__path">
          <Link to="/" className="bread-crumbs__home-link">
            Home
          </Link>
        </div>
        <div className="bread-crumbs__path">{category}</div>
        <div className="bread-crumbs__path">{name}</div>
      </div>
      <div className="product-page wrapper">
        <Link to="/" className="product-page__arrow-back"></Link>
        <div className="product-page__img-container">
          <div className="img-container__slider">
            <img
              className={`product-page-img-min ${!curImage ? 'active-img' : ''}`}
              src={firstImg}
              alt="product image"
              onClick={() => handelImageClick(0)}
            />
            <img
              className={`product-page-img-min ${curImage ? 'active-img' : ''}`}
              src={secondImg}
              alt="product image"
              onClick={() => handelImageClick(1)}
            />
          </div>
          <img className="product-page__img-main" src={images[curImage]} alt="product image" />
        </div>
        <div className="product-page__summaru-item product-summary">
          <div className="product-summary__description">
            {name} | {color} | {size}cm | ${formatPrice(price)}
          </div>
          {isInCart ? inCart : ''}
        </div>
        <div className="product-page__cart-container">
          <QuantityPieces />
          {isInCart ? addMore : addToCart}
        </div>

        <div className="product-page__specifications-container">
          <div className="specifications__title wrapper">Product specifications</div>
          <div className="specifications__name-content-container wrapper">
            <div className="specifications__name-container">
              <div className="specifications__name-title">Item number</div>
              <div className="specifications__name-title">Color</div>
              <div className="specifications__name-title">Collection</div>
              <div className="specifications__name-title">Price</div>
              <div className="specifications__name-title">Size</div>
              <div className="specifications__name-title">Category</div>
              <div className="specifications__name-title in-stock">In stock</div>
            </div>
            <div className="specifications__content-container">
              <div className="specifications__item specifications-item-number">{id + 500}</div>
              <div className="specifications__item specifications-color">{color}</div>
              <div className="specifications__item specifications-collection">{collection}</div>
              <div className="specifications__item specifications-price">${price}</div>
              <div className="specifications__item specifications-size">{size} cm</div>
              <div className="specifications__item specifications-category">{category}</div>
              <div className="specifications__item specifications-in-stock">{stock}</div>
            </div>
          </div>
          <button className="button-buy-now button" data-id={isInCart}>
            BUY NOW
          </button>
        </div>
      </div>
    </main>
  );
}
