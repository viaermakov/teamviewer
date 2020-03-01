import { createSelector } from 'reselect';
import { IStore } from './store';
import { IPerson } from 'src/types';

const getPersons = (state: IStore) => state.main.persons;

interface IQuery {
  [x: string]: string;
}

function sortByName(a: IPerson, b: IPerson) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

export const getSortedPersons = () =>
  createSelector(
    (state: IStore) => getPersons(state),
    (state: IStore, query: IQuery) => query,
    (persons: IPerson[], query: IQuery) => {
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
    },
  );
