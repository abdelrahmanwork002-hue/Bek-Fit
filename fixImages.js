const fs = require('fs');
const path = require('path');

const srcDir = 'd:\\Development Projects\\Bek Fit V1.0\\web\\src';

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });
  return arrayOfFiles;
}

const files = getAllFiles(srcDir);
files.forEach(file => {
   if(!file.endsWith('.tsx') && !file.endsWith('.ts')) return;
   let content = fs.readFileSync(file, 'utf8');
   let original = content;
   
   // Replace `import Icon from '/Bek Fit Logo.png'` with `const Icon = '/Bek Fit Logo.png'`
   content = content.replace(/import\s+(\w+)\s+from\s+['"]\/Bek Fit Logo\.png['"]/g, "const $1 = '/Bek Fit Logo.png';");
   
   if(content !== original) {
       fs.writeFileSync(file, content);
       console.log(`Fixed images in: ${file}`)
   }
});
