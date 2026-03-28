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
   
   if(content.includes('useLocation()')) {
       let newContent = content.replace(/useLocation\(\)/g, "usePathname()");
       newContent = newContent.replace(/location\.pathname/g, "usePathnameVariable"); // temp bypass
       
       // Handle imports
       if(!newContent.includes('usePathname')) {
           const lines = newContent.split('\n');
           let lastImportIndex = 0;
           for(let i=0; i<lines.length; i++) {
               if(lines[i].startsWith('import ')) {
                   lastImportIndex = i;
               }
           }
           lines.splice(lastImportIndex + 1, 0, "import { usePathname } from 'next/navigation';");
           newContent = lines.join('\n');
       } else if (newContent.includes('import { usePathname }') === false && newContent.includes('usePathname } from')) {
           // already imported implicitly if it existed, but we just check if it's there
       }
       
       // Fix references
       newContent = newContent.replace(/const\s+location\s*=\s*usePathname\(\)/g, "const pathname = usePathname();");
       newContent = newContent.replace(/location\.pathname/g, "pathname");
       newContent = newContent.replace(/usePathnameVariable/g, "pathname");
       
       fs.writeFileSync(file, newContent);
       console.log(`Fixed useLocation in: ${file}`);
   }
});
