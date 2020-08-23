import React, { useState, useEffect, useRef } from "react";
import ImageFocus from "./components/ImageFocus";
import SearchBox from 'react-responsive-searchbox/lib/SearchBox';
import { general } from '../../utils'
import { apiActions } from '../../actions'

type GalleryProps = {
    imgInRowByResolution: (x: number) => number,
    delayResize: number
}

const Gallery = ({ imgInRowByResolution, delayResize }: GalleryProps) => {
    const [images, setImages] = useState([])
    const [imgInRow, setImgInRow] = useState(1)
    const [imgSize, setImgSize] = useState('0px')
    const [focusImg, setFocusImg] = useState(-1)
    const [searchQuery, setSearchQuery] = useState("")
    const [searchQueryInput, setSearchQueryInput] = useState("")
    const [searchPage, setSearchPage] = useState(1)

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

    const imagesFetched = (images: any, fetchNextImages: () => void) => {
        setSearchPage(currentSearchPage => currentSearchPage + 1)
        setImages((currentImages) => currentImages.concat(images))

        if (galleryRef.current)
            if (galleryRef.current!["clientHeight"] < window.innerHeight)
                fetchNextImages()
    }

    const fetchNextImages = (isNewQuery = false) => {
        if (isNewQuery && searchQuery !== searchQueryInput) {
            setImages((currentImages) => [])
            setSearchQuery(currentSearchQuery => searchQueryInput)
            setSearchPage(currentSearchPage => 1)
        }
        apiActions.getImages(searchQuery, searchPage, (images: any) => imagesFetched(images, fetchNextImages), () => null)
    }


    const checkBottom = (e: any) => {
        if (e.target.scrollHeight - e.target.scrollTop - 10 < e.target.clientHeight)
            fetchNextImages()
    }

    const imageClicked = (imgIndex: number) => setFocusImg(imgIndex)
    const unFocus = () => setFocusImg(-1)
    const nextImg = () => {
        if (focusImg === images.length - 1)
            fetchNextImages()
        setFocusImg(prevImg => prevImg + 1)
    }
    const prevImg = () => {
        if (focusImg === 0)
            return
        setFocusImg(prevImg => prevImg - 1)
    }

    useEffect(() => {
        fetchNextImages()
        computeImgInRow()

        window.addEventListener('resize', computeImgInRow)

        return () => {
            window.removeEventListener('resize', computeImgInRow);
        }
    }, []);

    return (
        <div onScroll={checkBottom} style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#AAA",
            textAlign: "center",
            overflow: "auto"
        }}>
            <h1>Welcome to the Gallery !</h1>
            <SearchBox
                placeholder="Search"
                value={searchQueryInput}
                onchange={(e: any) => {
                    const val = e.target.value
                    setSearchQueryInput(val)
                    if (val === "")
                        fetchNextImages(true)
                }}
                OnSubmit={(e: any) => { e.preventDefault(); fetchNextImages(true) }}
            />
            <hr />
            {focusImg === -1
                ? null
                : <ImageFocus
                    unFocus={unFocus}
                    prev={prevImg}
                    next={nextImg}
                    imgSrc={images[Math.min(focusImg, images.length)]}
                />
            }
            <div ref={galleryRef}>
                {/* divide images to rows */}
                {general.range(Math.ceil(images.length / imgInRow)).map((rowIndex) =>
                    <div key={rowIndex}>
                        {general.range(imgInRow).map((colIndex) => {
                            const imageIndex = rowIndex * imgInRow + colIndex
                            const isImg = imageIndex < images.length

                            return <img
                                key={imageIndex}
                                alt={isImg ? images[imageIndex] : ""}
                                src={isImg ? images[imageIndex] : images[0]}
                                onClick={() => imageClicked(imageIndex)}
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
