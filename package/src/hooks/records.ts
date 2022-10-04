import { createEffect, useContext } from "solid-js";
import { Record } from "pocketbase"
import { PocketBaseContext } from "../PocketbaseProvider";
import { createStore, produce, reconcile } from "solid-js/store";

export const useRecords = (collection: string, batchSize: number = 200, realtime: boolean = true) => {
    const client = useContext(PocketBaseContext);

    if (!client) {
        throw new Error("useRecords must be used within a <ClientProvider>");
    }

    const [records, setRecords] = createStore<{ records: Record[] | undefined, error: Error | undefined }>({ records: undefined, error: undefined })

    createEffect(() => {
        client.records.getFullList(collection, batchSize)
            .then(async (records) => {
                setRecords(
                    reconcile(
                        {
                            records,
                            error: undefined
                        }
                    )
                )
                if (realtime) {
                    await client.realtime.subscribe(collection, (event) => {
                        switch (event.action) {
                            case "create":
                                setRecords(
                                    reconcile({
                                        records: [...records!, event.record],
                                        error: undefined
                                    })
                                )
                                break;
                            case "update":
                                setRecords(
                                    reconcile({
                                        records: records!.map((record) => {
                                            if (record.id === event.record.id) {
                                                record = event.record
                                            }
                                            return record;
                                        }),
                                        error: undefined
                                    })
                                )
                                break;
                            case "delete":
                                setRecords({ records: records?.filter((record) => record.id !== event.record.id) });
                                break;
                        }
                    })
                }
            }).catch((error) => setRecords(
                reconcile(
                    {
                        records: undefined,
                        error
                    }
                )
            ));
    });

    return records;
}


