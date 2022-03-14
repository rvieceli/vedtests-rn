import create from 'zustand';
import { CartItem, CartState, CartStore, SetStateProps } from './useCart.types';
import { produce } from 'immer';
import { Product } from '../../hooks/useFetchProducts';

const initialState: CartState = {
  items: [],
  open: false,
};

export const createCartItem = (product: Product, quantity = 1): CartItem => ({
  id: product.id,
  product,
  quantity,
});

export const useCartStore = create<CartStore>((set, get) => {
  const setState = (fn: SetStateProps) => set(produce(fn));
  const exists = (productOrId: Product | string) => {
    const productId =
      typeof productOrId === 'string' ? productOrId : productOrId.id;
    return get().state.items.find((product) => product.id === productId);
  };

  return {
    state: {
      ...initialState,
    },
    actions: {
      toggle() {
        setState(({ state }) => {
          state.open = !state.open;
        });
      },
      add(product) {
        if (exists(product)) {
          return;
        }

        const cartItem = createCartItem(product);

        setState(({ state }: CartStore) => {
          state.items = [...state.items, cartItem];
          state.open = true;
        });
      },
      increase(productOrId) {
        const product = exists(productOrId);

        if (!product) {
          return;
        }

        setState(({ state }: CartStore) => {
          state.items = state.items.map(({ quantity, ...cartItem }) => ({
            ...cartItem,
            quantity: cartItem.id === product.id ? quantity + 1 : quantity,
          }));
        });
      },
      decrease(productOrId) {
        const product = exists(productOrId);

        if (!product) {
          return;
        }

        if (product.quantity <= 0) {
          return;
        }

        setState(({ state }: CartStore) => {
          state.items = state.items.map(({ quantity, ...cartItem }) => ({
            ...cartItem,
            quantity: cartItem.id === product.id ? quantity - 1 : quantity,
          }));
        });
      },
      remove(productOrId) {
        const product = exists(productOrId);

        if (!product) {
          return;
        }

        setState(({ state }: CartStore) => {
          state.items = state.items.filter(({ id }) => id !== product.id);
        });
      },
      removeAll() {
        setState(({ state }: CartStore) => {
          state.items = [];
        });
      },
      reset() {
        setState((store) => {
          store.state = initialState;
        });
      },
    },
  };
});
