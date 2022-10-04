import { Component, For, Match, Switch } from 'solid-js';

import styles from './App.module.css';
import { useRecord, useRecords } from '../package/src';

const App: Component = () => {
  const records = useRecords("humans");
  const coolestHuman = useRecord("humans", "dx33r9l8oiy7cff")
  return (
    <div class={styles.App}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>hasCar?</th>
          </tr>
        </thead>
        <tbody>
          <For each={records.records} fallback={
            <tr>
              <td>Loading...</td>
              <td aria-busy="true"></td>
            </tr>
          }>
            {(human) =>
              <tr>
                <td>{human.name}</td>
                <td>{human.hasCar ? "Yes" : "No"}</td>
              </tr>
            }
          </For>
        </tbody>
      </table>
      <Switch>
        <Match when={!coolestHuman.value}>
          <h4 aria-busy="true">{coolestHuman.error?.message}</h4>
        </Match>
        <Match when={coolestHuman?.value}>
          <h3>The coolest human:</h3>
          <h4>{coolestHuman.value?.name}</h4>
        </Match>
      </Switch>


    </div >
  );
};

export default App;
