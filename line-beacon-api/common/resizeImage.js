// const imagemin = require("imagemin");
// const imagemin_Png = require("imagemin-pngquant");
// const imagemin_Mozjpeg = require("imagemin-mozjpeg");

// const bufferResize = async (buffer) => {
//   const imageminPlugins = {
//     plugins: [
//       imagemin_Png({
//         quality: [0.6, 0.8],
//       }),
//       imagemin_Mozjpeg({
//         quality: 30,
//       }),
//     ],
//   };
//   await imagemin.buffer(buffer, imageminPlugins);
//   console.log("buffer", buffer);
//   console.log("resizebuffer", imageminPlugins);
// };
// module.exports = bufferResize;
