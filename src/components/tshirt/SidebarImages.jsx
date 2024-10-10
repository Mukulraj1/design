const SidebarImages = ({ images = [], handleImageClick }) => {
  if (!images.length) {
    return <div>No images available</div>;
  }

  return (
    <div className="container">
    <div className="  sidebar max-sm:flex max-sm:flex-row max-md:flex">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`sidebar-${index}`}
          onClick={() => handleImageClick(image)}
        />
      ))}
    </div>
    </div>
  );
};
export default SidebarImages