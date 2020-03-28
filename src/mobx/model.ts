import { getPersonsApi } from 'src/services/api';
import { IPerson } from './../types/index';
import { observable, action, computed } from 'mobx';
import { createTransformer } from 'mobx-utils';

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

export class PersonsStore {
  @observable persons: IPerson[] = [];
  @observable favouriteIds: number[] = [];
  @observable isLoading: boolean = false;

  @action getPersons = async () => {
    this.isLoading = true;
    const data = await getPersonsApi();
    this.isLoading = false;
    this.persons = data;
  };

  @action addFavouritePerson = (id: number) => {
    const isExisting = this.favouriteIds.includes(id);
    if (isExisting) {
      this.favouriteIds = this.favouriteIds.filter(item => item !== id);
      return;
    }
    this.favouriteIds = [...this.favouriteIds, id];
  };

  @computed get getSortedPersons() {
    return createTransformer((query: IQuery) => {
      const filteredPersons = this.persons.filter(person =>
        person.name.toLowerCase().includes(query.search || ''),
      );
      const isReverse = query.order === 'desc';

      switch (query.sorting) {
        case 'id': {
          const sortedPersons = filteredPersons.sort((a: IPerson, b: IPerson) => a.id - b.id);
          return isReverse ? sortedPersons.reverse() : sortedPersons;
          break;
        }
        case 'age': {
          const sortedPersons = filteredPersons.sort((a: IPerson, b: IPerson) => a.age - b.age);
          return isReverse ? sortedPersons.reverse() : sortedPersons;
          break;
        }
        case 'name': {
          const sortedPersons = filteredPersons.sort(sortByName);
          return isReverse ? sortedPersons.reverse() : sortedPersons;
          break;
        }
        default:
          return isReverse ? filteredPersons.reverse() : filteredPersons;
      }
    });
  }
}
