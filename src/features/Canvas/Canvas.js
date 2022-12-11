import { React, useEffect, useState } from 'react';
import Sketch from 'react-p5';

import styles from './Canvas.module.css';

export function Canvas() {
  const randomImg = Math.floor(Math.random() * 20) + 1;

  const [artworks, setArtworks] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/artworks/')
      .then((res) => res.json())
      .then((data) => setArtworks(data));
  }, []);

  if (!artworks) {
    return <strong>Loading...</strong>;
  }

  var img;
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(600, 600).parent(canvasParentRef);
    img = p5.loadImage(`${artworks[randomImg].poster}`);
    img.resize(600, 600);
  };

  const draw = (p5) => {
    p5.background(0);
    p5.fill(255);
    p5.noStroke();

    let tiles = p5.mouseX / 10;
    let tileSize = p5.width / tiles;
    p5.translate(tileSize / 2, tileSize / 2);

    for (let x = 0; x < tiles; x++) {
      for (let y = 0; y < tiles; y++) {
        let color = img?.get(Number(x * tileSize), Number(y * tileSize));
        let size = p5.map(p5.brightness(color), 0, 255, 0, tileSize);
        p5.ellipse(x * tileSize, y * tileSize, size, size);
      }
    }
  };

  return <Sketch className={styles.myCanvas} setup={setup} draw={draw} />;
}
