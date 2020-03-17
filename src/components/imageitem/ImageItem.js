import React from "react";
import MainModal from "../modal/Modal";

const ImageItem = ({ item }) => (
  <li className="ImageGalleryItem">
    <img
      src={item.webformatURL}
      alt="sorry"
      className="ImageGalleryItem-image"
    />
    <MainModal url={item.largeImageURL} />
  </li>
);
export default ImageItem;
