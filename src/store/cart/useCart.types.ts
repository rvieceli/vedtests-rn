import { Product } from '../../hooks/useFetchProducts';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}
export interface CartState {
  open: boolean;
  items: CartItem[];
}

export interface CartActions {
  toggle: () => void;
  add: (product: Product) => void;
  increase: (product: Product | string) => void;
  decrease: (product: Product | string) => void;
  remove: (product: Product | string) => void;
  removeAll: () => void;
  reset: () => void;
}

export interface CartStore {
  state: CartState;
  actions: CartActions;
}

export type SetStateProps = (store: CartStore) => void;
