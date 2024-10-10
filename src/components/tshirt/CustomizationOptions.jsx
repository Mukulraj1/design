// CustomizationOptions.js


const CustomizationOptions = ({
  handleAddText,
  handleFileUpload,
  handleColorSelection,
  handleSaveOverlays, // New prop for saving overlays
  product,
  showColorOptions,
  setShowColorOptions,
}) => {
  return (
    <div className="flex flex-col items-start space-y-4 text-sm">
      <button
        onClick={() => setShowColorOptions((prev) => !prev)}
        className="button px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-[100px]"
      >
        Change Color
      </button>

      {showColorOptions && (
        <div className="flex flex-wrap space-x-2">
          {product.variants.map((variant, index) => (
            <div
              key={index}
              onClick={() => handleColorSelection(variant.color)}
              className="w-6 h-6 cursor-pointer border border-gray-300"
              style={{ backgroundColor: variant.color }}
            ></div>
          ))}
        </div>
      )}

      <button
        onClick={handleAddText}
        className="button px-4 py-2  text-white rounded hover:bg-green-600 w-[100px]"
      >
        Add Text
      </button>

      <label className="button text-center px-4 py-2 text-white rounded hover:bg-blue-600 cursor-pointer w-[100px]">
        Upload Image
        <input
          type="file"
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />
      </label>

      {/* New Save Overlays Button */}
      <button
        onClick={handleSaveOverlays}
        className=" px-4 py-2 bg bg-green-700  text-white rounded hover:bg-purple-300 hover:text-black w-[100px]"
      >
        Save upload image
      </button>
    </div>
  );
};

export default CustomizationOptions;
