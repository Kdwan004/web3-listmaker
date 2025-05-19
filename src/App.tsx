import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { isValidSuiObjectId } from "@mysten/sui/utils";
import { Box, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { useState } from "react";
import { List } from "./List";
import { CreateList } from "./CreateList";

function App() {
    const currentAccount = useCurrentAccount();
    const [listId, setList] = useState<string | null>(() => {
        const hash = window.location.hash.slice(1);
        return isValidSuiObjectId(hash) ? hash : null;
    });

    const handleListDeleted = () => {
        window.location.hash = "";
        setList(null);
    };

    const handleListCreated = (id: string) => {
        window.location.hash = id;
        setList(id);
    };

    return (
        <div className="app-container">
            <Flex className="header" justify="between" align="center">
                <Box>
                    <Heading className="heading">List Maker</Heading>
                    <Text className="subheading" as="p">
                        Create and manage your lists on Sui
                    </Text>
                </Box>
                <Box className="wallet-connect">
                    <ConnectButton />
                </Box>
            </Flex>
            
            <Container className="container">
                {currentAccount ? (
                    listId ? (
                        <List id={listId} onDeleted={handleListDeleted} />
                    ) : (
                        <CreateList onCreated={handleListCreated} />
                    )
                ) : (
                    <Box className="connect-wallet-message">
                        <Heading size="4" mb="2">Welcome to List Maker</Heading>
                        <Text size="3" color="gray">
                            Connect your wallet to create and manage lists on the Sui blockchain
                        </Text>
                    </Box>
                )}
            </Container>
        </div>
    );
}

export default App;