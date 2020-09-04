// Connect to DB
const { Client } = require("pg");
const DB_NAME = "linkerator-dev";
const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL);

// database methods

// create link
async function createLink({ link, clickCount, comment, date, tags = [] }) {
  try {
    const {
      rows: [links],
    } = await client.query(
      `
        INSERT INTO links (link, "clickCount", comment, date)
        VALUES($1, $2, $3, $4)
        ON CONFLICT (link) DO NOTHING
        RETURNING *;
      `,
      [link, clickCount, comment, date]
    );
    const tagList = await createTags(tags);
    // console.log("tagList HERE: ", tagList);
    return await addTagsToLink(links.id, tagList);
    // return links;
  } catch (error) {
    throw error;
  }
}

// getAllLinks :)
async function getAllLinks() {
  try {
    const { rows } = await client.query(`
      SELECT * FROM links;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

// getLinkById :)
async function getLinkById(id) {
  try {
    const {
      rows: [link],
    } = await client.query(
      `
    SELECT * FROM links
    WHERE id=$1
    `,
      [id]
    );

    return link;
  } catch (error) {
    throw error;
  }
}

// getLinkByClickCount :)
async function getLinkByClickCount(clickCount) {
  try {
    const {
      rows: [link],
    } = await client.query(
      `
      SELECT * FROM links
      WHERE "clickCount"=$1;
    `,
      [clickCount]
    );

    return link;
  } catch (error) {
    throw error;
  }
}

// create tags
async function createTags(tagList) {
  if (tagList.length === 0) {
    return;
  }

  const valuesStringInsert = tagList
    .map((_, index) => `$${index + 1}`)
    .join("), (");

  const valuesStringSelect = tagList
    .map((_, index) => `$${index + 1}`)
    .join(", ");

  try {
    // insert all, ignoring duplicates
    await client.query(
      `
      INSERT INTO tags(name)
      VALUES (${valuesStringInsert})
      ON CONFLICT (name) DO NOTHING;
    `,
      tagList
    );

    // grab all and return
    const { rows } = await client.query(
      `
      SELECT * FROM tags
      WHERE name
      IN (${valuesStringSelect});
    `,
      tagList
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function createLinkTag(linkId, tagId) {
  try {
    await client.query(
      `
      INSERT INTO link_tags("linkId", "tagId")
      VALUES ($1, $2)
      ON CONFLICT ("linkId", "tagId") DO NOTHING;
      `,
      [linkId, tagId]
    );
  } catch (error) {
    throw error;
  }
}

async function addTagsToLink(linkId, tagList) {
  try {
    const createLinkTagPromises = tagList.map((tag) =>
      createLinkTag(linkId, tag.id)
    );

    await Promise.all(createLinkTagPromises);

    return await getLinkById(linkId);
  } catch (error) {
    throw error;
  }
}

async function getAllTags() {
  try {
    const { rows } = await client.query(`
      SELECT * 
      FROM tags;
    `);

    return { rows };
  } catch (error) {
    throw error;
  }
}

///// Todo Items /////
// do we need anything querying link_tags table?

module.exports = {
  client,
  createLink,
  getAllLinks,
  getLinkById,
  getLinkByClickCount,
  addTagsToLink,
  createLinkTag,
  getAllTags,
};
