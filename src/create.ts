import { catchError } from "@useorbis/db-sdk/util";
import { orbis } from "./index.js";

/**
 * WARN: READ ME FIRST!
 *
 * This file helps you create data instances of the model you created in
 * Orbis Studio. The example below illustrates how one could structure a
 * (basic) representation of a public peer review.
 *
 * Follow the instructions in the TODO comments to adapt it to *your* model.
*/

/**
 * TODO: replace with the ID of the model you created in Orbis Studio
*/
const MY_MODEL_ID = "kjzl6hvfrbw6c5ggst6n2v4xkey99ik4el9ag71e34xclnh7ttyx4bqq8rvbpuw";

/**
 * TODO: replace fields so it matches the properties from the model you
 * created in Orbis Studio
*/
type MyModel = {
  researchObjectId: string;
  schemaOrgEntity: string;
  contentJson: string;
};

/**
 * TODO: replace with content matching the model you defined.
 * ALSO: pick some random stream_id to use for researchObjectId.
 *
 * Optionally, add more objects to create multiple at the same time.
 *
 * When this is done, you can run `npm start` 🎊
*/
const mappings: MyModel[] = [
  {
    researchObjectId: "kjzl6kcym7w8y93uqg1vag38ck27w5jawmydgqsu6ky6nj5sf4yspzsrdhbika2",
    schemaOrgEntity: "Review",
    contentJson: JSON.stringify({
      positiveNotes: "Great methodology",
      negativeReview: "Lacks data and code for reproducibility",
    }),
  }
];

/**
 * This is automatically called when running `npm start`/`index.ts`,
 * creating the data instances you defined defined above
*/
export const makeInserts = async () => {
  const insertStatement = orbis
    .insertBulk(MY_MODEL_ID)
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
}


