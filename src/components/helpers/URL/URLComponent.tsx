// import { useEffect } from 'react';
// import { updateURLWithFilters } from '@/components/helpers/URL/updateURL';
// import { setFromURL } from '@/components/helpers/URL/setFromURL';
// import { useMyFiltersContext } from '@/components/Context/FiltersContext';
// import { useMySortingsContext } from '@/components/Context/SortingsContext';

// // export const URLComponent = ({ children }: { children: ReactNode }) => {
// export const URLComponent = () => {
//   const { sortindViewOption, setSortindViewOption } = useMySortingsContext();
//   const {
//     selectedColors,
//     selectedCollections,
//     selectedCategory,
//     selectedPrice,
//     selectedSize,
//     selectedStock,
//     inputSearchValue,
//     setSelectedColors,
//     setSelectedCollections,
//     setSelectedCategory,
//     setSelectedPrice,
//     setSelectedSize,
//     setSelectedStock,
//     setInputSearchValue,
//   } = useMyFiltersContext();

//   useEffect(() => {
//     setFromURL({
//       setSelectedColors,
//       setSelectedCollections,
//       setSelectedCategory,
//       setSelectedPrice,
//       setSelectedSize,
//       setSelectedStock,
//       setInputSearchValue,
//       setSortindViewOption,
//     });
//   }, [location.search]);

//   useEffect(() => {
//     updateURLWithFilters({
//       selectedColors,
//       selectedCollections,
//       selectedCategory,
//       selectedPrice,
//       selectedSize,
//       selectedStock,
//       inputSearchValue,
//       sortindViewOption,
//     });
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
