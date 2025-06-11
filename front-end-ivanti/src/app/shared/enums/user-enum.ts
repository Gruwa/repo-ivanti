/**
 * This enum defines the endpoints for fetching user data from both internal and external sources.
 */
export enum EUserAPI {
  INTERNALSORCE = "/data/users.json",
  OUTSOURCE = 'https://jsonplaceholder.typicode.com/users'
}

/**
 * This enum defines the endpoints for fetching user messages from both internal and external sources.
 */
export enum EUserMessageAPI {
  INTERNALSORCE = "/data/posts.json",
  OUTSOURCE = 'https://jsonplaceholder.typicode.com/posts'
}

export enum EUserLisType {
  ODD = "odd",
  EVEN = 'even',
  FULL = ''
}

export enum EUserLisTypeTab {
  ODD = 0,
  EVEN = 1
}
