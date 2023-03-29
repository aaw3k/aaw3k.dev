import sharp from 'sharp';

export async function convertToBase64(
  url: string,
  width: number,
  height: number,
): Promise<string | null> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Error fetching image: ${response.status}`);
      return null;
    }

    const contentType = response.headers.get('Content-Type');
    if (!contentType || !contentType.startsWith('image/')) {
      console.error(`Invalid content type: ${contentType}`);
      return null;
    }

    const buffer = await response.arrayBuffer();
    const resizedImage = await sharp(buffer)
      .resize(width, height)
      .toFormat('png')
      .toBuffer();

    const base64Image = resizedImage.toString('base64');
    return `data:image/png;base64,${base64Image}`;
  } catch (error) {
    console.error('Error resizing image:', error);
    return null;
  }
}
