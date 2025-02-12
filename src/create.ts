import { catchError } from "@useorbis/db-sdk/util";
import { orbis } from "./index.js";

// TODO: set to your model ID from OrbisDB Studio
const METADATA_MAPPING =
  "kjzl6hvfrbw6c5ggst6n2v4xkey99ik4el9ag71e34xclnh7ttyx4bqq8rvbpuw";

// TODO: define the type
type MetadataMapping = {
  researchObjectId: string;
  schemaOrgEntity: string;
  contentJson: string;
};

// TODO: fill with content
const mappings: MetadataMapping[] = [
  {
    researchObjectId:
      "kjzl6kcym7w8y93uqg1vag38ck27w5jawmydgqsu6ky6nj5sf4yspzsrdhbika2",
    schemaOrgEntity: "Review",
    contentJson: JSON.stringify({
      positiveNotes: "Great methodology",
      negativeReview: "Lacks data and code for reproducibility",
    }),
  },
];

// This is called from index.ts, creating the documents defined above
export const makeInserts = async () => {
  const insertStatement = orbis
    .insertBulk(METADATA_MAPPING)
    .values(mappings)
    .context(process.env.ORBIS_CONTEXT);

  const validation = await insertStatement.validate();
  if (validation.valid === false) {
    throw new Error("Errors during validation: " + validation.errors);
  }

  const [result, error] = await catchError(() => insertStatement.run());

  if (error) {
    console.error("Error during insert:", error);
  }

  console.log("Results:", JSON.stringify(result, undefined, 2));
};
