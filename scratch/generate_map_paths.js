const fs = require('fs');
const path = require('path');

const raw = fs.readFileSync(path.join(__dirname, 'states.geojson'), 'utf8');
const data = JSON.parse(raw);

// Standard Australian Albers Equal-Area projection math
// Invert y for SVG (since SVG y increases downwards)
const toRad = Math.PI / 180;
const lon0 = 133.5 * toRad;
const lat0 = -28.0 * toRad;
const lat1 = -18.0 * toRad;
const lat2 = -36.0 * toRad;

const n = 0.5 * (Math.sin(lat1) + Math.sin(lat2));
const c = Math.cos(lat1) * Math.cos(lat1) + 2 * n * Math.sin(lat1);
const rho0 = Math.sqrt(c - 2 * n * Math.sin(lat0)) / n;

function project(lon, lat) {
  const lambda = lon * toRad;
  const phi = lat * toRad;
  const theta = n * (lambda - lon0);
  const v = c - 2 * n * Math.sin(phi);
  const rho = (v > 0 ? Math.sqrt(v) : 0) / n;
  
  const x = rho * Math.sin(theta);
  // Invert y so north is up (lower SVG y) and south is down (higher SVG y)
  const y = -(rho0 - rho * Math.cos(theta));
  return [x, y];
}

// Ramer-Douglas-Peucker simplification algorithm
function getSqSegDist(p, p1, p2) {
  let x = p1[0], y = p1[1], dx = p2[0] - x, dy = p2[1] - y;
  if (dx !== 0 || dy !== 0) {
    const t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
    if (t > 1) {
      x = p2[0];
      y = p2[1];
    } else if (t > 0) {
      x += dx * t;
      y += dy * t;
    }
  }
  dx = p[0] - x;
  dy = p[1] - y;
  return dx * dx + dy * dy;
}

function simplifyDPStep(points, first, last, sqTolerance, simplified) {
  let maxSqDist = sqTolerance;
  let index = -1;

  for (let i = first + 1; i < last; i++) {
    const sqDist = getSqSegDist(points[i], points[first], points[last]);
    if (sqDist > maxSqDist) {
      index = i;
      maxSqDist = sqDist;
    }
  }

  if (index !== -1) {
    if (index - first > 1) simplifyDPStep(points, first, index, sqTolerance, simplified);
    simplified.push(points[index]);
    if (last - index > 1) simplifyDPStep(points, index, last, sqTolerance, simplified);
  }
}

function simplify(points, tolerance) {
  if (points.length <= 2) return points;
  const sqTolerance = tolerance * tolerance;
  const simplified = [points[0]];
  simplifyDPStep(points, 0, points.length - 1, sqTolerance, simplified);
  simplified.push(points[points.length - 1]);
  return simplified;
}

let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
const projectedFeatures = [];

const stateCodeMap = {
  'New South Wales': 'NSW',
  'Victoria': 'VIC',
  'Queensland': 'QLD',
  'South Australia': 'SA',
  'Western Australia': 'WA',
  'Tasmania': 'TAS',
  'Northern Territory': 'NT',
  'Australian Capital Territory': 'ACT'
};

data.features.forEach(f => {
  const name = f.properties.STATE_NAME;
  const code = stateCodeMap[name];
  if (!code) return;

  const geom = f.geometry;
  const polygons = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;

  const projPolys = [];
  polygons.forEach(poly => {
    const projRings = [];
    poly.forEach(ring => {
      const isMainlandOrTas = ring.some(([lon, lat]) => lon >= 112 && lon <= 155 && lat >= -44 && lat <= -9);
      if (!isMainlandOrTas) return;

      const projRing = ring.map(([lon, lat]) => {
        const [x, y] = project(lon, lat);
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        return [x, y];
      });
      if (projRing.length > 2) {
        projRings.push(projRing);
      }
    });
    if (projRings.length > 0) {
      projPolys.push(projRings);
    }
  });

  projectedFeatures.push({ code, name, polygons: projPolys });
});

const svgWidth = 800;
const svgHeight = 650;
const padding = 35;

const scaleX = (svgWidth - padding * 2) / (maxX - minX);
const scaleY = (svgHeight - padding * 2) / (maxY - minY);
const scale = Math.min(scaleX, scaleY);

