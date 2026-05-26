const ImageKit = require("imagekit");

let storageInstance = new ImageKit({
  urlEndpoint: "https://ik.imagekit.io/a1spliwbn",
  privateKey: "private_h0ngpbp8/eMis50QJ9JPuOrUYhY=",
  publicKey: "public_sIG6WT0IDZVcloqpNOfF1o9Mzw8=",
});

let sendFiles = async (file, fileName) => {
  let options = {
    file,
    fileName,
  };
  return await storageInstance.upload(options);
};

module.exports = sendFiles;
