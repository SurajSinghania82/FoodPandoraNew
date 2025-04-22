export default function TestStyles() {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-red-500 mb-4">This text should be large, bold, and red</h1>
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
          This div should have a blue background, white text, rounded corners, and a shadow
        </div>
        <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          This button should be green
        </button>
      </div>
    )
  }
  