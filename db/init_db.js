// code to build and initialize DB goes here
const {
   client,
   createLink,
   getAllLinks,
   getLinkById,
   getLinkByClickCount,
   createTag
} = require("./index");

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
        name varchar(255) UNIQUE NOT NULL
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
    console.log("Creating initial links...");

    await createLink({
      link: "https://www.google.com/",
      clickCount: 5,
      comment: "this is google.com",
      date: "1000-01-01",
    });

    await createLink({
      link: "https://developer.mozilla.org/en-US/",
      clickCount: 10,
      comment: "This is MDN",
      date: "1002-02-02",
    });

    await createLink({
      link: "https://stackoverflow.com/",
      clickCount: 4,
      comment: "This is stackoverflow",
      date: "1003-03-03",
    });
    
    console.log("Finished creating initial links...");

    console.log("Creating initial tags...");

    // await createTag({
    //   tag: "search"
    // })

    console.log("Finished creating initial tags...")
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Starting to test DB...")

    console.log("Running populateInitialData..");
    const initialData = await populateInitialData();
    console.log("Finished populating initial data...");

    // console.log("Running getAllLinks...");
    // const allLinks = await getAllLinks();
    // console.log("Result: ", allLinks);

    // console.log("Running getLinkById...");
    // const linkById = await getLinkById(1);
    // console.log("Result: ", linkById);

    console.log("Running getLinkByClickCount...");
    const linkByClickCount = await getLinkByClickCount(10);
    console.log("Result: ", linkByClickCount);

    console.log("Finished testing DB...")
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
