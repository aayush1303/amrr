import listModel from '../models/listModel.js';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Add Item Controller
export const addItem = async (req, res) => {
  try {
    const { name, type, description } = req.body;
    const userId = req.userId;

    const coverImageFile = req.files.coverImage?.[0];
    const coverUpload = await cloudinary.v2.uploader.upload(coverImageFile.path);

    const additionalUploads = await Promise.all(
      (req.files.additionalImages || []).map(file =>
        cloudinary.v2.uploader.upload(file.path)
      )
    );

    const newItem = await listModel.create({
      name,
      type,
      description,
      user: userId,
      coverImage: coverUpload.secure_url,
      additionalImages: additionalUploads.map(img => img.secure_url),
    });

    res.status(201).json({ success: true, item: newItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to add item' });
  }
};

// Get All Items by logged-in User
export const getItemsByUser = async (req, res) => {
  try {
    const items = await listModel.find({ user: req.userId });
    res.status(200).json({ success: true, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error fetching items' });
  }
};
