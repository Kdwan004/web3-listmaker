import { Transaction } from "@mysten/sui/transactions";
import {Button, Container} from "@radix-ui/themes";
import {useSignAndExecuteTransaction, useSuiClient} from "@mysten/dapp-kit";
import {useNetworkVariable} from "./networkConfig.ts";
import ClipLoader from "react-spinners/ClipLoader";

export function CreateList ({
    onCreated,
                            }: {
    onCreated: (id: string | undefined) => void;
}) {
    const listPackageId = useNetworkVariable("listPackageId");
    const suiClient = useSuiClient();
    

    const {
        mutate: signAndExecute,
        isSuccess,
        isPending,
    } = useSignAndExecuteTransaction();

    function create() {
        const tx = new Transaction();

        const gasBudget = 10000000;
        tx.setGasBudget(gasBudget);

        tx.moveCall({
            arguments: [],
            target: `${listPackageId}::list_maker::create`,
        });

        signAndExecute(
            {
                transaction: tx,
            },
            {
                onSuccess: async ({digest}) => {
                    const {effects} = await suiClient.waitForTransaction({
                        digest: digest,
                        options: {
                            showEffects: true,
                        },
                    });

                    onCreated(effects?.created?.[0]?.reference?.objectId);
                },
            },
        );
    }

    return (
        <Container>
            <Button
                size="3"
                onClick={() => {
                    create();
                }}
                disabled={isSuccess || isPending}
            >
                {isSuccess || isPending ? <ClipLoader size={20} /> : "Create List"}
            </Button>
        </Container>
    );

}