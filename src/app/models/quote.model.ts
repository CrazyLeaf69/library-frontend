import { User } from './user.model';

export class Quote {
  id?: number;
  value?: string;
  from?: string;
  userId?: User['Id'];
  username?: User['Username'];
  isFavorite?: boolean;
  favoriteQuoteId?: number;
}
