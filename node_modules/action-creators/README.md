# action-creators
[![Build Status](https://travis-ci.org/lsentkiewicz/action-creators.svg?branch=master)](https://travis-ci.org/lsentkiewicz/action-creators)
[![codecov](https://codecov.io/gh/lsentkiewicz/action-creators/branch/master/graph/badge.svg)](https://codecov.io/gh/lsentkiewicz/action-creators)

Action creators utilities for Redux.  
Features:
- Parameter validation using [joi](https://www.npmjs.com/package/joi).
- Debug created actions using [debug](https://www.npmjs.com/package/debug).
- No need to define constants.
- No duplicated namespaces.
- No duplicated action names.  

Notes:
- It doesn't work with [redux-thunk](https://www.npmjs.com/package/redux-thunk), but it's designed to work with [redux-logic](https://www.npmjs.com/package/redux-logic).

## Installation
```bash
npm i --save action-creators joi joi-browser
```
Add to webpack.config.js
```js
resolve: {
  alias: {
    joi: 'joi-browser'
  }
}
```

## Enable debugging
Add to your your app.
```js
if (process.env.NODE_ENV !== 'production') {
  process.env.DEBUG = 'ac:*';
}
```
Or in webpack.config.js
```js
plugins: [
  new webpack.DefinePlugin({
    'process.env': {
      DEBUG: JSON.stringify(process.env.NODE_ENV !== 'production' ? 'ac:*' : ''),
    },
  }),
],
```

## Quick demo

```js
// user-actions.js

import createNamespace from 'action-creators';

const {createAction} = createNamespace('USERS');

const usersLoaded = createAction('USERS_LOADED',
  ['keyword', 'items', 'pageNumber', 'pageSize'],
  {
    keyword: Joi.string().required(),
    items: Joi.array().required(),
    pageNumber: Joi.number().required(),
    pageSize: Joi.number().required(),
  }
);
expect(usersLoaded('john', [{id: 1, name: 'john'}], 1, 10)).toEqual({
  type: 'USERS/USERS_LOADED',
  payload: {
    keyword: 'john',
    items: [{id: 1, name: 'john'}],
    pageNumber: 1,
    pageSize: 10,
  },
});
```

Console output:
```
ac:USERS USERS_LOADED { keyword: 'john', items: [ { id: 1, name: 'john' } ], pageNumber: 1, pageSize: 10 } +0ms
```

Error reporting
```js
usersLoaded('john', -2, 1, 10)
```

throws an error
```
ValidationError: Validation failed for: "USERS/USERS_LOADED" {
  "keyword": "john",
  "pageNumber": 1,
  "pageSize": 10,
  "items" [1]: -2
}

[1] "items" must be an array

```

## Usage with reducers

```js
// user-reducer.js
import {usersLoaded} from './user-actions';

function reducer(state = {}, action) {
  switch (action.type) {
    case usersLoaded.toString(): 
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }
}
```

You can also use `handleActions` from [redux-actions](http://npmjs.com/package/redux-actions).

## Motivation
- During development, action creators can be called with invalid or missing arguments, and it usually causes errors in the reducer function.  
- When using `createAction` from `redux-actions`, it's not obvious if the action creator requires any arguments.  
   For example:  
   `increment = createAction('INCREMENT');`  
   You don't know if you should call `increment()` or `increment(something)`. In such situation, you always must check the expected payload in the reducer.
- I needed a fast way to debug created actions. There are existing libraries for logging like [redux-logger](http://npmjs.com/package/redux-logger),
  but it can sometimes be not convenience. You must expand 3 levels of an object to see the action payload.
  It's much more readable if the action payload is logged in a single line.

## API
- `createNamespace(namespace)`
  - Parameters:  
     - `namespace: String` The namespace prefix for all action types. All namespaces must be unique otherwise an error will be thrown.  
   - Returns:  
    `{createAction: Function}` Return an object with a `createAction` property.
- `createAction(type, argNames, schema, transform)`  
  - Parameters:
     - `type: String` The action type. All namespaces must be unique otherwise an error will be thrown.
     - `argNames: Array` An array with arguments.
     - `schema: Object` A Joi schema. Must be an object containing all props from the `argNames` array.  
     - `transform: Function(Object)` An optional function to transform the created action. You can use it to change payload or metadata.
  - Returns:
     - `Function` The action creator



MIT License

Copyright (c) 2017 Łukasz Sentkiewicz