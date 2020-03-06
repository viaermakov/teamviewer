import { createStore, createEffect, Store, createEvent } from 'effector-logger';
import { useStoreMap } from 'effector-react';

import { IPerson } from 'src/types';
import { getPersonsApi } from 'src/services/api';

export interface IStore {
  $persons: Store<IPerson[]>;
  $favouriteIds: Store<number[]>;
  $isLoading: boolean;
}

interface IQuery {
  [x: string]: string;
}

export const $persons = createStore<IPerson[]>([], { name: 'persons' });
export const $favouriteIds = createStore<number[]>([], { name: 'favouriteIds' });
export const $isLoading = createStore<boolean>(false, { name: 'isLoading' });

export const getPersons = createEffect<void, IPerson[], Error>('fetch $persons json').use(
  getPersonsApi,
);

$persons.on(getPersons.done, (_, { result }) => result);

$isLoading.on(getPersons, () => true);
$isLoading.on(getPersons.done, () => false);

export const addFavouritePerson = createEvent<number>();

$favouriteIds.on(addFavouritePerson, (state, payload: number) => {
  const isExisting = state.includes(payload);
  const favourite = isExisting ? state.filter(item => item !== payload) : [...state, payload];
  return [...favourite];
});

function sortByName(a: IPerson, b: IPerson) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

const getSortedPersons = (persons: IPerson[], query: IQuery) => {
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(query.search || ''),
  );
  const isReverse = query.order === 'desc';

  switch (query.sorting) {
    case 'id': {
      const sortedPersons = filteredPersons.sort((a: IPerson, b: IPerson) => a.id - b.id);
      return isReverse ? sortedPersons.reverse() : sortedPersons;
    }
    case 'age': {
      const sortedPersons = filteredPersons.sort((a: IPerson, b: IPerson) => a.age - b.age);
      return isReverse ? sortedPersons.reverse() : sortedPersons;
    }
    case 'name': {
      const sortedPersons = filteredPersons.sort(sortByName);
      return isReverse ? sortedPersons.reverse() : sortedPersons;
    }
    default:
      return isReverse ? filteredPersons.reverse() : filteredPersons;
  }
};

export const selectPersonsByFilter = (query: IQuery) =>
  useStoreMap({
    store: $persons,
    keys: [query],
    fn: (persons, [query]) => getSortedPersons(persons, query),
  });
