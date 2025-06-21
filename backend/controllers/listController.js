import listModel from '../models/listModel.js';
import cloudinary from '../config/cloudinary.js';

const streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) resolve(result);
      else reject(error);
    });
    stream.end(buffer);
  });
};

export const addItem = async (req, res) => {
  try {
    const { name, type, description } = req.body;
    const userId = req.userId;

    // Upload cover image if exists
    let coverUpload = null;
    if (req.files.coverImage?.length) {
      coverUpload = await streamUpload(req.files.coverImage[0].buffer);
    }

    // Upload additional images if any
    const additionalUploads = [];
    if (req.files.additionalImages?.length) {
      for (const file of req.files.additionalImages) {
        const result = await streamUpload(file.buffer);
        additionalUploads.push(result);
      }
    }

    const newItem = await listModel.create({
      name,
      type,
      description,
      user: userId,
      coverImage: coverUpload?.secure_url || null,
      additionalImages: additionalUploads.map(img => img.secure_url),
    });

    res.status(201).json({ success: true, item: newItem });
  } catch (err) {
    console.error('Add item error:', err);
    res.status(500).json({ success: false, message: 'Failed to add item' });
  }
};

export const getItemsByUser = async (req, res) => {
  try {
    const items = await listModel.find({ user: req.userId });
    res.status(200).json({ success: true, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error fetching items' });
  }
};
