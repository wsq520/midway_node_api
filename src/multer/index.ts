import { Multer } from 'multer';
import * as multer from 'multer';
import * as fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationFolder = '/path/to/destination/folder'; // 设置目标文件夹路径
    cb(null, destinationFolder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // 使用原始文件名作为存储文件名
  },
});

export const upload: Multer = multer({ storage });

export const saveFileToDestination = (
  sourcePath: string,
  destinationPath: string
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    // const readStream = fs.createReadStream(sourcePath);
    // const writeStream = fs.createWriteStream(destinationPath);

    // readStream.pipe(writeStream).on('finish', resolve).on('error', reject);
    fs.rename(sourcePath, destinationPath, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
