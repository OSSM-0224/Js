const ListModel = require("../models/list.models");

let createListController = async (req, res) => {
  try {
    let { name, description } = req.body;

    if (!name || !description)
      return res.status(400).json({
        message: "All fields are required",
      });

    let newList = await ListModel.create({
      taskName: name,
      description,
    });

    return res.status(201).json({
      message: "List is created",
      list: newList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

let getAllListsController = async (req, res) => {
  try {
    let allLists = await ListModel.find();

    return res.status(200).json({
      message: "List fetched sucessfully",
      list: allLists,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

let updateListController = async (req, res) => {
  try {
    let listId = req.params.id;
    if (!listId)
      return res.status(404).json({
        message: "Id not found please re-enter the id",
      });

    let { name, description } = req.body;

    if (!name || !description)
      return res.status(400).json({
        message: "Name and description are required",
      });

    let updateList = await ListModel.findByIdAndUpdate(
      listId,
      {
        taskName: name,
        description,
      },
      {
        name: true,
      },
    );
    return res.status(200).json({
      message: "List Updated sucessfully",
      list: updateList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

let deleteListController = async (req, res) => {
  try {
    let listId = req.params.id;
    if (!listId)
      return res.status(404).json({
        message: "Id not found please re-enter the id",
      });

    await ListModel.findByIdAndDelete(listId);

    return res.status(200).json({
      message: "List Deleted sucessfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
module.exports = {
  createListController,
  getAllListsController,
  updateListController,
  deleteListController,
};
