# online-store-react

## Deploy
[Online-store](https://online-store-react-94.netlify.app/).

## Features for customers
- Product Catalog: Browse through a diverse range of products neatly organized into categories.
- User Authentication: Secure sign-up and login functionalities for customers.
- Shopping Cart: Add desired items to the cart for a convenient shopping experience.
- Checkout Process: Seamless checkout with payment options for smooth transactions.

## Developer features
- Using [own backend service](https://github.com/AlexeiKozlovskiy/online-store-nest) built on Nest, with using prisma database.
- Standard and google authentication, using bearer token, with opportunity his refreshing. 
- Forms introduced in all modal windows and profile page, made using react-hook-form, with possibility common validation all fields. 
- Cart products, and auth state build with Redux Toolkit.
- Fetching products, and product by ID developed using RTK Query. Fetching all app data using axios, in future I keep in mind add React Qwery.
- SSR mode, for now work only **locally**. In Netlifae deploy available CSR mode.
- Using other small libraries, such as: paginate, select, slider, skeleton, persist.

## Common stack
- TS
- React
- Nest
- Prisma
- Vite
- React Router
- Reduxjs Toolkit
- RTK Query
- Axios
- React Hook Form
- React Loading Skeleton
- React Pagination
- React Select
- React Slider

## Installation
To run this project locally, follow these steps:

- Clone this repository.
- Install dependencies using `npm install`.
- Rename .env.example.
- Run the development server with SSR mode `npm run start`.


