// import { useEffect } from 'react';
// import { useMyFiltersContext } from '@/components/Context/FiltersContext';
// import { useMySortingsContext } from '@/components/Context/SortingsContext';
// import {
//   PRICE_MIN,
//   PRICE_MAX,
//   SIZE_MIN,
//   SIZE_MAX,
//   STOCK_MIN,
//   STOCK_MAX,
// } from '@/components/helpers/constant';

// // export const URLComponent = ({ children }: { children: ReactNode }) => {
// export const URLUpdate = () => {
//   const { sortindViewOption } = useMySortingsContext();
//   const {
//     selectedColors,
//     selectedCollections,
//     selectedCategory,
//     selectedPrice,
//     selectedSize,
//     selectedStock,
//     inputSearchValue,
//   } = useMyFiltersContext();

//   useEffect(() => {
//     const params = new URLSearchParams();

//     const [minPrice, maxPrice] = selectedPrice;
//     const [minSize, maxSize] = selectedSize;
//     const [minStock, maxStock] = selectedStock;

//     if (selectedColors.length) {
//       params.set('colors', selectedColors.join(','));
//     }
//     if (selectedCollections.length) {
//       params.set('collections', selectedCollections.join(','));
//     }
//     if (selectedCategory.length) {
//       params.set('categories', selectedCategory.join(','));
//     }
//     if (minPrice !== PRICE_MIN || maxPrice !== PRICE_MAX) {
//       if (minPrice && maxPrice) {
//         params.set('minPrice', minPrice!.toString());
//         params.set('maxPrice', maxPrice!.toString());
//       }
//     }
//     if (minSize !== SIZE_MIN || maxSize !== SIZE_MAX) {
//       if (minSize && maxSize) {
//         params.set('minSize', minSize!.toString());
//         params.set('maxSize', maxSize!.toString());
//       }
//     }
//     if (minStock !== STOCK_MIN || maxStock !== STOCK_MAX) {
//       if (minStock && maxStock) {
//         params.set('minStock', minStock!.toString());
//         params.set('maxStock', maxStock!.toString());
//       }
//     }
//     if (inputSearchValue) {
//       params.set('q', inputSearchValue);
//     }
//     if (sortindViewOption.value.length) {
//       params.set('sortBy', sortindViewOption.value);
//     }
//     const newURL = `${location.pathname}?${params.toString()}`;
//     window.history.replaceState(null, '', newURL);
//   }, [
//     selectedColors,
//     selectedCollections,
//     selectedCategory,
//     selectedPrice,
//     selectedSize,
//     selectedStock,
//     inputSearchValue,
//     sortindViewOption.value,
//   ]);
//   // return <>{children}</>;
//   return <></>;
// };
