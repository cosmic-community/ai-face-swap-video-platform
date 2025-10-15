const fs = require('fs');
const path = require('path');

const distDir = path.join(process.cwd(), '.next');
const scriptContent = fs.readFileSync(
  path.join(process.cwd(), 'public', 'dashboard-console-capture.js'),
  'utf-8'
);

function injectScript(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (content.includes('dashboard-console-capture')) {
    return;
  }
  
  const scriptTag = `<script>${scriptContent}</script>`;
  content = content.replace('</head>', `${scriptTag}</head>`);
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✓ Injected console capture into ${filePath}`);
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

if (fs.existsSync(distDir)) {
  console.log('Injecting console capture script into built files...');
  walkDir(distDir);
  console.log('✓ Console capture injection complete');
} else {
  console.log('Build directory not found. Skipping injection.');
}