// PreviewButton.js


const PreviewButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
    >
      Preview
    </button>
  );
};

export default PreviewButton;
