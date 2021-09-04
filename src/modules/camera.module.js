
const camera = {
  init() {
    return new Promise((resolve, reject) => {
      if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia))
        return reject(new Error('Unsupported'));

      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => resolve(stream))
        .catch((err) => reject(err));
    });
  }
};

  export default camera;
  export const init = camera.init;
