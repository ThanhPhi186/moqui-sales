import {createAction} from '@reduxjs/toolkit';

export function generateActions(actionName) {
  const requestName = `${actionName}_REQUEST`;
  const successName = `${actionName}_SUCCESS`;
  const failedName = `${actionName}_FAILED`;
  const request = createAction(requestName);
  const success = createAction(successName);
  const failed = createAction(failedName);
  return {
    request,
    success,
    failed,
    actionName,
    failedName,
    successName,
    requestName,
  };
}
