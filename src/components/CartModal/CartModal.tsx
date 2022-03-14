import { Modal } from 'react-native';

import { useCartStore } from '../../store/cart';
import { Cart } from '../Cart/Cart';

export const CartModal = () => {
  const open = useCartStore((store) => store.state.open);
  const toggle = useCartStore((store) => store.actions.toggle);

  return (
    <Modal
      testID="cart-modal"
      animationType="slide"
      presentationStyle="pageSheet"
      visible={open}
      onRequestClose={() => toggle()}>
      <Cart />
    </Modal>
  );
};
