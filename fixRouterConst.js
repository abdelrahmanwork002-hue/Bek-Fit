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
   
   if(content.includes('const navigate = useRouter();') || content.includes('const navigate = useRouter())')) {
       let newContent = content.replace(/const\s+navigate\s*=\s*useRouter\(\)/g, 'const router = useRouter()');
       if (newContent !== content) {
          fs.writeFileSync(file, newContent);
          console.log(`Fixed const router error in: ${file}`);
       }
   }
});
