import { Product } from '../../hooks/useFetchProducts';

export interface CartState {
  open: boolean;
  items: Product[];
}

export interface CartActions {
  toggle: () => void;
  add: (product: Product) => void;
  remove: (product: Product | string) => void;
  removeAll: () => void;
  reset: () => void;
}

export interface CartStore {
  state: CartState;
  actions: CartActions;
}

export type SetStateProps = (store: CartStore) => void;
