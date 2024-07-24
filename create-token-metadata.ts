import dotenv from 'dotenv';
import { getExplorerLink, getKeypairFromEnvironment } from '@solana-developers/helpers';

dotenv.config();
import * as web3 from '@solana/web3.js'
import { createCreateMetadataAccountV3Instruction } from '@metaplex-foundation/mpl-token-metadata';

let user = getKeypairFromEnvironment("SECRET_KEY");
console.log(`User successfully loaded ${user.publicKey.toBase58()}`);

const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
)

const tokenMintAccount = new web3.PublicKey("7kPmssXZLM69cMtj9GqvT7417D1E9m3zjUGKme9k5tb3");

const metadataData = {
    name: "Brandon Lim Token",
    symbol: "TRAINING",
    uri: "https://arweave.net/1234",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null
}

console.log(Buffer.from("metadata"));
console.log(TOKEN_METADATA_PROGRAM_ID.toBuffer());
console.log(tokenMintAccount.toBuffer());

const metadataPDAAndBump = web3.PublicKey.findProgramAddressSync(
    [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        tokenMintAccount.toBuffer()
    ],
    TOKEN_METADATA_PROGRAM_ID
)
const metadataPDA = metadataPDAAndBump[0];
console.log(metadataPDA.toString())

const transaction = new web3.Transaction();
const createMetadataAccountInstruction = 
    createCreateMetadataAccountV3Instruction(
        {
            metadata: metadataPDA,
            mint: tokenMintAccount,
            mintAuthority: user.publicKey,
            payer: user.publicKey,
            updateAuthority: user.publicKey
        },
        {
            createMetadataAccountArgsV3: {
                collectionDetails: null,
                data: metadataData,
                isMutable: true
            }
        }
    )


transaction.add(createMetadataAccountInstruction);

const transactionSignature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [user]
);
const transactionLink = getExplorerLink(
    "transaction",
    transactionSignature,
    "devnet",
)

console.log(`Transaction Confirmed, explorer link is ${transactionLink}`);

const tokenMintLink = getExplorerLink(
    "address",
    tokenMintAccount.toString(),
    "devnet",
)

console.log(`Look at the token mint account ${tokenMintLink}`);