const save = require('../../middleware/cloudinary/cloudinary').save;

const handlePhotoUpload = async (files) => {
    if (!files || !files.photos) return []; 

    let photos = Array.isArray(files.photos) ? files.photos : [files.photos];

    const uploadedPhotos = await Promise.all(
        photos.map(file => save(file))
    );

    return uploadedPhotos;
};

module.exports = handlePhotoUpload;
