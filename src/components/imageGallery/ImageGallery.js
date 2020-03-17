import React from "react";
import ImageItem from "../imageitem/ImageItem";

const ImageGallery = ({ gallery,onImgClick }) => (
  <>
    <ul className="ImageGallery">
      {gallery.map(item => (
        <ImageItem item={item} key={item.id} onImgClick={onImgClick} />
      ))}
    </ul>
  </>
);

export default ImageGallery;
