const fs = require('fs');
const path = require('path');

const geojsonPath = path.join(__dirname, 'states.geojson');
const raw = fs.readFileSync(geojsonPath, 'utf8');
const data = JSON.parse(raw);

// Check feature properties
console.log('Features count:', data.features.length);
data.features.forEach(f => {
  console.log('Feature properties:', f.properties);
});
