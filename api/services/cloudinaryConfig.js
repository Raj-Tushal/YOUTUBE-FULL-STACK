import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: "dvrzxxvee",
    api_key: 374241874616284,
    api_secret: "r7jEXXZjU-2USbtl4WwNEaI2hd8",
})

export async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return {
    url: res.secure_url,
    public_id: res.public_id,};
}

  export default handleUpload;