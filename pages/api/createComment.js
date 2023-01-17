// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  token: process.env.SANITY_API_TOKEN,
  useCdn: process.env.NODE_ENV === "production",
};
const sanityClient = require("@sanity/client");

const client = sanityClient(config);
export default async function createComment(req, res) {
  const { _id, name, email, comment } = JSON.parse(req.body);
  try {
    await client.create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: _id,
      },
      name,
      email,
      comment,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ name: "couldn't submit comment", err });
  }
  console.log("done");
  res.status(200).json({ name: "comment submited" });
}
