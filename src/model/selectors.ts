import { createSelector } from 'reselect';
import { IStore } from './store';
import { IPerson } from 'models';

const getPersons = (state: IStore) => state.main.persons;

interface IQuery {
  [x: string]: string;
}

export const getSortedPersons = () =>
  createSelector(
    (state: IStore) => getPersons(state),
    (state: IStore, query: IQuery) => query,
    (persons: IPerson[], query: IQuery) => {
      const filteredPersons = persons.filter(person =>
        person.name.toLowerCase().includes(query.search || ''),
      );
      switch (query.sorting) {
        case 'name':
          return filteredPersons.sort((a: IPerson, b: IPerson) => a.id - b.id);
        case 'age':
          return filteredPersons.sort((a: IPerson, b: IPerson) => a.age - b.age);
        default:
          return filteredPersons;
      }
    },
  );
