import Result from "../models/Result.js";

const getAllResults = async (req, res) => {
  const { userId } = req.user._id;
  const results = await Result.find({ userId }).sort({ createdAt: -1 });
  res.status(200).json(results);
};

export{
    getAllResults
}
