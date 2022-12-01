export interface IMediaLibraryImage {
  imageFallbackUrl: string;
  imageSources?: {
    sizes: string;
    srcset?: string;
    type?:
      | 'image/png'
      | 'image/jpeg'
      | 'image/gif'
      | 'image/svg+xml'
      | 'image/webp'
      | 'image/avif'
      | 'image/tiff'
      | '';
  }[];
  imageTextAlternative: string;
}

export interface IMediaLibraryConfig {
  onOpen: () => void;
  onError?: (error: Error) => void;
}

export const mediaLibraryChooseImage = (image: IMediaLibraryImage) => {
  // check in browser
  if (typeof window !== 'undefined') {
    // dispatchEvent ck:mediaLibrary:chooseImage
    window.dispatchEvent(
      new CustomEvent('ck:mediaLibrary:chooseImage', {
        detail: { ...image },
      }),
    );
  }
};

export const mediaLibraryOnClose = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('ck:mediaLibrary:onClose'));
  }
};
