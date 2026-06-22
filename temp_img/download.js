const https = require('https');
const fs = require('fs');

const url = 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/claude-ai-icon.png';
const dest = '../public/images/custom_icons/claude-color.png';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  if (res.statusCode !== 200) {
    console.error(`Failed to download: ${res.statusCode}`);
    return;
  }
  const file = fs.createWriteStream(dest);
  res.pipe(file);
  file.on('finish', () => {
    file.close(() => console.log('Downloaded successfully.'));
  });
}).on('error', (err) => {
  console.error(`Error: ${err.message}`);
});
