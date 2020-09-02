// Connect to DB
const { Client } = require("pg");
const DB_NAME = "linkerator-dev";
const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
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
    return links;
  } catch (error) {
    throw console.error();
  }
}

// create tags

// export
module.exports = {
  client,
  createLink,
};
