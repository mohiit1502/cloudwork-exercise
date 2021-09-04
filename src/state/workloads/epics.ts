import { from, timer } from 'rxjs';
import { combineEpics, Epic } from 'redux-observable';
import { filter, map, switchMap, delayWhen } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

import { RootAction, RootState } from '../reducer';
import * as workloadsActions from './actions';
import {service} from "../workloads/services";


type AppEpic = Epic<RootAction, RootAction, RootState>;

const createWorkload: AppEpic = (action$, state$) => (
  action$.pipe(
    filter(isActionOf(workloadsActions.submit)),
    switchMap(action => from(service.create(action.payload))),
    map(res => workloadsActions.created(res)),
  )
);

const cancelWorkload: AppEpic = (action$, state$) => (
  action$.pipe(
    filter(isActionOf(workloadsActions.cancel)),
    switchMap(action => from(service.cancel(action.payload))),
    map(res => workloadsActions.updateStatus(res))
  )
);

const updateWorkload: AppEpic = action$ => (
  action$.pipe(
    filter(isActionOf(workloadsActions.created)),
    delayWhen(action => timer(action.payload.complexity * 1000)),
    switchMap(action => from(service.checkStatus(action.payload))),
    map(res => workloadsActions.updateStatus(res))
  )
);

export const epics = combineEpics(
  createWorkload,
  cancelWorkload,
  updateWorkload
);

export default epics;
