const fs = require('fs');
const { resolve } = require('path');

const routesFolder = resolve('./routes');

function camelCaseToDash(myStr) {
  return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// HELPER FUNCTION TO GET ALL ROUTES PATH
const getAllRoutesPath = () => {
  const allRoutesPath = [];

  fs.readdirSync(routesFolder).forEach((file) => {
    const fullPath = `${routesFolder}/${file}`;
    if (fs.existsSync(fullPath) && fullPath.endsWith('.route.js')) {
      allRoutesPath.push({
        fullPath: fullPath.replace('.js', ''),
        fileName: file.replace('.route.js', ''),
      });
    }
  });
  return allRoutesPath;
};

// MAIN FUNCTION TO REGISTER ALL ROUTES
const registerRoutes = (expressInstance) => {
  const allRoutesPath = getAllRoutesPath();
  // LOAD ALL NESTED ROUTES FILE
  // eslint-disable-next-line no-restricted-syntax
  for (const routeFile of allRoutesPath) {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const router = require(routeFile.fullPath);
    expressInstance.use(`/api/${camelCaseToDash(routeFile.fileName)}`, router);
  }
};

module.exports = {
  registerRoutes,
};
