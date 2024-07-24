import dotenv from 'dotenv'
import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token';
import { getExplorerLink, getKeypairFromEnvironment } from '@solana-developers/helpers';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';

dotenv.config();

let user = getKeypairFromEnvironment("SECRET_KEY");

const tokenMintAccount = new PublicKey("7kPmssXZLM69cMtj9GqvT7417D1E9m3zjUGKme9k5tb3");
const connection = new Connection(clusterApiUrl("devnet"));

console.log(user.publicKey.toBase58())
const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMintAccount,
    user.publicKey
)

console.log(`Token Account: ${tokenAccount.address.toBase58()}`);

const link = getExplorerLink(
    "address",
    tokenAccount.address.toBase58(),
    "devnet"
)

console.log(`Created Token Account: ${link}`)