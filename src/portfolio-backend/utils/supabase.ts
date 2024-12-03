import supabase from '../../@rsaw409/supabase';
import { decode } from 'base64-arraybuffer';

const uploadFileToSupabse = async (url: string, file: Express.Multer.File) => {
  const fileBase64 = decode(file.buffer.toString('base64'));

  await supabase.storage.from('portfolio_images').upload(url, fileBase64, {
    contentType: file.mimetype,
  });
};

const deleteFileFromSupabase = async (prefix: string) => {
  const { data: list } = await supabase.storage
    .from('portfolio_images')
    .list(prefix);
  const filesToRemove = list.map((x) => `${prefix}/${x.name}`);

  await supabase.storage.from('portfolio_images').remove(filesToRemove);
};

export { uploadFileToSupabse, deleteFileFromSupabase };
