import { useMemo } from 'react';

function GeometricBackground() {
  const backgroundImage = useMemo(() => {
    const size = 400;
    const hue = Math.floor(Math.random() * 360);
    const sat = Math.floor(Math.random() * 15) + 10;
    let svg = `<svg width='${size}' height='${size}' xmlns='http://www.w3.org/2000/svg'>`;
    
    const baseColor = `hsl(${hue}, ${sat}%, 82%)`;
    svg += `<rect width='${size}' height='${size}' fill='${baseColor}'/>`;
    
    const grid = 5;
    const cellSize = size / grid;
    
    for (let row = 0; row < grid; row++) {
      for (let col = 0; col < grid; col++) {
        if (Math.random() < 0.4) continue;
        
        const x = col * cellSize;
        const y = row * cellSize;
        const type = Math.floor(Math.random() * 8);
        const lightness = Math.floor(Math.random() * 25) + 68;
        const color = `hsl(${(hue + (row + col) * 8) % 360}, ${sat + Math.random() * 12}%, ${lightness}%)`;
        const opacity = (Math.random() * 0.3 + 0.7).toFixed(2);
        
        if (type === 0) {
          svg += `<rect x='${x}' y='${y}' width='${cellSize}' height='${cellSize}' fill='${color}' opacity='${opacity}'/>`;
        } else if (type === 1) {
          svg += `<circle cx='${x + cellSize/2}' cy='${y + cellSize/2}' r='${cellSize/2}' fill='${color}' opacity='${opacity}'/>`;
        } else if (type === 2) {
          svg += `<polygon points='${x},${y} ${x+cellSize},${y} ${x+cellSize},${y+cellSize}' fill='${color}' opacity='${opacity}'/>`;
          svg += `<polygon points='${x},${y} ${x},${y+cellSize} ${x+cellSize},${y+cellSize}' fill='${color}' opacity='${parseFloat(opacity) - 0.1}'/>`;
        } else if (type === 3) {
          for (let i = 0; i < 10; i++) {
            svg += `<line x1='${x}' y1='${y + i * cellSize/10}' x2='${x + cellSize}' y2='${y + i * cellSize/10}' stroke='${color}' stroke-width='1' opacity='${opacity}'/>`;
          }
        } else if (type === 4) {
          svg += `<rect x='${x}' y='${y}' width='${cellSize}' height='${cellSize}' fill='none' stroke='${color}' stroke-width='2' opacity='${opacity}'/>`;
        } else if (type === 5) {
          for (let gx = 0; gx < 5; gx++) {
            for (let gy = 0; gy < 5; gy++) {
              svg += `<circle cx='${x + gx * cellSize/4}' cy='${y + gy * cellSize/4}' r='1.5' fill='${color}' opacity='${opacity}'/>`;
            }
          }
        } else if (type === 6) {
          svg += `<polygon points='${x+cellSize/2},${y} ${x+cellSize},${y+cellSize} ${x},${y+cellSize}' fill='${color}' opacity='${opacity}'/>`;
        } else {
          svg += `<circle cx='${x + cellSize/2}' cy='${y + cellSize/2}' r='${cellSize/2}' fill='none' stroke='${color}' stroke-width='2' opacity='${opacity}'/>`;
        }
      }
    }
    
    svg += '</svg>';
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url("${backgroundImage}")`,
        zIndex: -1
      }}
    />
  );
}

export default GeometricBackground;
