import { User } from './user.model';

export class Book {
  id?: number;
  title?: string;
  author?: string;
  publishedDate?: Date | string;
  description?: string;
  addedBy?: User['Id'];
}
