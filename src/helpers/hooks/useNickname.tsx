import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { setNextRoute } from '../../state/reducers/local';

const useNickname = (path?: string) => {
  const nickname = useAppSelector((state) => state.localSlice.nickname);
  const dispatch = useAppDispatch();

  if (!nickname && typeof window !== 'undefined') {
    const router = useRouter();
    dispatch(setNextRoute(path || router.asPath));

    useEffect(() => {
      router.replace('/getstarted');
    }, []);
  }

  return nickname!;
};

export default useNickname;
