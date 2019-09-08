import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './ld-ds.datasource.json';

export class LdDsDataSource extends juggler.DataSource {
  static dataSourceName = 'LDDs';

  constructor(
    @inject('datasources.config.LDDs', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
