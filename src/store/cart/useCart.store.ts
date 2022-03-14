import create from 'zustand';
import { CartState, CartStore, SetStateProps } from './useCart.types';
import { produce } from 'immer';

const initialState: CartState = {
  items: [],
  open: false,
};

export const useCartStore = create<CartStore>((set, get) => {
  const setState = (fn: SetStateProps) => set(produce(fn));
  const exists = (id: string) =>
    get().state.items.some((product) => product.id === id);

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
        if (exists(product.id)) {
          return;
        }

        setState(({ state }: CartStore) => {
          state.items = [...state.items, product];
          state.open = true;
        });
      },
      remove(productOrId) {
        const productId =
          typeof productOrId === 'string' ? productOrId : productOrId.id;

        if (!exists(productId)) {
          return;
        }

        setState(({ state }: CartStore) => {
          state.items = state.items.filter(
            (product) => product.id !== productId,
          );
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
