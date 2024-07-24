import dotenv from 'dotenv'
import { mintTo } from '@solana/spl-token';
import { getExplorerLink, getKeypairFromEnvironment } from '@solana-developers/helpers';
import { clusterApiUrl, Connection, Keypair, PublicKey } from '@solana/web3.js';

dotenv.config();

let connection = new Connection(clusterApiUrl("devnet"));

// let keypair = Keypair.generate();

let user = getKeypairFromEnvironment("SECRET_KEY");

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10,2);

console.log(user.publicKey.toBase58());

const tokenMintAccount = new PublicKey("7kPmssXZLM69cMtj9GqvT7417D1E9m3zjUGKme9k5tb3");

const recipientAssociatedTokenAccount = new PublicKey("CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN")

const transactionSignature = await mintTo(
    connection,
    user,
    tokenMintAccount,
    user.publicKey,
    recipientAssociatedTokenAccount,
    10 * MINOR_UNITS_PER_MAJOR_UNITS
)

const link = getExplorerLink("transaction", transactionSignature, "devnet");

console.log(`Success! Mint Token Transaction: ${link}`);