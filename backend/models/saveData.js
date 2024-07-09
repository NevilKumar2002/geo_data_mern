// Import necessary modules
const UserModel = require('../models/userModel'); // Adjust path as per your project structure

// Define the saveData function
const saveData = async (req, res) => {
  const { userId } = req.params;
  const { GeoJSONData } = req.body;

  try {
    // Find user by userId and update GeoJSONData array
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { GeoJSONData: GeoJSONData } },
      { new: true } // Return the updated document
    );

    // Handle case where user is not found
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Send success response with updated user data
    res.status(200).send({ message: "GeoJSON data saved successfully", user });
  } catch (error) {
    // Handle errors
    console.error("Error saving GeoJSON data:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
