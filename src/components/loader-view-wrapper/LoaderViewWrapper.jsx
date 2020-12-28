import React from 'react';

import Loader from '../loader';

const LoaderViewWrapper = ({ loading, children }) =>
  loading ? <Loader loading /> : children;

export default LoaderViewWrapper;
