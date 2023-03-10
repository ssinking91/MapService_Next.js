import { useCallback } from 'react';
import { mutate } from 'swr';
import type { Store } from '@/types/store';

export const CURRENT_STORE_KEY = '/current-store';

// 하나의 마커를 눌렀을 때 어떤 마커가 눌려있는지 그 상태 값을 currentStore라는 변수로 전역상태를 관리
const useCurrentStore = () => {
  // 현재 선택된 store를 저장
  const setCurrentStore = useCallback((store: Store) => {
    mutate(CURRENT_STORE_KEY, store);
  }, []);

  // currentStore를 null로 초기화
  const clearCurrentStore = useCallback(() => {
    mutate(CURRENT_STORE_KEY, null);
  }, []);

  return {
    setCurrentStore,
    clearCurrentStore,
  };
};
export default useCurrentStore;
