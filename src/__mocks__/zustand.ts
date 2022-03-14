import { act } from '@testing-library/react-hooks';
import actualCreate from 'zustand';

type ZustandCreate = typeof actualCreate;

const stores = new Set<Function>();

const create: ZustandCreate = (...params: Parameters<ZustandCreate>) => {
  const store = actualCreate(...params);
  const initialState = store.getState();
  stores.add(() => store.setState(initialState, true));

  return store;
};

afterEach(() => {
  act(() => {
    stores.forEach((resetFn) => resetFn());
  });
});

export default create;
