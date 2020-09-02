// code to build and initialize DB goes here
const { client, createLink } = require("./index");

async function createTables() {
  try {
    console.log("Starting to create tables...");

    await client.query(`
      CREATE TABLE links (
        id SERIAL PRIMARY KEY,
        link varchar(255) UNIQUE NOT NULL,
        "clickCount" INTEGER NOT NULL,
        comment TEXT NOT NULL,
        date DATE
      );

      CREATE TABLE tags (
        id SERIAL PRIMARY KEY,
        tags TEXT
      );

      CREATE TABLE link_tags (
        "linkId" INTEGER REFERENCES links(id),
        "tagId" INTEGER REFERENCES tags(id),
        UNIQUE ("linkId", "tagId")
      );
    `);

    console.log("Finished creating tables...");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
      DROP TABLE IF EXISTS link_tags;
      DROP TABLE IF EXISTS tags;
      DROP TABLE IF EXISTS links;
    `);

    console.log("Finished dropping tables...");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    await dropTables();
    // build tables in correct order
    await createTables();
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create meaningful seed data
    await createLink({
      link: "https://www.google.com/",
      clickCount: 5,
      comment: "this is google.com",
      date: "1000-01-01",
    });
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    console.log("creating initial data..");
    await populateInitialData();
  } catch (error) {
    console.error("Error testing database!");
    throw error;
  }
}

buildTables()
  .then(testDB)
  // .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
