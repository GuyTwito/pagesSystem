import React, { useState, useEffect, useRef } from "react";
import utils from '../utils'

function getImages() {
    function importAll(r: any) {
        return r.keys().map(r);
    }

    return importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));
}

type GalleryProps = {
    imgInRowByResolution: (x: number) => number,
    delayResize: number
}

const Gallery = ({ imgInRowByResolution, delayResize }: GalleryProps) => {
    const [images, setImages] = useState([])
    const [imgInRow, setImgInRow] = useState(1)
    const [imgSize, setImgSize] = useState('0px')

    const galleryRef = useRef(null);
    let resizeTimeout: number;
    let lastResize: number;

    const imgMargin = 3
    const imgBorderWidth = 1

    const computeImgInRow = () => {
        const computedImgInRow = imgInRowByResolution(window.innerWidth)
        // not rendering for every resize, for performance
        if (resizeTimeout)
            clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (computedImgInRow !== lastResize) {
                lastResize = computedImgInRow
                setImgInRow(computedImgInRow)
            }

            setImgSize(`${!galleryRef.current
                ? 0
                : (galleryRef.current!["clientWidth"] * 0.95) * (1 / computedImgInRow) - imgMargin * 2 - imgBorderWidth * 2}px`
            )
        }, delayResize)
    }

    useEffect(() => {
        setImages(getImages())
        computeImgInRow()

        window.addEventListener('resize', computeImgInRow)
        return () => window.removeEventListener('resize', computeImgInRow);
    }, []);

    return (
        <div style={{ backgroundColor: "#AAA", textAlign: "center", width: "100%" }}>
            <h1>Welcome to the Gallery !</h1>
            <hr />
            <div ref={galleryRef}>
                {/* divide images to rows */}
                {utils.range(Math.ceil(images.length / imgInRow)).map((rowIndex) =>
                    <div key={rowIndex}>
                        {utils.range(imgInRow).map((colIndex) => {
                            const imageIndex = rowIndex * imgInRow + colIndex
                            const isImg = imageIndex < images.length

                            return <img key={imageIndex} alt={isImg ? images[imageIndex] : ""} src={isImg ? images[imageIndex] : images[0]}
                                style={{
                                    width: imgSize,
                                    height: imgSize,
                                    margin: `${imgMargin}px`,
                                    border: `${imgBorderWidth}px solid ${isImg ? "#000" : "transparent"}`,
                                    visibility: isImg ? undefined : "hidden"
                                }}
                            ></img>
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

const imgInRowByResolutionDefault = (resolution: number): number => {
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
    imgInRowByResolution: imgInRowByResolutionDefault,
    delayResize: 10
}

export default Gallery;
