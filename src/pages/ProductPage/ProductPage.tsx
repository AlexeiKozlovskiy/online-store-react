import './ProductPage.scss';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QuantityPiecesProduct } from '@/components/QuantityPieces/QuantityPiecesProduct';
import { formatPrice, formatNameFromURL } from '@/helpers/helpersFunc';
import { RootReducerProps, CartItem, Product } from '@/types/types';
import { addProductsToCart } from '@/reducers/controller';
import { useSelector } from 'react-redux';
import { useAnimations } from '@/components/CustomHook/AnimationsHook';
import { ArrowBack } from '@/components/ArrowBack/ArrowBack';
import { useGetProductQuery, useGetProductsQuery } from '@/api/ProductsAPI';
import { Preloader } from '@/components/Preloader/Preloader';
import { useMyURLContext } from '@/context/URLContext';

export function ProductPage() {
  const [curImage, setCurImage] = useState(0);
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [resetInput, setResetInput] = useState(false);
  const { productNameFromURL } = useMyURLContext();
  const [clickedIDFromURL, setClickedIDFromURL] = useState('');
  const { data: product = {}, isFetching } = useGetProductQuery(clickedIDFromURL);
  const { data: products } = useGetProductsQuery();
  const navigate = useNavigate();
  const cartItems = useSelector<RootReducerProps, CartItem[]>((state) => state.cart);
  const { cartUrl } = useMyURLContext();

  useEffect(() => {
    if (products) {
      const nameFromURL = formatNameFromURL(productNameFromURL);
      const id = products?.find(({ name }) => name === nameFromURL)?.id;
      if (id) {
        setClickedIDFromURL(id);
      } else {
        navigate('*');
      }
    }
  }, [products]);

  const { id, name, price, collection, stock, color, size, category, images } = product as Product;
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

  const qtyChange = (value: string) => {
    setQuantity(value);
  };

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

  return (
    <main>
      {isFetching ? (
        <Preloader />
      ) : (
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
            <div className="product-page__summaru-item product-summary">
              <h3 className="product-summary__description">
                {name} | {color} | {size}cm | ${formatPrice(price)}
              </h3>
              {isInCart ? inCart : ''}
            </div>
            <div className="product-page__cart-container">
              <QuantityPiecesProduct
                clickId={clickedIDFromURL}
                onChangeQuantity={qtyChange}
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
                    <td className="table__info">{id?.slice(-5)}</td>
                  </tr>
                  <tr className="table__row">
                    <td className="table__title">Color</td>
                    <td className="table__info">{color}</td>
                  </tr>
                  <tr className="table__row">
                    <td className="table__title">Collection</td>
                    <td className="table__info">{collection}</td>
                  </tr>
                  <tr className="table__row">
                    <td className="table__title">Price</td>
                    <td className="table__info">${price}</td>
                  </tr>
                  <tr className="table__row">
                    <td className="table__title">Size</td>
                    <td className="table__info">{size}</td>
                  </tr>
                  <tr className="table__row">
                    <td className="table__title">Category</td>
                    <td className="table__info">{category}</td>
                  </tr>
                  <tr className="table__row">
                    <td className="table__title">In stock</td>
                    <td className={`table__info ${isShake && 'shake-product'}`}>{stock}</td>
                  </tr>
                </tbody>
              </table>
              <button
                className="button-buy-now button"
                data-id={isInCart}
                onClick={handelBuyNowBtn}
              >
                BUY NOW
              </button>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
