import { reducer as toastrReducer } from 'react-redux-toastr';

import { reducer as userReducer } from './user/user.slice';

const reducer = {
  toastr: toastrReducer,
  user: userReducer,
};

export default reducer;
