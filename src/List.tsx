import {
    useCurrentAccount,
    useSignAndExecuteTransaction,
    useSuiClient,
    useSuiClientQuery,
} from "@mysten/dapp-kit";
import type { SuiObjectData } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { useNetworkVariable } from "./networkConfig";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export function List({ id, onDeleted }: { id: string; onDeleted?: () => void }) {
    const listPackageId = useNetworkVariable("listPackageId");
    const suiClient = useSuiClient();
    const currentAccount = useCurrentAccount();
    const { mutate: signAndExecute } = useSignAndExecuteTransaction();
    const [text, setText] = useState(""); // State to store textbox value
    const [number, setNum] = useState(""); // State to store textbox value
    const { data, isPending, error, refetch } = useSuiClientQuery("getObject", {
        id,
        options: {
            showContent: true,
            showOwner: true,
        },
    });


    const [waitingForTxn, setWaitingForTxn] = useState("");

    const executeMoveCall = (method: "add" | "remove" | "delete") => {
        setWaitingForTxn(method);

        const tx = new Transaction();

        if (method === "add") {
            tx.moveCall({
                arguments: [tx.object(id), tx.pure.string(text)],
                target: `${listPackageId}::list_maker::add`,
            });

        } else if (method === "remove") {
            tx.moveCall({
                arguments: [tx.object(id), tx.pure.u64(number)],
                target: `${listPackageId}::list_maker::remove`,
            });
        } else if (method === "delete") {
            tx.moveCall({
                arguments: [tx.object(id)],
                target: `${listPackageId}::list_maker::delete`,
            })

        }

        signAndExecute(
            {
                transaction: tx,
            },
            {
                onSuccess: (tx) => {
                    suiClient.waitForTransaction({ digest: tx.digest }).then(async () => {
                        await refetch();
                        setWaitingForTxn("");
                    });
                },
            },
        );
    };

    if (isPending) return <Text>Loading...</Text>;

    if (error) return <Text>Error: {error.message}</Text>;

    if (!data.data) return onDeleted();



    const ownedByCurrentAccount =
        getCounterFields(data.data)?.owner === currentAccount?.address;

    return (
        <>
            <Flex direction="column" gap="2">
                <Heading size="3">List {id}</Heading>

                <Text>
                    Added Items: {"\n"}
                    {getCounterFields(data.data)?.items?.join(",")}
                </Text>

                {/* ADD Button + Textbox */}
                <Flex direction="row" gap="2" align="center">
                    <Button
                        onClick={() => executeMoveCall("add")}
                        disabled={waitingForTxn !== ""}
                    >
                        {waitingForTxn === "add" ? <ClipLoader size={20} /> : "ADD"}
                    </Button>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)} // Update state
                        placeholder="Enter item to ADD"
                    />
                </Flex>

                {/* REMOVE Button + Textbox */}
                <Flex direction="row" gap="2" align="center">
                    <Button
                        onClick={() => executeMoveCall("remove")}
                        disabled={waitingForTxn !== ""}
                    >
                        {waitingForTxn === "remove" ? <ClipLoader size={20} /> : "REMOVE"}
                    </Button>
                    <input
                        type="number"
                        value={number}
                        onChange={(e) => setNum(e.target.value)} // Update state
                        placeholder="Enter Index to REMOVE"
                    />
                </Flex>
                    <Flex direction="row" gap="2" align="center">
                        {ownedByCurrentAccount ? (

                            <Button
                            onClick={() => executeMoveCall("delete")}
                            disabled={waitingForTxn !== ""}
                        >
                            {waitingForTxn === "delete" ? <ClipLoader size={20} /> : "DELETE"}
                        </Button>
                        ) : null}

                    </Flex>

            </Flex>

        </>
    );
}
function getCounterFields(data: SuiObjectData) {
    if (data.content?.dataType !== "moveObject") {
        return null;
    }

    return data.content.fields as { items: string[]; owner: string };
}


