import React from 'react';
import ReduxToastrLib from 'react-redux-toastr';

const ReduxToastr = () => {
  return (
    <ReduxToastrLib
      position='bottom-right'
      preventDuplicates
      progressBar
      newestOnTop
      timeOut={3000}
      closeOnToastrClick
      transitionIn='fadeIn'
      transitionOut='fadeOut'
    />
  );
};

export default ReduxToastr;