const offsetX = (svgWidth - (maxX - minX) * scale) / 2 - minX * scale;
const offsetY = (svgHeight - (maxY - minY) * scale) / 2 - minY * scale;

const stateOutput = {};

projectedFeatures.forEach(({ code, name, polygons }) => {
  let sMinX = Infinity, sMaxX = -Infinity, sMinY = Infinity, sMaxY = -Infinity;
  let pathD = '';

  polygons.forEach(poly => {
    poly.forEach(ring => {
      const screenPoints = ring.map(([rx, ry]) => [
        +(rx * scale + offsetX).toFixed(1),
        +(ry * scale + offsetY).toFixed(1)
      ]);

      const simplified = simplify(screenPoints, 0.75);
      if (simplified.length < 3) return;

      let ringD = '';
      simplified.forEach(([sx, sy], idx) => {
        if (sx < sMinX) sMinX = sx;
        if (sx > sMaxX) sMaxX = sx;
        if (sy < sMinY) sMinY = sy;
        if (sy > sMaxY) sMaxY = sy;

        ringD += (idx === 0 ? `M${sx} ${sy}` : `L${sx} ${sy}`);
      });
      pathD += ringD + 'Z ';
    });
  });

  const sWidth = sMaxX - sMinX;
  const sHeight = sMaxY - sMinY;
  const sCenterX = sMinX + sWidth / 2;
  const sCenterY = sMinY + sHeight / 2;

  // Zoom bounding box: ensure comfortable padding around each state
  const zoomPadding = Math.max(45, Math.min(sWidth, sHeight) * 0.18);
  const aspect = svgWidth / svgHeight;
  let targetW = sWidth + zoomPadding * 2;
  let targetH = sHeight + zoomPadding * 2;
  if (targetW / targetH > aspect) {
    targetH = targetW / aspect;
  } else {
    targetW = targetH * aspect;
  }

  // Ensure zoomViewBox stays within sensible bounds
  stateOutput[code] = {
    code,
    name,
    d: pathD.trim(),
    center: [+(sCenterX).toFixed(1), +(sCenterY).toFixed(1)],
    bounds: {
      minX: +sMinX.toFixed(1),
      maxX: +sMaxX.toFixed(1),
      minY: +sMinY.toFixed(1),
      maxY: +sMaxY.toFixed(1),
      width: +sWidth.toFixed(1),
      height: +sHeight.toFixed(1)
    },
    zoomViewBox: [
      +(sCenterX - targetW / 2).toFixed(1),
      +(sCenterY - targetH / 2).toFixed(1),
      +targetW.toFixed(1),
      +targetH.toFixed(1)
    ]
  };
});

const nationalViewBox = [0, 0, svgWidth, svgHeight];

const result = {
  svgWidth,
  svgHeight,
  nationalViewBox,
  states: stateOutput
};

fs.writeFileSync(path.join(__dirname, 'australia_map_data.json'), JSON.stringify(result, null, 2));

// Generate preview HTML
let svgPaths = '';
const stateColors = {
  WA: '#9CAA54',
  NT: '#85B810',
  SA: '#046D2A',
  QLD: '#728C28',
  NSW: '#8AC900',
  VIC: '#046D2A',
  TAS: '#9CAA54',
  ACT: '#1B240E'
};

Object.values(stateOutput).forEach(st => {
  const col = stateColors[st.code] || '#9CAA54';
  svgPaths += `\n  <path id="${st.code}" d="${st.d}" fill="${col}" stroke="#ffffff" stroke-width="1.5" />`;
});

const previewHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #F0F5DF; display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: sans-serif; }
    svg { width: 800px; height: 650px; background: #F0F5DF; border: 1px solid rgba(0,0,0,0.1); border-radius: 16px; }
    path { transition: all 0.3s ease; cursor: pointer; }
    path:hover { filter: brightness(1.15); stroke: #ffffff; stroke-width: 2.5px; }
  </style>
</head>
<body>
  <svg viewBox="0 0 800 650">
    ${svgPaths}
  </svg>
</body>
</html>
`;
fs.writeFileSync(path.join(__dirname, 'preview_map.html'), previewHtml);
console.log('Map paths successfully regenerated with correct SVG orientation!');
