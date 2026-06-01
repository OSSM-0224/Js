import ListModel from "../models/list.models.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
/**
 * @description Create a new note need title and description in the request body
 * @access Public
 * **/
const createListController = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    throw new ApiError(400, "Title and Description are REQUIRED");
  }
  if (title.trim().length < 4) {
    throw new ApiError(400, "Title has to be till 4 letters");
  }
  if (description.trim().length < 10) {
    throw new ApiError(400, "Description has to be 10 letters long");
  }
  const newList = await ListModel.create({
    title,
    description,
  });

  return res
    .status(201)
    .json(new ApiResponse("List Created Succesfully", newList));
});

const getAllListController = asyncHandler(async (req, res) => {
  const lists = await ListModel.find();

  return res
    .status(200)
    .json(new ApiResponse("Lists fetched Sucessfully", lists));
});


export { createListController, getAllListController };
