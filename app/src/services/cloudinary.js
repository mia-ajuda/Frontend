import cloudinaryConfig from "../config/cloudinary.json";

export default async function uploadImageCloud(base64) {
  const url = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/image/upload`;
  const base64Image = `data:image/jpg;base64,${base64.photo}`;
  const uploadData = {
    file: base64Image,
    upload_preset: cloudinaryConfig.uploadPreset,
  };

  try {
    const cloudnaryResposeRaw = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(uploadData),
    });
    const cloudnaryResposeRawJSON = await cloudnaryResposeRaw.json();
    return cloudnaryResposeRawJSON.url;
  } catch (error) {
    console.log(error);
  }
}
