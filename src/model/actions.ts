import { IPerson } from '../types';
import {
  PERSONS_DATA_FAILURE,
  PERSONS_DATA_REQUEST,
  PERSONS_DATA_SUCCESS,
  ADD_FAVOURITE,
  DELETE_FAVOURITE,
} from './types';
import { getPersonsApi } from 'src/services/api';
import { Dispatch } from 'redux';

export interface IPersonsDataRequest {
  type: PERSONS_DATA_REQUEST;
}

export interface IPersonsDataSuccess {
  type: PERSONS_DATA_SUCCESS;
  payload: IPerson[];
}

export interface IPersonsDataFailure {
  type: PERSONS_DATA_FAILURE;
  payload: any;
}

export interface IAddFavouritePerson {
  type: ADD_FAVOURITE;
  payload: number;
}

export interface IDeleteFavouritePerson {
  type: DELETE_FAVOURITE;
  payload: number;
}

export type PersonsDataActionType =
  | PERSONS_DATA_FAILURE
  | PERSONS_DATA_REQUEST
  | PERSONS_DATA_SUCCESS
  | ADD_FAVOURITE;

export interface IPersonsDataAction {
  type: PersonsDataActionType;
  payload?: any;
}

export function getPersons() {
  return async (dispatch: Dispatch<IPersonsDataAction>): Promise<void> => {
    dispatch(personsData());
    const persons = await getPersonsApi();
    dispatch(personsDataSuccess(persons));
  };
}

export function personsData(): IPersonsDataRequest {
  return {
    type: PERSONS_DATA_REQUEST,
  };
}

export function personsDataSuccess(data: IPerson[]): IPersonsDataSuccess {
  return {
    type: PERSONS_DATA_SUCCESS,
    payload: data,
  };
}

export function personsDataFailure(value: string): IPersonsDataFailure {
  return {
    type: PERSONS_DATA_FAILURE,
    payload: { value },
  };
}

export function addFavouritePerson(value: number): IAddFavouritePerson {
  return {
    type: ADD_FAVOURITE,
    payload: value,
  };
}

export function deleteFavouritePerson(value: number): IDeleteFavouritePerson {
  return {
    type: DELETE_FAVOURITE,
    payload: value,
  };
}
