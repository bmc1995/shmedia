// const { MongoClient } = require("mongodb");

// const commentSchema = require("./commentSchema.json").commentSchema;
// const userSchema = require("./userSchema.json").userSchema;
// const postSchema = require("./postSchema.json").postSchema;
// async function mongoSchemaInit() {
//   const client = await MongoClient.connect(uri);
//   try {
//     client.db("shmedia").createCollection(
//       "users",
//       {
//         validator: userSchema,
//       },
//       (_, result) => console.log(result)
//     );

//     client.db("shmedia").createCollection(
//       "uploads",
//       {
//         validator: postSchema,
//       },
//       (_, result) => console.log(result)
//     );

//     client.db("shmedia").createCollection(
//       "comments",
//       {
//         validator: commentSchema,
//       },
//       (_, result) => console.log(result)
//     );
//   } catch (e) {
//     console.error(e);
//   } finally {
//     client.close();
//   }
// }
// mongoSchemaInit();
