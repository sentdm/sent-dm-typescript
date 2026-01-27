// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ContactsAPI from './contacts';
import { Contacts } from './contacts';
import * as UsersAPI from './users';
import { BaseDto, CustomerUserDto, Users } from './users';

export class Profiles extends APIResource {
  users: UsersAPI.Users = new UsersAPI.Users(this._client);
  contacts: ContactsAPI.Contacts = new ContactsAPI.Contacts(this._client);
}

Profiles.Users = Users;
Profiles.Contacts = Contacts;

export declare namespace Profiles {
  export { Users as Users, type BaseDto as BaseDto, type CustomerUserDto as CustomerUserDto };

  export { Contacts as Contacts };
}
