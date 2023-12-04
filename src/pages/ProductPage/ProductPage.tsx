import './ProductPage.scss';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QuantityPiecesProduct } from '@/components/QuantityPieces/QuantityPiecesProduct';
import { formatPrice } from '@/helpers/helpersFunc';
import { RootReducerProps, CartItem, ChooseProduct } from '@/types/types';
import { addProductsToCart } from '@/reducers/controller';
import { useSelector } from 'react-redux';
import { useAnimations } from '@/components/CustomHook/AnimationsHook';
import { ArrowBack } from '@/components/ArrowBack/ArrowBack';
import { useGetProductQuery, useGetProductsQuery } from '@/api/ProductsAPI';
import { Preloader } from '@/components/Preloader/Preloader';
import { useMyURLContext } from '@/context/URLContext';
import { Client, Server } from 'react-hydration-provider';

interface ProductPage {
  idProduct: string;
}

export function ProductPage() {
  const [curImage, setCurImage] = useState(0);
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState('1');
  const [resetInput, setResetInput] = useState(false);
  const chooseProduct = useSelector<RootReducerProps, ChooseProduct>(
    (state) => state.chooseProduct
  );
  const {
    data: product = {
      id: '',
      name: '',
      price: 0,
      collection: 0,
      stock: 0,
      color: '',
      size: 0,
      category: '',
      images: [],
    },
    isFetching,
  } = useGetProductQuery(chooseProduct.id);
  const { data: products } = useGetProductsQuery();
  const navigate = useNavigate();
  const cartItems = useSelector<RootReducerProps, CartItem[]>((state) => state.cart);
  const { cartUrl } = useMyURLContext();

  const { id, name, price, collection, stock, color, size, category, images } = product;
  const [firstImg, secondImg] = images || [];
  const isShake = useAnimations({ quantity: Number(quantity), stock });

  useEffect(() => {
    const foundProductInCart = cartItems.map(({ product }) => product.id).includes(id);
    setIsInCart(foundProductInCart);
  }, [id, cartItems]);

  useEffect(() => setResetInput(false), [cartItems]);

  function handelImageClick(numberImage: number) {
    setCurImage(numberImage);
  }

  function handelAddClick() {
    addProductsToCart(id, products!, Number(quantity));
    setResetInput(true);
  }

  function handelBuyNowBtn() {
    addProductsToCart(id, products!, Number(quantity));
    setResetInput(true);
    navigate(cartUrl);
  }

  const inCart = <div className="product-summary__state-in-cart">In cart</div>;

  const addToCart = (
    <button className="button-add-cart button" onClick={handelAddClick} data-id={id}>
      ADD TO CART
    </button>
  );

  const addMore = (
    <button className="button-add-cart button" onClick={handelAddClick} data-id={id}>
      ADD MORE
    </button>
  );

  const productPage = (
    <>
      <div className="product-page__bread-crumbs bread-crumbs">
        <div className="bread-crumbs__path">
          <Link to="/" className="bread-crumbs__home-link">
            Home
          </Link>
        </div>
        <div className="bread-crumbs__path">{category}</div>
        <div className="bread-crumbs__path">{name}</div>
      </div>
      <section className="product-page wrapper">
        <ArrowBack />
        <Client>
          {!isFetching && (
            <div className="product-page__img-container">
              <div className="img-container__slider">
                <img
                  className={`product-page-img-min ${!curImage && 'active-img'}`}
                  src={firstImg}
                  alt="product image"
                  onClick={() => handelImageClick(0)}
                />
                <img
                  className={`product-page-img-min ${curImage && 'active-img'}`}
                  src={secondImg}
                  alt="product image"
                  onClick={() => handelImageClick(1)}
                />
              </div>
              <img
                className="product-page__img-main"
                src={images && images[curImage]}
                alt="product image"
              />
            </div>
          )}
        </Client>
        <Server>{<Preloader />}</Server>
        <Client>
          {!isFetching && (
            <div className="product-page__summaru-item product-summary">
              <h3 className="product-summary__description">
                {name} | {color} | {size}cm | ${formatPrice(price)}
              </h3>
              {isInCart && inCart}
            </div>
          )}
        </Client>
        <div className="product-page__cart-container">
          <QuantityPiecesProduct
            stock={stock}
            onChangeQuantity={(value) => setQuantity(value)}
            onResetInput={resetInput}
          />
          {isInCart ? addMore : addToCart}
        </div>
        <div className="product-page__specifications-container">
          <h4 className="product-page__specifications-title">Product specifications</h4>
          <table className="product-page__table">
            <tbody>
              <tr className="table__row">
                <td className="table__title">Item number</td>
                <Client>
                  <td className="table__info">{id?.slice(-5)}</td>
                </Client>
              </tr>
              <tr className="table__row">
                <td className="table__title">Color</td>
                <Client>
                  <td className="table__info">{color}</td>
                </Client>
              </tr>
              <tr className="table__row">
                <td className="table__title">Collection</td>
                <Client>{!isFetching && <td className="table__info">{collection}</td>}</Client>
              </tr>
              <tr className="table__row">
                <td className="table__title">Price</td>
                <Client>{!isFetching && <td className="table__info">${price}</td>}</Client>
              </tr>
              <tr className="table__row">
                <td className="table__title">Size</td>
                <Client>{!isFetching && <td className="table__info">{size}</td>}</Client>
              </tr>
              <tr className="table__row">
                <td className="table__title">Category</td>
                <Client>
                  <td className="table__info">{category}</td>
                </Client>
              </tr>
              <tr className="table__row">
                <td className="table__title">In stock</td>
                <Client>
                  {!isFetching && (
                    <td className={`table__info ${isShake && 'shake-product'}`}>{stock}</td>
                  )}
                </Client>
              </tr>
            </tbody>
          </table>
          <button className="button-buy-now button" data-id={isInCart} onClick={handelBuyNowBtn}>
            BUY NOW
          </button>
        </div>
      </section>
    </>
  );

  return <main>{productPage}</main>;
}
