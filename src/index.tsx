/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';

import PocketBase from '../node_modules/pocketbase';
import { PocketBaseProvider } from '../package/src';

const PBClient = new PocketBase('http://127.0.0.1:8090');

render(() => 
<PocketBaseProvider client={PBClient}>
<App />
</PocketBaseProvider>

, document.getElementById('root') as HTMLElement);
