import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Search, Edit, Eye, Trash2, Clipboard, Share2 } from "lucide-react";

const Pastes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const filterPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function deletePaste(pasteId) {
    dispatch(removeFromPastes(pasteId));
    toast.success("Paste deleted successfully");
  }

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
          Your Pastes
        </h1>

        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search pastes by title..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 shadow-sm"
          />
        </div>

        <div className="space-y-4">
          {filterPastes?.length > 0 ? (
            filterPastes.map((paste) => (
              <div
                key={paste._id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
              >
                <div className="flex justify-between items-start gap-2 mb-3">
                  <h2 className="text-xl font-semibold text-gray-800 truncate">
                    {paste.title || "Untitled"}
                  </h2>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {formatDate(paste.createdAt)}
                  </span>
                </div>

                <p className="text-gray-600 text-sm font-mono bg-gray-50 p-3 rounded-md mb-4 whitespace-pre-wrap">
                  {truncateContent(paste.content)}
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <Link
                    to={`/?pasteId=${paste?._id}`}
                    className="text-sm px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200 inline-flex items-center"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Link>

                  {paste && paste._id ? (
                    <Link
                      to={`/pastes/${paste._id}`}
                      className="text-sm px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200 inline-flex items-center"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-500">
                      No ID available
                    </span>
                  )}

                  <button
                    onClick={() => deletePaste(paste?._id)}
                    className="text-sm px-3 py-1.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors duration-200 inline-flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard");
                    }}
                    className="text-sm px-3 py-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors duration-200 inline-flex items-center"
                  >
                    <Clipboard className="h-4 w-4 mr-1" />
                    Copy
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        window.location.origin + `/pastes/${paste._id}`
                      );
                      toast.success("Link copied to clipboard");
                    }}
                    className="text-sm px-3 py-1.5 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors duration-200 inline-flex items-center"
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <Clipboard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-medium text-gray-600">
                No pastes found
              </h2>
              <p className="text-gray-500 mt-2">
                Create a new paste to get started
              </p>
              <Link
                to="/"
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Create Paste
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pastes;
