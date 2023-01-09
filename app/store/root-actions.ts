import * as usersAsyncActions from './user/user.actions';
import { userActions } from './user/user.slice';

export const allActions = {
  ...usersAsyncActions,
  ...userActions,
};
