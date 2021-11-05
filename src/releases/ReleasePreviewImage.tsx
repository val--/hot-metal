import { IAlbumsCover } from '../types';
import React from 'react';

interface ReleasePreviewImagesProps {
    images: IAlbumsCover[];
    thumbnailSize: 'large' | 'medium' | 'small';
}

const ReleasePreviewImage = ({ images, thumbnailSize }: ReleasePreviewImagesProps) => {

    let index: number;

    switch(thumbnailSize) {
        case 'large':
            index = 0;
            break;
        case 'medium':
            index = 1;
            break;
        case 'small':
            index = 2;
            break;
        default:
            index = 0;
    };

    return (
        <>
            <img src={images[index].url}/>
        </>
    );
};

export default ReleasePreviewImage;
