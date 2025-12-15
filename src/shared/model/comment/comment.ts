import {TUser} from '@/shared/model/user';

export type TComment = {
  id: string;
  date: string;
  user: TUser;
  comment: string;
  rating: number;
}
