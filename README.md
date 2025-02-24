# Codex interop demo

This project demonstrates how to extend Codex data on Ceramic, using a remote OrbisDB instance at https://studio.useorbis.com.

## Prerequisites
- functional code editor
- NodeJS >20
- git
- Metamask browser extension

## Instructions

Clone this repo with `git clone https://github.com/desci-labs/codex-interop-demo.git`,
then follow the instructions below.

### OrbisDB

1. Make sure you have the Metamask extension in your browser.
2. Visit https://studio.useorbis.com, authenticate, and wait for it to create your indexer.
3. Under `Plugins`, install the CODEX one.
4. Check `Data`, you should see the production `research_object` table.
5. Under `Model builder`, define a model for something you want to associate with a research object (attestation, review, metadata, etc).

### This project

First, you need to set two local configuration values by running `npm run createEnv`. It will prompt your for two things:
- The environment ID from the `Contexts` page in Orbis Studio.
- The private key from your wallet.
  - Used to sign the data published to Ceramic.
  - It never leaves your computer.

Note: if the script isn't playing nice, you can copy `.env.example` to `.env` and fill it manually 💡


Then, perform these steps to create streams for your new model:
1. Install deps: `npm ci`.
2. Edit `src/create.ts` carefully, *according to the instructions therein*.
3. Run `npm start` to publish data instances of your newly created model.

## Results

- You should be able to see the data indexed by your new model under the Data tab in the studio.
- If you click `Open Editor`, you can query it together with `research_object` using SQL
  - If you click `Manage relations` on your table and fill in the values, you can use GraphQL too!
- This demonstrates how new models can extend the functionality of Codex.

Example query:
```sql
select * from kjzl6hvfrbw6c89rybe6ua17b3qxbqlmon84k2kcqvc7z2a6u81jci25mcj1azy md
left join kjzl6hvfrbw6cbe01it6hlcwopsv4cqrqysho4f1xd7rtqxew9yag3x2wxczhz0 ro
on md."researchObjectId" = ro.stream_id;
```
