const Achievement = require("../models/Achievement"); // ← THIS LINE IS MISSING

const deleteAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);

    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    res.json({ message: "Achievement deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { deleteAchievement };