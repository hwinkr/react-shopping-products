export const initialCartItems = {
  content: [
    {
      id: 5237,
      quantity: 1,
      product: {
        id: 3,
        name: '아디다스',
        price: 2000,
        imageUrl: 'https://sitem.ssgcdn.com/74/25/04/item/1000373042574_i1_750.jpg',
        category: 'fashion',
      },
    },
    {
      id: 6712,
      quantity: 1,
      product: {
        id: 108,
        name: '소설책',
        price: 5000,
        imageUrl:
          'https://plus.unsplash.com/premium_photo-1681825268400-c561bd47d586?q=80&w=3544&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'books',
      },
    },
  ],
  pageable: {
    sort: {
      sorted: false,
      unsorted: true,
      empty: true,
    },
    pageNumber: 0,
    pageSize: 20,
    offset: 0,
    paged: true,
    unpaged: false,
  },
  last: true,
  totalPages: 1,
  totalElements: 2,
  sort: {
    sorted: false,
    unsorted: true,
    empty: true,
  },
  first: true,
  number: 0,
  numberOfElements: 2,
  size: 20,
  empty: false,
};

export const newCartItem = [
  {
    id: 6713,
    quantity: 1,
    product: {
      id: 2,
      name: '나이키',
      price: 1000,
      imageUrl:
        'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png',
      category: 'fashion',
    },
  },
  {
    id: 6714,
    quantity: 1,
    product: {
      id: 4,
      name: '해리',
      price: 1000,
      imageUrl:
        'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png',
      category: 'fashion',
    },
  },
  {
    id: 6715,
    quantity: 1,
    product: {
      id: 5,
      name: '아르',
      price: 1000,
      imageUrl:
        'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png',
      category: 'fashion',
    },
  },
];
