// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'linkerator-dev'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods

// create link
async function createLink({ link, clickCount, comment, date }) {
  try {
    const {
      rows: [links],
    } = await client.query(
      `
        INSERT INTO links(link, "clickCount", comment, date)
        VALUES($1, $2, $3, $4)
        ON CONFLICT (link) DO NOTHING
        RETURNING *;
      `,
      [link, clickCount, comment, date]
    );
    console.log(links);
    return links;
  } catch (error) {
    throw error;
  }
}

// create tags
// async function createTag({tag}) {
//   try {
//     const {
//       rows: [tags],
//     } = await client.query(
//       `
//         INSERT INTO tags(tag)
//         VALUES ($1)
//         ON CONFLICT (tags) DO NOTHING
//         RETURNING *;
//       `,
//       [tag]
//     )
//     console.log(tags);
//     return tags;
//   } catch (error) {
//     throw error;
//   }
// }

// export
module.exports = {
  client,
  createLink,
  // createTag
};
