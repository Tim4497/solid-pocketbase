## Usage

```bash
pnpm i solid-pocketbase
```

```tsx
const [itemId, setItemId] = createSignal<string>();

const [record] = createResource(itemId, (itemId) => {
    return useRecord("items", itemId)
});

onMount(async () => {
    const url = window.location.href;
    setItemId(() => url.slice(22))
    }
})

return (
    <Show when={record()?.value}
        fallback={
            <p>Loading...</p>
        }
    >
        <h4>
            Value:
        </h4>
        <h5>
            {record()?.value?}
        </h5>
    </Show>
)
```

```tsx
const records = useRecords("items");

return (
    <For
        each={records.value}
        fallback={
            <tr>
              <td></td>
            </tr>
        }
    >
        {record =>
            <tr>
              <td>{record.id}</td>
            </tr>
        }
    </For>
)
```