import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { updateToPastes, addToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const pasteId = searchParams.get("pasteId");

  useEffect(() => {
    if (pasteId) {
      const paste = JSON.parse(localStorage.getItem("pastes")).find(
        (p) => p._id === pasteId
      );
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(30),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({ pasteId: "" });
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="mb-8 bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
          {pasteId ? "Edit Paste" : "Create New Paste"}
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              placeholder="Enter a descriptive title"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 shadow-sm"
            />
          </div>

          <button
            className="px-8 py-3 bg-blue-600 font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md transform hover:translate-y-px focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={createPaste}
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
        </div>
      </div>

      <div className="relative bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Content
        </label>
        <textarea
          id="content"
          value={value}
          placeholder="Enter your text here..."
          onChange={(e) => setValue(e.target.value)}
          rows={20}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 font-mono text-sm resize-y bg-gray-50"
        />
        <div className="absolute bottom-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
          {value.length} characters
        </div>
      </div>

      {value.length > 0 && (
        <div className="mt-4 bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{
                width: `${Math.min(100, (value.length / 2000) * 100)}%`,
              }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1 text-right">
            {value.length >= 2000 ? (
              <span className="text-yellow-600 font-medium">
                Character limit approaching
              </span>
            ) : (
              "Character count"
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
