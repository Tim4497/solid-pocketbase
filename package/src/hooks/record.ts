import { createEffect, createSignal, useContext } from "solid-js";
import { Record } from "pocketbase"
import { PocketBaseContext } from "../PocketbaseProvider";
import { createStore, reconcile } from "solid-js/store";

export const useRecord = (collection: string, id: string, realtime: boolean = true) => {
    const client = useContext(PocketBaseContext);

    if (!client) {
        throw new Error("useRecord must be used within a <ClientProvider>");
    }

    const [record, setRecord] = createStore<
        {
            value: Record | undefined,
            error: Error | undefined
        }>
        ({
            value: undefined,
            error: undefined
        });

    createEffect(() => {
        client.records.getOne(collection, id)
            .then(async (record: Record) => {
                setRecord(reconcile({ value: record, error: undefined }))
                if (realtime) {
                    await client.realtime.subscribe(collection + "/" + id, (event) => {
                        switch (event.action) {
                            case ("update"):
                                setRecord({ value: event.record })
                                break;
                            case ("delete"):
                                setRecord({ value: undefined })
                                break;
                        }
                    })
                }
            })
            .catch((err: Error) => {
                setRecord(reconcile({ value: undefined, error: err })
                )
            });
    });
    return record;
}

