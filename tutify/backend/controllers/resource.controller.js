const Resource = require('../models/models').Resource;

// this method fetches all available resources in our database
exports.getResources = async function (req, res) {
    Resource.find((err, data) => {
        if (err) {
        console.error("The resources were not found");
        return res.json({ success: false, error: err });
        }
        console.info("The resources were found");
        return res.json({ success: true, data: data });
    });
};

// this method adds a new resource to the db
exports.addResource = async function (req, res) {
  const { title, description, image, link, category, educationLevel } = req.body;

  // new resource to add 
  let resource = new Resource();
  resource.title = title;
  resource.description = description;
  resource.image = image;
  resource.link = link;
  resource.category = category;
  resource.educationLevel = educationLevel;

  resource.save(function (err, resource) {
    if (err) {
      console.error("The resource couldn't get added to the database (API request failed)");
      return res.json({ success: false, error: err });
    }
    console.info("The resource was successfully added to the database");
    return res.json({ success: true, course: resource });
  });
};
