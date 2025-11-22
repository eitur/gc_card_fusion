const fs = require('fs');
const path = require('path');

// Read from src/, write to root (or docs/)
const template = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');
const outputDir = path.join(__dirname, '..'); // or '../docs' if using docs folder

const configs = [
  { 
    lang: 'en', 
    basePath: '.', 
    output: path.join(outputDir, 'index.html'),
    activeEn: 'active',
    activeKr: '',
    activeBr: ''
  },
  { 
    lang: 'kr', 
    basePath: '..', 
    output: path.join(outputDir, 'kr/index.html'),
    activeEn: '',
    activeKr: 'active',
    activeBr: ''
  },
  { 
    lang: 'br', 
    basePath: '..', 
    output: path.join(outputDir, 'br/index.html'),
    activeEn: '',
    activeKr: '',
    activeBr: 'active'
  }
];

configs.forEach(config => {
  let content = template
    .replace(/\{\{LANG\}\}/g, config.lang)
    .replace(/\{\{BASE_PATH\}\}/g, config.basePath)
    .replace(/\{\{ACTIVE_EN\}\}/g, config.activeEn)
    .replace(/\{\{ACTIVE_KR\}\}/g, config.activeKr)
    .replace(/\{\{ACTIVE_BR\}\}/g, config.activeBr);
  
  const dir = path.dirname(config.output);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(config.output, content);
  console.log(`✓ Generated ${path.relative(outputDir, config.output)}`);
});

console.log('\nBuild complete!');