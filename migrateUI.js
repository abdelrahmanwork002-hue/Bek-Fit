const fs = require('fs');
const path = require('path');

const srcDirV2 = 'd:\\Development Projects\\Bek Fit V1.0\\Proposed Design V2.0\\src';
const srcDirDash = 'd:\\Development Projects\\Bek Fit V1.0\\Proposed Design Dashboard\\src';
const destDir = 'd:\\Development Projects\\Bek Fit V1.0\\web\\src';

// Utility to recursively get files
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

// Ensure directory exists
function ensureDirSync(dirpath) {
  try {
    fs.mkdirSync(dirpath, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}

function transformContent(content, isPage) {
  let newContent = content;

  // React Router to Next.js conversions
  newContent = newContent.replace(/import\s+\{([^}]*?)Link([^}]*?)\}\s+from\s+['"]react-router-dom['"]/g, "import Link from 'next/link'");
  newContent = newContent.replace(/import\s+\{([^}]*?)Link([^}]*?)\}\s+from\s+['"]react-router['"]/g, "import Link from 'next/link'");
  newContent = newContent.replace(/import\s+\{([^}]*?)useNavigate([^}]*?)\}\s+from\s+['"]react-router-dom['"]/g, "import { useRouter } from 'next/navigation'");
  newContent = newContent.replace(/import\s+\{([^}]*?)useNavigate([^}]*?)\}\s+from\s+['"]react-router['"]/g, "import { useRouter } from 'next/navigation'");
  
  newContent = newContent.replace(/<Link([\s\S]*?)to=/g, '<Link$1href=');
  newContent = newContent.replace(/useNavigate\(\)/g, "useRouter()");
  newContent = newContent.replace(/navigate\(/g, "router.push(");
  newContent = newContent.replace(/import\.meta\.env/g, "process.env");

  // Fix deep relative paths to components and context
  newContent = newContent.replace(/from\s+['"](?:\.\.\/|\.\/)+components([^'"]*)['"]/g, "from '@/components$1'");
  newContent = newContent.replace(/from\s+['"](?:\.\.\/|\.\/)+context([^'"]*)['"]/g, "from '@/context$1'");
  newContent = newContent.replace(/from\s+['"](?:\.\.\/|\.\/)+ui([^'"]*)['"]/g, "from '@/components/ui$1'");
  
  // Strip figma module imports
  newContent = newContent.replace(/from\s+['"]figma:asset[^'"]*['"]/g, "from '/Bek Fit Logo.png'");
  newContent = newContent.replace(/src=['"]figma:asset[^'"]*['"]/g, "src='/Bek Fit Logo.png'");

  // Force Client Component directive
  if(!newContent.includes("'use client'") && !newContent.includes('"use client"')) {
    newContent = "'use client';\n" + newContent;
  }

  // Ensure 'export function X' becomes 'export default function X' for pages
  if (isPage) {
     const functionMatch = newContent.match(/export\s+function\s+([A-Z][a-zA-Z0-9_]*)/);
     if (functionMatch) {
       newContent = newContent.replace(functionMatch[0], `export default function ${functionMatch[1]}`);
     }
  }

  return newContent;
}

function migrateV2() {
  // Migrate V2 Pages
  const pagesPath = path.join(srcDirV2, 'app', 'pages');
  if (fs.existsSync(pagesPath)) {
    const pages = getAllFiles(pagesPath);
    pages.forEach(file => {
      if(!file.endsWith('.tsx') && !file.endsWith('.ts')) return;
      
      const fileName = path.basename(file, '.tsx').toLowerCase();
      let routeName = fileName;
      if (routeName === 'landingpage') routeName = ''; 
      if (routeName === 'onboardingflow') routeName = 'onboarding';
      if (routeName === 'routineexecution') routeName = 'routine/[id]';
      if (routeName === 'programcustomization') routeName = 'program';
      
      let destPagePath;
      if (routeName === '') {
        destPagePath = path.join(destDir, 'app', 'page.tsx');
      } else {
        const destRouteDir = path.join(destDir, 'app', routeName);
        ensureDirSync(destRouteDir);
        destPagePath = path.join(destRouteDir, 'page.tsx');
      }
      
      let content = fs.readFileSync(file, 'utf8');
      content = transformContent(content, true);
      
      fs.writeFileSync(destPagePath, content);
      console.log(`Migrated V2 page: ${fileName} -> ${destPagePath}`);
    });
  }

  // Migrate V2 Components
  const compsPath = path.join(srcDirV2, 'app', 'components');
  if (fs.existsSync(compsPath)) {
    const comps = getAllFiles(compsPath);
    const destCompDir = path.join(destDir, 'components');
    ensureDirSync(destCompDir);
    
    comps.forEach(file => {
      if(!file.endsWith('.tsx') && !file.endsWith('.ts')) return;
      const relPath = path.relative(compsPath, file);
      const destPath = path.join(destCompDir, relPath);
      ensureDirSync(path.dirname(destPath));
      let content = fs.readFileSync(file, 'utf8');
      content = transformContent(content, false);
      fs.writeFileSync(destPath, content);
      console.log(`Migrated V2 component logic: ${relPath}`);
    });
  }
}

function migrateDashboard() {
  // Migrate Dashboard Components
  const compsPath = path.join(srcDirDash, 'app', 'components');
  let contentUpdatesApp = '';
  
  if (fs.existsSync(compsPath)) {
    const comps = getAllFiles(compsPath);
    const destCompDir = path.join(destDir, 'components', 'admin');
    ensureDirSync(destCompDir);
    
    comps.forEach(file => {
      if(!file.endsWith('.tsx') && !file.endsWith('.ts')) return;
      const relPath = path.relative(compsPath, file);
      const destPath = path.join(destCompDir, relPath);
      ensureDirSync(path.dirname(destPath));
      let content = fs.readFileSync(file, 'utf8');
      content = transformContent(content, false);
      fs.writeFileSync(destPath, content);
      console.log(`Migrated Dashboard component logic: ${relPath}`);
    });
  }

  // Migrate Dashboard App.tsx into admin/page.tsx
  const appPath = path.join(srcDirDash, 'app', 'App.tsx');
  if(fs.existsSync(appPath)) {
     let content = fs.readFileSync(appPath, 'utf8');
     // Fix imports for components pointing to current folder -> point to @/components/admin
     content = content.replace(/from\s+['"]\.\/components\//g, "from '@/components/admin/");
     content = transformContent(content, true);
     
     // Note: if user accesses dashboard, they go to /admin so this serves as /admin/page.tsx
     const destRouteDir = path.join(destDir, 'app', 'admin');
     ensureDirSync(destRouteDir);
     fs.writeFileSync(path.join(destRouteDir, 'page.tsx'), content);
     console.log(`Migrated Dashboard App.tsx -> app/admin/page.tsx`);
  }
}

function execute() {
  try {
    migrateV2();
    migrateDashboard();
    console.log("Migration complete!");
  } catch(e) {
    console.error(e);
  }
}

execute();
