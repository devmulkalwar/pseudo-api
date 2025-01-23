function App() {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      {/* Image */}
      <img
        className="w-full"
        src="https://via.placeholder.com/400x200"
        alt="Card"
      />

      {/* Content */}
      <div className="px-6 py-4">
        {/* Title */}
        <div className="font-bold text-xl mb-2">Card Title</div>

        {/* Description */}
        <p className="text-gray-700 text-base">
          This is a simple card component built with Tailwind CSS and React. It
          includes an image, a title, a description, and a button.
        </p>
      </div>

      {/* Button */}
      <div className="px-6 pt-4 pb-6">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Read More
        </button>
      </div>
    </div>
  );
}

export default App;
