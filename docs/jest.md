# Jest

*Jest is a ~zero configuration~ Javascript Unit Testing utility designed by Facebook.* - [Jest Official Site](https://facebook.github.io/jest/)

- - - -

## Index

1.  [Introducing Jest](#introducing-jest)
6.  [Jest Configuration](#jest-configuration)
2.  [Jest and Jenkins](#jest-and-jenkins)
3.  [Writing Unit Tests](#writing-unit-tests)

- - - -
- - - -

# Introducing Jest

Install Jest as a dependency:

```
$ npm install --save-dev jest
```

Install the Jest babel plugin:

```
$ npm install --save-dev babel-jest
```

Add the 'test' script to your project's package.json:
*(Also add Jest to the build script)*
*((Build will fail if tests do not pass))*

```json
"scripts": {
  "start": "webpack-dev-server",
  "build": "jest && webpack",
  "test": "jest --coverage"
}
```

Create a 'tests' directory in the './src' dir:

```
$ mkdir ./src/tests
```

Create an 'App.test.js' file in the './src/tests' dir:

```
$ touch ./src/tests/App.test.js
```

Example App.test.js file:

```javascript

import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

```

- - - -

# Jest Configuration

The following should be added to the project's `package.json` to prevent fatal node_modules mapping errors when unit tests are run, to mock non-js files (like css), to assign a 'testURL' to take the place of window.location during testing, and to mock the project's CONFIG file for testing:

```json
"jest": {
  "modulePathIgnorePatterns": [
    "/node-linux-x64/npm/"
  ],
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
    "config.json": "<rootDir>/__mocks__/config.json"
  },
  "testURL": "http://test.com/",
  "transform": {
    "^.+\\.(js|jsx|mjs)$": "<rootDir>/node_modules/babel-jest"
  }
}
```

# Jest and Jenkins

~Jest will not run in Jenkins atm, because the node version in Jenkins is not high enough to support es2015. *This is a problem.* :cry: ~

- - - -

# Writing Unit Tests

## react-test-renderer

Facebook's [react-test-renderer](https://www.npmjs.com/package/react-test-renderer) is used by this template to render React components for testing.  react-test-renderer is useful for both snapshot testing and interacting with the rendered component inside of a test.

## Testing a Simple Component

The following test tests the `NotFound` component that our template displays when the user navigates to an unresolvable path:

```javascript
import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import NotFound from '../components/404';

test('404 renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NotFound />, div);
});
```

This test simply renders the component inside of a `div` element in ReactDOM.  If a fatal error is encountered in the code while rendering the element, the test will fail.

Note the first line of the script, `import 'raf/polyfill';` is used to squelch the `Warning: React depends on requestAnimationFrame. Make sure that you load a polyfill in older browsers. http://fb.me/react-polyfills` warning.

## Snapshots

Adding a snapshot test to our component is very simple with react-test-renderer:

```javascript
import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import NotFound from '../components/404';

test('404 renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NotFound />, div);
});

test('404 Not Found matches snapshot', () => {
    const component = renderer.create(<NotFound />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
```

Here we use react-test-renderer to render the NotFound component, cast that rendered component to JSON, and then ask Jest to compare the resulting JSON object to it's snapshot.  If there isn't a snapshot for this component (and there won't be the first time that this test is run), Jest will create a snapshot and store that snapshot in `./__snapshots__/`.  

**Changes to a component will cause these snapshot tests to fail.**  If we change the wording of the NotFound component from `Page Not Found` to `Path Not Found`, the test will fail and show us the difference between the snapshot and how the component actually rendered.  Review the diff, ensure that it is an expected change, and then ask Jest to update it's snapshots by running the tests with the `-- -u` option.

```
$ npm test -- -u
```

You should always run tests locally before committing and pushing to GitLab to ensure the tests are updated and passing.

## Mocking

**TODO**

### Mocking Modals

Bootstrap Modals do **not** play nice with react-test-renderer.  **TODO**

## Test Coverage

Running Jest with the `--coverage` option will output a handy little chart of how much of your codebase your unit tests are covering, and which lines are currently uncovered:

```
---------------------------|----------|----------|----------|----------|----------------|
File                       |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
---------------------------|----------|----------|----------|----------|----------------|
All files                  |    80.61 |    76.67 |    86.27 |    82.05 |                |
 components                |      100 |      100 |      100 |      100 |                |
  404.js                   |      100 |      100 |      100 |      100 |                |
  App.js                   |      100 |      100 |      100 |      100 |                |
  Bootstrap-example.js     |      100 |      100 |      100 |      100 |                |
  ContactBar.js            |      100 |      100 |      100 |      100 |                |
  Form-example.js          |      100 |      100 |      100 |      100 |                |
  Home.js                  |      100 |      100 |      100 |      100 |                |
  Login.js                 |      100 |      100 |      100 |      100 |                |
  Navbar.js                |      100 |      100 |      100 |      100 |                |
 components/formComponents |      100 |      100 |      100 |      100 |                |
  CheckboxInput.js         |      100 |      100 |      100 |      100 |                |
  TextInput.js             |      100 |      100 |      100 |      100 |                |
 controllers               |    40.74 |    22.22 |    53.33 |       44 |                |
  geoaxis.js               |    40.74 |    22.22 |    53.33 |       44 |... 158,162,163 |
---------------------------|----------|----------|----------|----------|----------------|
```

This is immensely useful in ensuring your tests cover what **needs** to be covered.

The `npm test` script in this template includes the `--coverage` option by default.

Always push for higher code coverage; *Writing unit tests is a journey*.

- - - -
