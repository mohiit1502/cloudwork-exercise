import { createAction } from 'typesafe-actions';

import { Status } from './types';
import { SUBMIT, CREATED, CANCEL, FAILED, UPDATE_STATUS } from './constants';

export const submit = createAction(SUBMIT, resolve => (params: { complexity: number }) => resolve({ complexity: params.complexity }));

export const created = createAction(CREATED, resolve => {
    return (params: { id: number, status: Status, complexity: number, completeDate: Date }) => {
      return resolve({
        id: params.id,
        status: params.status,
        completeDate: params.completeDate,
        complexity: params.complexity,
      })
    }
  });

export const failed = createAction(FAILED, resolve => (params: { message: string }) => resolve({ message: params.message }));

export const cancel = createAction(CANCEL, resolve => (params: { id: number }) => resolve({ id: params.id }));

export const updateStatus = createAction(UPDATE_STATUS, resolve =>
  (params: { id: number, status: Status }) => resolve({ id: params.id, status: params.status }))

