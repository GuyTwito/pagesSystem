import React, { useState, useEffect } from "react";

function getImages() {
    function importAll(r: any) {
        return r.keys().map(r);
    }

    return importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));
}

type GalleryProps = {
    imagesOnRow: number,
    imgSizeByResolution: (x: number) => number,
    delayResize: number
}

const Gallery = ({ imagesOnRow, imgSizeByResolution, delayResize }: GalleryProps) => {
    const [images, setImages] = useState([])
    const [imgSize, setImgSize] = useState('0%')
    let updateImgSizeTimeout: number;

    const computeImgSize = () => {
        const computedImgSize = `${100 / (
            imagesOnRow
                ? imagesOnRow
                : imgSizeByResolution(window.innerWidth)
        )}%`

        if (computedImgSize !== imgSize) {
            if (updateImgSizeTimeout)
                clearTimeout(updateImgSizeTimeout);
            updateImgSizeTimeout = setTimeout(() => setImgSize(computedImgSize), delayResize)
        }
    }

    useEffect(() => {
        setImages(getImages())
        computeImgSize()

        window.addEventListener('resize', computeImgSize)
        return () => window.removeEventListener('resize', computeImgSize);
    }, []);

    return (
        <div>
            <h1>Welcome to the Gallery !</h1>
            <div>
                {images.map((image, i) =>
                    <img key={i} alt={image} src={image} width={imgSize} ></img>
                )}
            </div>
        </div>
    );
};

const imgSizeByResolutionDefault = (resolution: number): number => {
    if (resolution <= 480)
        return 1
    if (resolution < 640)
        return 2
    if (resolution < 1280)
        return 4
    if (resolution < 1920)
        return 8
    return 16
}

Gallery.defaultProps = {
    imgSizeByResolution: imgSizeByResolutionDefault,
    delayResize: 100
}

export default Gallery;
