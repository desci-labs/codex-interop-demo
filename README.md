# Codex interop demo

This project demonstrates how to extend Codex data on Ceramic, using a remote OrbisDB instance at https://studio.useorbis.com.

## Instructions

### OrbisDB

1. Make sure you have Metamask
2. Visit https://studio.useorbis.com, authenticate, and wait for it to create your indexer.
3. Under `Plugins`, install the CODEX one
4. Check `Data`, you should see the production `research_object` table
5. Under `Model builder`, define a model for something you want to associate with a research object (attestation, review, metadata, etc)

### This project

Perform these steps to create streams for your new model:

1. Run `npm run createEnv` and follow instructions
2. Install deps: `npm ci`
3. Edit `src/create.ts` according to the instructions therein
4. Run `npm start` to publish the content

## Results

- You should be able to see the data indexed by your new model under the Data tab in the studio.
- If you click `Open Editor`, you can query it together with `research_object` using `join`
- This demonstrates how new models can extend the functionality of Codex.
