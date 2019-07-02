# ESLint

*ESLint is an open source JavaScript linting utility. Code linting is a type of static analysis that is frequently used to find problematic patterns or code that doesn’t adhere to certain style guidelines.*
[ESlint Official Site](https://eslint.org/docs/about/)

## Index

1.  [Introducing ESlint](#introducing-eslint)
1.  [ESLint Configuration](#eslint-configuration)
1.  [AirBnB Styleguide](#airbnb-styleguide)

- - - -
- - - -

# Introducing ESLint

Install and save the ESLint dependency:

```
$ npm install --save-dev eslint@4.12.1
```

Install and save the `airbnb` and `react-app` ESLint configurations:

```
$ npm install --save-dev eslint-config-airbnb@10.0.0 eslint-config-react-app@2.0.1
```

Inistall and save the `flowtype`, `import`, `jsx-a11y` and `react` ESlint plugins:

```
$ npm install --save-dev eslint-plugin-flowtype@2.39.1 eslint-plugin-import@2.8.0 eslint-plugin-jsx-a11y@2.2.3 eslint-plugin-react@7.5.1
```

# ESLint Configuration

Create a `.eslintrc.json` file at the project's root directory:

```
$ touch .eslintrc.json
```

Here is our commented `.eslintrc.json` file:

```json
{
    // linter extends the following styleguides
    "extends": ["airbnb", "react-app"],
    // define the parser used to lint
    "parser": "babel-eslint",
    // configure individual rules
    "rules": {
        // set the indentation to 4 spaces
        "indent": [1, 4, { "SwitchCase": 1, "VariableDeclarator": 1 }],
        // set the indentation of jsx blocks to 4 spaces
        "react/jsx-indent": ["error", 4],
        // set the indentation of properties within a jsx component to 4 spaces
        "react/jsx-indent-props": ["error", 4],
        // allow the file extensions of files containing jsx to be .jsx or .js
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        // ???
        "react/prefer-stateless-function": [1, { "ignorePureComponents": true } ],
        //  turn off various jsx-a11y rules that are incompatible with airbnb
        "jsx-a11y/label-has-for": 0,
        "jsx-a11y/href-no-hash": 0,
        "jsx-a11y/accessible-emoji": 0,
        "jsx-a11y/alt-text": 0,
        "jsx-a11y/iframe-has-title": 0,
        "jsx-a11y/no-redundant-roles": 0,
        "jsx-a11y/no-distracting-elements": 0,
        "jsx-a11y/aria-activedescendant-has-tabindex": 0,
        // set the max-length of a line of code to 120 characters, ignoring lines
        //  which exceed that length because they contain urls
        "max-len": [2, 120, 4, {"ignoreUrls": true}],
        // turned off because it is incompatible with airbnb styleguid
        "react/require-extension": 0,
        // turned off to allow the import of devDependencies in webpack configuration files
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true, "optionalDependencies": false, "peerDependencies": false}]
        // turned off line ending warning due to UNIX using LF endings vs Windows using CRLF endings
        "linebreak-style": 0
    },
    // define the plugins being used with eslint
    "plugins": [
        "react",
        "import",
        "flowtype",
        "jsx-a11y"
    ]
}
```

# AirBnB Styleguide

> So Banksy goes in and spray paints over your Picasso shopping cart and makes it
> collaborative and you have a big successful relaunch.
>
> A month later a bug report comes in about removing items from the shopping cart. Banksy is
> busy on another project, so you get Monet to go in and fix it.
>
> Monet doesn’t know how to use spray paint cans. So his attempts to fix it are sloppy. He
> breaks the build. He switches back to the brush and just paints over it, but it took a lot
> longer than it should have because of the time to understand and adopt an unfamiliar style.
>
> - [airbnb 'Why does JavaScript need a style guide?'](http://airbnb.io/projects/javascript/)

The [airbnb JavaScript Styleguide](https://github.com/airbnb/javascript) is TDGI's preferred JavaScript styleguide, with minor modifications.
