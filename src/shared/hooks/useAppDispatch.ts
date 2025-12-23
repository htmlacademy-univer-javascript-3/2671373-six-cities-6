import {useDispatch} from 'react-redux';
import {AppDispatch} from '@/shared/types';

export const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();
