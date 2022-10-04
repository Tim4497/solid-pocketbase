# WORK IN PROGRESS

    If you copy-paste from example app: 

    The Testapp is using the package folder (which is also the npm package source) as a dependency, in your own app, you can use the solid-pocketbase hooks by `(p)npm i solid-pocketbase` but you have to change the import statment from

    import { useRecord, useRecords } from '../package/src';

    to

    import { useRecord, useRecords } from 'solid-pocketbase';

    (your IDE might throw an error anyway)
 
    


## Usage
I use pnpm. <br>
This is the reason you see a `pnpm-lock.yaml`. That being said, any package manager will work. This file can be safely be removed.

## Start
```bash
$ pnpm install # or npm install or yarn install
```

## Then download pocketbase executable and place in folder backend (for example):

```bash
$ mkdir backend
```
then run this to start the pocketbase server (look in package.json under scripts to see why):
```bash
$ pnpm backend
```

### to use the example app found in ./src, create table `humans` with `name` as text (required) and `hasCar` as boolean:

![Example Collection](collection_example.png)


In the project directory, you can now run:

###  `pnpm start`
<br>
This runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
<br>
<br>


