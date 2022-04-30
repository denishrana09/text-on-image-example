const sharp = require("sharp");

async function addTextOnImage() {
  try {
    const width = 750;
    const height = 483;
    const text = "@denish";

    const svgImage = `
    <svg width="${width}" height="${height}">
      <style>
      .title { fill: #eee; font-size: 40px; font-family: 'Verdana', sans-serif;}
      </style>
      <text x="15%" y="10%" text-anchor="middle" class="title">${text}</text>
    </svg>
    `;
    const svgBuffer = Buffer.from(svgImage);
    let image = await sharp("test.jpg");
    const metadata = await image.metadata();
    image = image
      .composite([
        {
          input: svgBuffer,
          top: metadata.height - 140,
          left: 150,
        },
      ])
      .toFile("result.jpg");
  } catch (error) {
    console.log(error);
  }
}

addTextOnImage();
