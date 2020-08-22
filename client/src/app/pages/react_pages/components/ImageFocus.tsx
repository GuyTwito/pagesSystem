import React from "react";

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

type ImageFocusProps = {
    unFocus: () => void,
    prev: () => void,
    next: () => void,
    imgSrc: string
}

const ImageFocus = ({ unFocus, prev, next, imgSrc }: ImageFocusProps) => {

    return <Lightbox
        mainSrc={imgSrc}
        nextSrc={imgSrc}
        prevSrc={imgSrc}
        onCloseRequest={unFocus}
        onMovePrevRequest={prev}
        onMoveNextRequest={next}
        enableZoom={false}
    />
}

export default ImageFocus;
