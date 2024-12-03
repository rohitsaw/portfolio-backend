import { fileTypeFromBuffer } from 'file-type';
import logger from '../../@rsaw409/logger.js';

const whitelist = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

const fileValidation = async (req, res, next) => {
  try {
    if (!req.file) {
      logger.info('No file found.');
      return next();
    }
    const meta = await fileTypeFromBuffer(req.file.buffer);

    if (!whitelist.includes(meta.mime)) {
      throw new Error('This is not valid image file.');
    } else {
      return next();
    }
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

export { fileValidation, whitelist };
