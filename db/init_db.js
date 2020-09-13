// code to build and initialize DB goes here
const {
  client,
  createLink,
  getAllLinks,
  getAllLinksAndTags,
  getLinkById,
  getLinkByClickCount,
  updateLink,
  createTag,
  getAllTags,
  getLinksByTagName,
  getLinksByQuery
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
      link: "https://api.jquery.com/",
      clickCount: 5,
      comment: "JQuery documentation",
      date: "2020-09-15",
      tags: ["$", "JQUERY", "this"],
    });

    await createLink({
      link: "https://developer.mozilla.org/en-US/",
      clickCount: 10,
      comment: "This is MDN",
      date: "2020-07-29",
      tags: ["developer", "MDN", "Mozilla"],
    });

    await createLink({
      link: "https://stackoverflow.com/",
      clickCount: 4,
      comment: "the one stop shop for programmers",
      date: "2020-08-01",
      tags: ["stackoverflow", "fullstack"],
    });

    await createLink({
      link: "https://reactjs.org/",
      clickCount: 1,
      comment: "only show me the differences",
      date: "2020-06-15",
      tags: ["REACT", "framework"],
    });

    console.log("Finished creating initial links...");
  } catch (error) {
    throw error;
  }
}

async function testDB() {
  try {
    console.log("Starting to test DB...");

    console.log("Running populateInitialData..");
    const initialData = await populateInitialData();
    console.log("Finished populating initial data...");

    // console.log("Running getAllLinks...");
    // const allLinks = await getAllLinks();
    // console.log("Result: ", allLinks);

    console.log("Running getAllLinksAndTags...");
    const fullLinks = await getAllLinksAndTags();
    console.log("Result: ", fullLinks);

    // console.log("Running getLinkById...");
    // const linkById = await getLinkById(1);
    // console.log("Result: ", linkById);

    // console.log("Running getLinkByClickCount...");
    // const linkByClickCount = await getLinkByClickCount(10);
    // console.log("Result: ", linkByClickCount);

    // console.log("Running getAllTags");
    // const allTags = await getAllTags();
    // console.log("allTags: ", allTags);

    // console.log("Running getLinksByTagName...");
    // const linksByTagName = await getLinksByTagName('MDN');
    // console.log("Result:", linksByTagName);

    // console.log("Running updateLink...");
    // const updatedLink = await updateLink(4, {
    //   link: "https://www.youtube.com/",
    //   clickCount: "20",
    // });
    // console.log("Result:", updatedLink);

    console.log("Running get link by query...");
    const queryLinks = await getLinksByQuery("react")
    console.log("Result:", queryLinks)

    console.log("Finished testing DB...");
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
