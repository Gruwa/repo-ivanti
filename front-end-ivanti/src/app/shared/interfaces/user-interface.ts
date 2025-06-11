import {CardInterface} from './card-interface';

/**
 * User Interface
 * This interface defines the structure of a user object
 * @interface UserInterface
 * @property {number} id - The unique identifier for the user
 * @property {string} name - The full name of the user
 * @property {string} username - The username of the user
 * @property {string} email - The email address of the user
 * @property {UserAddressInterface} address - The address of the user, structured as a UserAddressInterface
 * @property {string} phone - The phone number of the user
 * @property {string} website - The website of the user
 * @property {UserCompanyInterface} company - The company information of the user, structured as a UserCompanyInterface
 */
export interface UserInterface {
  "id": number,
  "name": string,
  "username": string,
  "email": string,
  "address": UserAddressInterface,
  "phone": string,
  "website": string,
  "company": UserCompanyInterface,
  "messages": CardInterface[]
}

/**
 * User Address Interface
 * This interface defines the structure of a user's address object
 * @interface UserAddressInterface
 * @property {string} street - The street address of the user
 * @property {string} suite - The suite or apartment number of the user
 * @property {string} city - The city where the user resides
 * @property {string} zipcode - The postal code of the user's address
 * @property {UserAddressGeoInterface} geo - The geographical coordinates of the user's address
 */
export interface UserAddressInterface {
  "street": string,
  "suite": string,
  "city": string,
  "zipcode": string,
  "geo": UserAddressGeoInterface
}

/**
 * User Address Geo Interface
 * This interface defines the structure of a user's address geo object
 * @interface UserAddressGeoInterface
 * @property {string} lat - The latitude of the address
 * @property {string} lng - The longitude of the address
 */
export interface UserAddressGeoInterface {
  "lat": string,
  "lng": string
}

/**
 * User Company Interface
 * This interface defines the structure of a user's company object
 * @interface UserCompanyInterface
 * @property {string} name - The name of the company
 * @property {string} catchPhrase - A catchphrase for the company
 * @property {string} bs - A business slogan or description
 */
export interface UserCompanyInterface {
  "name": string,
  "catchPhrase": string,
  "bs": string
}

/**
 * User List Response Interface
 * This interface defines the structure of a response containing a list of users
 * @interface UserListResponseInterface
 * @property {UserInterface[]} users - An array of UserInterface objects representing the users
 * @property {number} total - The total number of users
 * @property {number} page - The current page number
 * @property {number} perPage - The number of users per page
 */
export interface UserListResponseInterface {
  "users": UserInterface[];
  "total": number;
  "page": number;
  "perPage": number;
}

/**
 * Users List Tab Interface
 * This interface defines the structure of a users list tab object
 * @interface UsersListTabInterface
 * @property {0} 'odd' - Represents the odd users list tab
 * @property {1} 'even' - Represents the even users list tab
 */
export interface UsersListTabInterface {
  0: 'odd';
  1: 'even';
}
