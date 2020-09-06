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
});

// almost done with post function but need debug help
apiRouter.post("/", async (req, res, next) => {
  const { link, clickCount, comment, date, tags = "" } = req.body;

  const tagArr = tags.trim().split(/\s+/)
  const linkData = {};

  if (tagArr.length) {
    linkData.tags = tagArr;
  }

  try {
    linkData.link = link;
    linkData.clickCount = clickCount;
    linkData.comment = comment;
    linkData.date = date;
    // console.log(linkData, 'link data flag')

    const createdLink = await createLink(linkData);

    if (createdLink) {
      console.log(createLink)
      res.send(createLink);
    } else {
      console.log('else error flag')
      next({
        name: "LinkCreationError",
        message: "There was an error creating the link. Please try again."
      })
    }
  } catch ({name, message}) {
    next({name, message});
  }
});

// apiRouter.delete("/:linkId", async (req, res, next) => {
//   try {
//     const link = await getLinkById(req.params.linkId);

//     if (link) {

//     }
    
//   } catch ({name, message}) {
//     next({name, message});
//   }
// });

module.exports = apiRouter;
