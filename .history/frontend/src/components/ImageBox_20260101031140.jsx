export default function ImageBox() {
  return (
    <div className="max-w-sm mx-auto mt-10 border rounded shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Background Image</h2>

      <div
        className="w-full h-64 rounded overflow-hidden bg-center bg-cover bg-[url('https://via.placeholder.com/300x200.png?text=Background+Image')]"
      ></div>
    </div>
  );
}
