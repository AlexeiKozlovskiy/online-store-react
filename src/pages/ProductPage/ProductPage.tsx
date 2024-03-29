import './ProductPage.scss';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QuantityPiecesProduct } from '@/components/QuantityPieces/QuantityPiecesProduct';
import { formatPrice } from '@/helpers/helpersFunc';
import { RootReducerProps, CartItem, ChosenProduct, ROUTE } from '@/types/types';
import { addProductToCart } from '@/store/controller';
import { useSelector } from 'react-redux';
import { useAnimations } from '@/hooks/AnimationsHook';
import { ArrowBack } from '@/components/ArrowBack/ArrowBack';
import { useGetProductQuery, useGetProductsQuery } from '@/api/ProductsAPI';
import { useMyURLContext } from '@/context/URLContext';
import { NameSkeleton } from '@/components/Skeleton/ProductPage/NameSkeleton';
import { ImgsSkeleton } from '@/components/Skeleton/ProductPage/ImgsSkeleton';
import { SpecSkeleton } from '@/components/Skeleton/ProductPage/SpecSkeleton';
import { BreadCrumbSkeleton } from '@/components/Skeleton/ProductPage/BreadCrumbSkeleton';
import { FavoritesStar } from '@/components/FavoritesStar/FavoritesStar';

export function ProductPage() {
  const [curImage, setCurImage] = useState(0);
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState('1');
  const [resetInput, setResetInput] = useState(false);
  const chosenProduct = useSelector<RootReducerProps, ChosenProduct>(
    (state) => state.chosenProduct
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
  } = useGetProductQuery(chosenProduct.id!);
  const { data: products } = useGetProductsQuery('');
  const navigate = useNavigate();
  const cartItems = useSelector<RootReducerProps, CartItem[]>((state) => state.cart);
  const { cartUrl } = useMyURLContext();

  const { id, name, price, collection, stock, color, size, category, images } = product;
  const [firstImg, secondImg] = images;
  const isShake = useAnimations({ quantity: Number(quantity), stock });

  useEffect(() => {
    const foundProductInCart =
      Array.isArray(cartItems) && cartItems.map(({ product }) => product.id).includes(id);
    setIsInCart(foundProductInCart);
  }, [id, cartItems]);

  useEffect(() => setResetInput(false), [cartItems]);

  function handelImageClick(numberImage: number) {
    setCurImage(numberImage);
  }

  function handelAddClick() {
    addProductToCart(id, products!, Number(quantity));
    setResetInput(true);
  }

  function handelBuyNowBtn() {
    addProductToCart(id, products!, Number(quantity));
    setResetInput(true);
    navigate(cartUrl);
  }

  const inCart = <div className="product-summary__state-in-cart">In cart</div>;

  const addToCart = (
    <button
      className="button-add-cart button"
      onClick={handelAddClick}
      data-id={id}
      data-testid="button-add-cart"
    >
      ADD TO CART
    </button>
  );

  const addMore = (
    <button className="button-add-cart button" onClick={handelAddClick} data-id={id}>
      ADD MORE
    </button>
  );

  const pageImages = (
    <div className="product-page__img-container">
      <FavoritesStar id={id} add_style={'productPage-add'} added_style={'productPage-added'} />
      <div className="img-container__slider">
        <img
          className={`product-page-img-min ${!curImage && 'active-img'}`}
          src={firstImg}
          alt="product-image-one"
          onClick={() => handelImageClick(0)}
        />
        <img
          className={`product-page-img-min ${curImage && 'active-img'}`}
          src={secondImg}
          alt="product-image-two"
          onClick={() => handelImageClick(1)}
        />
      </div>
      <img
        className="product-page__img-main"
        src={images && images[curImage]}
        alt="product-image-main"
      />
    </div>
  );

  const productName = (
    <>
      <h3 className="product-summary__description" data-testid="product-description">
        {name} | {color} | {size}cm | ${formatPrice(price)}
      </h3>
    </>
  );

  const breadCrumbs = (
    <div className="product-page__bread-crumbs bread-crumbs">
      {isFetching ? (
        <BreadCrumbSkeleton />
      ) : (
        <>
          <div className="bread-crumbs__path">
            <Link to={ROUTE.MAIN} className="bread-crumbs__home-link">
              Home
            </Link>
          </div>
          <div className="bread-crumbs__path">{category}</div>
          <div className="bread-crumbs__path">{name}</div>
        </>
      )}
    </div>
  );

  return (
    <main>
      {breadCrumbs}
      <section className="product-page wrapper">
        <ArrowBack />
        {isFetching ? <ImgsSkeleton /> : pageImages}
        <div className="product-page__summaru-item product-summary">
          {isFetching ? <NameSkeleton /> : productName}
          {isInCart && inCart}
        </div>

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
                <td className="table__info">
                  {isFetching ? <SpecSkeleton width={80} /> : id?.slice(-5)}
                </td>
              </tr>
              <tr className="table__row">
                <td className="table__title">Color</td>
                <td className="table__info">{isFetching ? <SpecSkeleton width={60} /> : color}</td>
              </tr>
              <tr className="table__row">
                <td className="table__title">Collection</td>
                <td className="table__info">
                  {isFetching ? <SpecSkeleton width={100} /> : collection}
                </td>
              </tr>
              <tr className="table__row">
                <td className="table__title">Price</td>
                <td className="table__info">{isFetching ? <SpecSkeleton width={100} /> : price}</td>
              </tr>
              <tr className="table__row">
                <td className="table__title">Size</td>
                <td className="table__info">{isFetching ? <SpecSkeleton width={40} /> : size}</td>
              </tr>
              <tr className="table__row">
                <td className="table__title">Category</td>
                <td className="table__info">
                  {isFetching ? <SpecSkeleton width={160} /> : category}
                </td>
              </tr>
              <tr className="table__row">
                <td className="table__title">In stock</td>
                <td
                  className={`table__info ${isShake && 'shake-product'}`}
                  data-testid="shake-product"
                >
                  {isFetching ? <SpecSkeleton width={40} /> : stock}
                </td>
              </tr>
            </tbody>
          </table>
          <button
            className="button-buy-now button"
            data-id={isInCart}
            data-testid="button-buy-now"
            onClick={handelBuyNowBtn}
          >
            BUY NOW
          </button>
        </div>
      </section>
    </main>
  );
}
