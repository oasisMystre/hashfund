import BN from "bn.js";
import {
  createSwapInInstruction,
  createSwapOutInstruction,
  getOrCreateAssociatedTokenAccountInstructions,
} from "@hashfund/program";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";

export const createSwapInTransaction = async (
  connection: Connection,
  payer: PublicKey,
  mint: PublicKey,
  amount: BN
) => {
  const tokenADestinationAccountIx =
    await getOrCreateAssociatedTokenAccountInstructions(
      connection,
      mint,
      payer,
      payer,
      false
    );

  return new Transaction().add(
    ...tokenADestinationAccountIx,
    createSwapInInstruction({
      connection,
      payer,
      tokenAMint: mint,
      data: { amount },
    })
  );
};

export const createSwapOutTransaction = async (
  connection: Connection,
  payer: PublicKey,
  mint: PublicKey,
  amount: BN
) => {
  
  return new Transaction().add(
    ...(await createSwapOutInstruction({
      connection,
      payer,
      tokenAMint: mint,
      data: { amount },
    }))
  );
};
