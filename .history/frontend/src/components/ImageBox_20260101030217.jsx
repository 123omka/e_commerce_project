export default function ImageBox() {
  return (
    <div className="max-w-sm mx-auto mt-10 border rounded shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Image Display</h2>

      <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded overflow-hidden">
        <img
          src="https://via.placeholder.com/300x200.png?text=Your+Image+Here"
          alt="Display"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
