const pageRoutes = {
  Home: '/',
  MyBusiness: '/my-business',
  Wishlist: '/wishlist',
  Cart: '/cart',
  AddBusiness: '/add-business',
  Orders: '/orders',
  BusinessProfile: '/business-profile',
};

export function createPageUrl(pageName) {
  return pageRoutes[pageName] || '/';
}
