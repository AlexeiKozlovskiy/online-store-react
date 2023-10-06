// import { useEffect } from 'react';
// import { useMyFiltersContext } from '@/components/Context/FiltersContext';
// import { useMySortingsContext } from '@/components/Context/SortingsContext';
// import { SORT_OPTIONS } from '@/components/helpers/constant';

// // export const URLComponent = ({ children }: { children: ReactNode }) => {
// export const URLset = () => {
//   const { setSortindViewOption } = useMySortingsContext();
//   const {
//     setSelectedColors,
//     setSelectedCollections,
//     setSelectedCategory,
//     setSelectedPrice,
//     setSelectedSize,
//     setSelectedStock,
//     setInputSearchValue,
//   } = useMyFiltersContext();

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const [colors] = queryParams.getAll('colors');
//     const [collections] = queryParams.getAll('collections');
//     const [categories] = queryParams.getAll('categories');
//     const valMinPrice = queryParams.getAll('minPrice');
//     const valMaxPrice = queryParams.getAll('maxPrice');
//     const valMinSize = queryParams.getAll('minSize');
//     const valMaxSize = queryParams.getAll('maxSize');
//     const valMinStock = queryParams.getAll('minStock');
//     const valMaxStock = queryParams.getAll('maxStock');
//     const [search] = queryParams.getAll('q');
//     const [viewOption] = queryParams.getAll('sortBy');

//     if (colors) {
//       setSelectedColors(colors?.split(','));
//     }
//     if (collections) {
//       setSelectedCollections(collections?.split(',').map(Number));
//     }
//     if (categories) {
//       setSelectedCategory(categories?.split(','));
//     }
//     if (valMinPrice.length || valMaxPrice.length) {
//       setSelectedPrice([+valMinPrice, +valMaxPrice]);
//     }
//     if (valMinSize.length || valMaxSize.length) {
//       setSelectedSize([+valMinSize, +valMaxSize]);
//     }
//     if (valMinStock.length || valMaxStock.length) {
//       setSelectedStock([+valMinStock, +valMaxStock]);
//     }
//     if (search) {
//       setInputSearchValue(search);
//     }
//     if (viewOption) {
//       setSortindViewOption({
//         value: viewOption,
//         label: SORT_OPTIONS.filter(({ value, label }) => {
//           if (value === viewOption) {
//             return label;
//           }
//         })[0].label,
//       });
//     }
//   }, [location.search]);

//   // return <>{children}</>;
//   return <></>;
// };
