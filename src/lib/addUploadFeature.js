// in addUploadFeature.js
/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertFileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.rawFile);

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

/**
 * For update only, convert uploaded image in base 64 and attach it to
 * the `data.key` sent property, with `src` and `title` attributes.
 */
const addUploadFeature = requestHandler => async (type, resource, params) => {
  if (type === 'UPDATE') {
    await Promise.all(Object.keys(params.data).map(async key => {
        let value = params.data[key]
        if(value && value.rawFile && (value.rawFile instanceof File)) {
          params.data[key] = {
            src: await convertFileToBase64(value),
            filename: value.title
          }
        }
    }))
  }
  return await requestHandler(type, resource, params)
}

export default addUploadFeature;
