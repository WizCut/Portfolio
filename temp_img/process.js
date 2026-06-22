const { Jimp } = require('jimp');

async function processImage() {
  const imagePath = '../public/images/custom_icons/claude-color.png';
  
  // Read the original image that the user just provided
  const original = await Jimp.read(imagePath);
  
  // Create a new solid white image of the same size
  const background = new Jimp({ width: original.width, height: original.height, color: '#ffffff' });
  
  // Composite the original image over the white background
  background.composite(original, 0, 0);
  
  // Save it back to the same file
  await background.write(imagePath);
  console.log("Added solid white background successfully.");
}

processImage().catch(console.error);
