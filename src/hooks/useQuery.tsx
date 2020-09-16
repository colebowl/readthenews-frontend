import qs from 'querystring';
import { useLocation } from 'react-router-dom';

function useQuery<T>(): T {
  const location = useLocation();
  const query = qs.parse(location.search.replace('?', ''));
  return query as any as T;
}

export default useQuery;
