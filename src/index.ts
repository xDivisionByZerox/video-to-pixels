import { PixelMap } from './models/pixel-map.model';
import { isMediaStream } from './util/valitation';

function convertVideoToPixels(params: {
  canvas: HTMLCanvasElement,
  video: HTMLVideoElement,
}) {
  const { canvas, video } = params;

  const stream = video.srcObject;
  if(!stream) {
    throw new Error('Provided video element needs a srcObject');
  }

  if(stream instanceof Blob) {
    throw new Error('Param "video" can not have srcObject instanceof "Blob". Please provide a "MediaStream".');
  }

  if(!isMediaStream(stream)) {
    throw new Error('Param "video" has an unsupported srcObject. Please provide a "MediaStream".');
  }

  const ctx = canvas.getContext('2d');
  if(ctx === null) {
    throw new Error('Can not get context of provided canvas.');
  }

  return stream.getVideoTracks().map(async (track) => {
    const settings = track.getSettings();
    if (!settings.width || !settings.height) {
      return undefined;
    }

    canvas.width = settings.width;
    canvas.height = settings.height;

    ctx.drawImage(video, 0, 0, settings.width, settings.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    return new PixelMap(imageData);
  });
}

export default convertVideoToPixels;