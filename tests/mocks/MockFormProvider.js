// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { FormProvider, useForm } from 'react-hook-form';

const MockFormProvider = ({ children }) => {
  const formMethods = useForm();
  const formProps = { ...formMethods };
  return <FormProvider {...formProps}>{children}</FormProvider>;
};

MockFormProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default MockFormProvider;
