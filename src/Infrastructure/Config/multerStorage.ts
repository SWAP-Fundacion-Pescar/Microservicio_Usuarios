import multer from 'multer';
const storage = multer.memoryStorage(); // Using memory storage to avoid saving files locally

const upload = multer({ storage: storage });

export default upload;