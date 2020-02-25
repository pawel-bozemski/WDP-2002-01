/* selectors */
export const getAll = ({ products }) => products;
export const getCount = ({ products }) => products.length;

export const getNew = ({ products }) =>
  products.filter(item => item.newFurniture === true);

export const getPromoted = ({ products }) =>
  products.filter(item => item.promoted === true);
/* action name creator */
const reducerName = 'products';

const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const UPDATE_OPINION = createActionName('UPDATE_OPINION');
export const MARK_FAVOURITE = createActionName('MARK_FAVOURITE');

/* action creators */
export const updateOpinion = payload => ({
  payload,
  type: UPDATE_OPINION,
});
export const markFavourite = payload => ({
  payload,
  type: MARK_FAVOURITE,
});

/* reducer */
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case UPDATE_OPINION: {
      return action.payload;
    }
    case MARK_FAVOURITE:
      return statePart.map(product => {
        if (product.id === action.payload.id) {
          return { ...product, favourite: !product.favourite };
        } else {
          return product;
        }
      });
    default:
      return statePart;
  }
}
