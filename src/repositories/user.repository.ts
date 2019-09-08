import {DefaultCrudRepository} from '@loopback/repository';
import {User, UserRelations} from '../models';
import {LdDsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(@inject('datasources.LDDs') dataSource: LdDsDataSource) {
    super(User, dataSource);
  }
}

export type Credentials = {
  email: string;
  password: string;
};
