import "dotenv/config";
import {
  OrbisDB,
  type IEVMProvider,
  type OrbisConnectResult,
} from "@useorbis/db-sdk";
import { OrbisEVMAuth } from "@useorbis/db-sdk/auth";
import { Wallet } from "ethers/wallet";
import { makeInserts } from "./create.js";

export const orbis = new OrbisDB({
  ceramic: {
    gateway: process.env.CERAMIC_NODE_URL,
  },
  nodes: [
    {
      gateway: process.env.ORBIS_INSTANCE_URL,
      env: process.env.ORBIS_ENVIRONMENT,
    },
  ],
});

const provider = new Wallet(process.env.PRIVATE_KEY);
const auth = new OrbisEVMAuth(provider as unknown as IEVMProvider);

// Authenticate, but don't persist the session in localStorage
const authResult: OrbisConnectResult = await orbis.connectUser({
  auth,
  saveSession: false,
});

const localDid = authResult.user.did.toLowerCase();
const orbisEnv = orbis.node.env;
if (localDid !== orbisEnv) {
  console.log("DID mismatch:", { localDid, orbisEnv });
  throw new Error("PRIVATE_KEY DID doesn't match ORBIS_ENVIRONMENT");
}

// TODO: edit create.ts with your model and data
await makeInserts();
