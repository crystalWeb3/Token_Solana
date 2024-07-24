import { createMint } from '@solana/spl-token';
import {getExplorerLink, getKeypairFromEnvironment} from '@solana-developers/helpers'
import dotenv from 'dotenv';
import * as web3 from '@solana/web3.js'

dotenv.config();
const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

let user = getKeypairFromEnvironment("SECRET_KEY");

console.log(`User key lorded ${user.publicKey.toBase58()}`);

const tokenMint =  await createMint(connection, user, user.publicKey, null, 2);
console.log(tokenMint.toString())

const link = getExplorerLink("address", tokenMint.toString(), "devnet");

console.log(`Created Token Mint : ${link}`);