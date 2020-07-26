/*Cloudinary documentation for media upload via api: https://cloudinary.com/documentation/upload_images#uploading_with_a_direct_call_to_the_rest_api
Check "Required parameters for unauthenticated requests" session
You will need to enable upload_preset inside the Management Console (Settings) -> Upload tab -> Upload presets*/

export const FileUpload = async (file) => {
    let result = null;

    let formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`);

    await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
    })
        .then((response) => response.json())
        .then((data) => {
            result = data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    return result;
}


