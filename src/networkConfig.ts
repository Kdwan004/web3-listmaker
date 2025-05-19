import { getFullnodeUrl } from "@mysten/sui/client";
import {
    DEVNET_LIST_PACKAGE_ID,
    TESTNET_LIST_PACKAGE_ID,
    MAINNET_LIST_PACKAGE_ID,
} from "./constants.ts";
import { createNetworkConfig } from "@mysten/dapp-kit";

const { networkConfig, useNetworkVariable, useNetworkVariables } =
    createNetworkConfig({
        devnet: {
            url: getFullnodeUrl("devnet"),
            variables: {
                listPackageId: DEVNET_LIST_PACKAGE_ID,
            },
        },
        testnet: {
            url: getFullnodeUrl("testnet"),
            variables: {
                listPackageId: TESTNET_LIST_PACKAGE_ID,
            },
        },
        mainnet: {
            url: getFullnodeUrl("mainnet"),
            variables: {
                listPackageId: MAINNET_LIST_PACKAGE_ID,
            },
        },
    });

export { useNetworkVariable, useNetworkVariables, networkConfig };
