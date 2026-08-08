import TeamMemberModel from "../models/Team.js";

// Add Team Member

export const addTeamMember = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      role,
      status,
    } = req.body;

    // Check required fields
    if (!name || !email || !phone || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, email, phone and role are required.",
      });
    }

    // Check duplicate email
    const existingMember = await TeamMemberModel.findOne({ email });

    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: "Team member with this email already exists",
      });
    }

    // Check image
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required.",
      });
    }

    // Upload image to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = Cloudinary.uploader.upload_stream(
        {
          folder: "team-members",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve(result);
        }
      );

      streamifier
        .createReadStream(req.file.buffer)
        .pipe(stream);
    });

    // Create team member
    const teamMember = await TeamMemberModel.create({
      name,
      email,
      phone,
      role,
      status,
      image: uploadResult.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "Team member added successfully",
      data: teamMember,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add team member",
      error: error.message,
    });
  }
};

// Get All Team Members
export const getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMemberModel.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: teamMembers.length,
      data: teamMembers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get team members",
      error: error.message,
    });
  }
};

// Get Single Team Member
export const getTeamMemberById = async (req, res) => {
  try {
    const teamMember = await TeamMemberModel.findById(req.params.id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    res.status(200).json({
      success: true,
      data: teamMember,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get team member",
      error: error.message,
    });
  }
};

// Update Team Member
export const updateTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMemberModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Team member updated successfully",
      data: teamMember,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update team member",
      error: error.message,
    });
  }
};

// Delete Team Member
export const deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMemberModel.findByIdAndDelete(
      req.params.id
    );

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Team member deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete team member",
      error: error.message,
    });
  }
};