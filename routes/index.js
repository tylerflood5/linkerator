const apiRouter = require('express').Router();

const {
  createLink,
  getAllLinks,
  getLinkById,
  getLinkByClickCount,
  addTagstoLink,
  createLinkTag,
  getAllTags,
  getLinksByTagName
} = require("../db");

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!"
  });
});

apiRouter.get("/links", async (req, res, next) => {
  try {
    const allLinks = await getAllLinks();

    res.send(allLinks);

  } catch ({name, message}) {
    next({name, message});
  }
});

apiRouter.get("/tags", async (req, res, next) => {
  try {
    const allTags = await getAllTags();

    res.send(allTags);

  } catch ({name, message}) {
    next({name, message});
  }
});

apiRouter.get("/:tagName/links", async (req, res, next) => {
  try {
    const { tagName } = req.params;

    const linksByTagName = await getLinksByTagName(tagName);

    res.send({linksByTagName});
  } catch ({name, message}) {
    next({name, message})
  }
})

module.exports = apiRouter;
