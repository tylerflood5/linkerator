// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'linkerator-dev'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods

// create link
async function createLink({ link, clickCount, comment, date, tags = [] }) {
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

async function getLinkById(id) {
  try {
    const {
      rows: [link]
    } = await client.query(`
    SELECT * FROM links
    WHERE id=$1
    `, [id]);

    return link;
  } catch (error) {
    throw error;
  }
}

async function getLinkByClickCount(clickCount) {
  try {
    const { 
      rows: [link]
    } = await client.query(`
      SELECT * FROM links
      WHERE "clickCount"=$1;
    `, [clickCount]);

    return link;
  } catch (error) {
    throw error;
  }
}

/**
 * getAllLinks :)
 * getLinkById :)
 * getLinkByClickCount :)
 * getAllTags
 * getTagById
 * 
 */


// create tags
async function createTag(tagList) {
  if (tagList.length === 0) {
    return;
  }

  const valuesStringInsert = tagList.map(
    (_, index) => `$${index + 1}`
  ).join('), (');

  const valuesStringSelect = tagList.map(
    (_, index) => `$${index + 1}`
  ).join(', ');

  try {
    // insert all, ignoring duplicates
    await client.query(`
      INSERT INTO tags(name)
      VALUES (${ valuesStringInsert })
      ON CONFLICT (name) DO NOTHING;
    `, tagList);

    // grab all and return
    const { rows } = await client.query(`
      SELECT * FROM tags
      WHERE name
      IN (${ valuesStringSelect });
    `, tagList);

    return rows;
  } catch (error) {
    throw error;
  }
}

// export
module.exports = {
  client,
  createLink,
  getAllLinks,
  getLinkById,
  getLinkByClickCount
  // createTag
};
