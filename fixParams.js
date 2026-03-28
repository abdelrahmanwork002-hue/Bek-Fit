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
   
   if(content.includes('useParams()') && !content.includes('useParams } from')) {
       // Find last import line
       const lines = content.split('\n');
       let lastImportIndex = 0;
       for(let i=0; i<lines.length; i++) {
           if(lines[i].startsWith('import ')) {
               lastImportIndex = i;
           }
       }
       lines.splice(lastImportIndex + 1, 0, "import { useParams } from 'next/navigation';");
       fs.writeFileSync(file, lines.join('\n'));
       console.log(`Added useParams to: ${file}`);
   }
});
