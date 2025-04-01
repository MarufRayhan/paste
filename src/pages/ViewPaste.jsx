import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { pasteId } = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === pasteId);
  console.log(paste);

  return (
    <>
      <div className="p-4">
        <h1>Home</h1>
        <input
          type="text"
          value={paste?.title}
          className="border border-gray-400 p-2 m-2"
          disabled
        />
      </div>
      <div className="mt-2">
        <textarea
          value={paste?.content}
          rows={20}
          className="border border-gray-400 min-w-full"
          disabled
        />
      </div>
    </>
  );
};

export default ViewPaste;
