### Quick start
**Make sure you have Node version >= 6.0 and NPM >= 3**

```bash
git clone --depth 1 https://github.com/luxurymini/mini-erp.git

cd 

npm install

npm start

# Getting Started

## Dependencies
Once you have those, you should install these globals with `npm install --global`:
* npm install --global electron, webpack, karma-cli, typescript

## Installing
* `fork` this repo
* `clone` your fork
* `npm install` to install all dependencies or `yarn`
* `npm start` to start the development workflow

## Building

```bash
# development
npm run build:dev
# production (jit)
npm run build:prod
# AoT
npm run build:aot
```

## Launching Your Build

```bash
npm run launch
```

## Generating Release Packages

Make sure to build your app first. Application packages files will be generated inside the `/packages` directory.

```bash
# all platforms
npm run package
# Linux
npm run package:linux
# Mac
npm run package:mac
# Windows
npm run package:windows
```

# Managing Dependencies

```bash
# if you use yarn
yarn run install-app-deps
# otherwise
npm run install-app-deps
```

# Types
> When you include a module that doesn't include Type Definitions inside of the module you can include external Type Definitions with @types

i.e, to have youtube api support, run this command in terminal: 
```shell
npm i @types/youtube @types/gapi @types/gapi.youtube
``` 
In some cases where your code editor doesn't support Typescript 2 yet or these types weren't listed in ```tsconfig.json```, add these to **"src/custom-typings.d.ts"** to make peace with the compile check: 
```es6
import '@types/gapi.youtube';
import '@types/gapi';
import '@types/youtube';
```

## Custom Type Definitions
When including 3rd party modules you also need to include the type definition for the module
if they don't provide one within the module. You can try to install it with @types

```
npm install @types/node
npm install @types/lodash
```

If you can't find the type definition in the registry we can make an ambient definition in
this file for now. For example

```typescript
declare module "my-module" {
  export function doesSomething(value: string): string;
}
```


If you're prototyping and you will fix the types later you can also declare it as type any

```typescript
declare var assert: any;
declare var _: any;
declare var $: any;
```

If you're importing a module that uses Node.js modules which are CommonJS you need to import as

```typescript
import * as _ from 'lodash';
```

# License
 [MIT](/LICENSE)
