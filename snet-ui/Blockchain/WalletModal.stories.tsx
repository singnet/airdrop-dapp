import { default as BlockchainWalletModal } from "./WalletModal";
import { Meta } from "@storybook/react";
import { useState } from "react";
import { Button } from "@mui/material";
import BlockChainProvider from "./Provider";

export default {
  title: "Components/Blockchain",
} as Meta;

export const WalletModal: React.VFC<{}> = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  return (
    <div>
      <BlockChainProvider>
        <Button onClick={handleOpen}>Open modal</Button>
        <BlockchainWalletModal open={open} setOpen={setOpen} />
      </BlockChainProvider>
    </div>
  );
};
