import { useCallback } from 'react';
import { Store } from '@/types/store';
import { mutate } from 'swr';

export const STORE_KEY = '/stores';

const useStores = () => {
  const initializeStores = useCallback((stores: Store[]) => {
    // 새로운 매장데이터(stores)를 인자로 받아 그 데이터를 전역 상태로 저장
    mutate(STORE_KEY, stores);
  }, []);

  return {
    initializeStores,
  };
};
export default useStores;
