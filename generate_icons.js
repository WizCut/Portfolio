const simpleIcons = require('simple-icons');
const fs = require('fs');

const tools = {
  aftereffects: 'Adobe After Effects',
  premierepro: 'Adobe Premiere Pro',
  davinciresolve: 'DaVinci Resolve',
  capcut: 'CapCut',
  claude: 'Anthropic',
  openai: 'OpenAI',
  midjourney: 'Midjourney'
};

Object.entries(tools).forEach(([slug, title]) => {
  const icon = Object.values(simpleIcons).find(i => i.title.toLowerCase() === title.toLowerCase());
  if (icon) {
    fs.writeFileSync(`public/images/new_icons/${slug}.svg`, icon.svg);
    console.log(`Saved ${slug}.svg`);
  } else {
    console.log(`Not found: ${title}`);
  }
});
