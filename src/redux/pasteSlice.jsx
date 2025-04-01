import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const pasteSlice = createSlice({
  name: "paste",
  initialState: {
    pastes: localStorage.getItem("pastes")
      ? JSON.parse(localStorage.getItem("pastes"))
      : [],
  },
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;

      if (!paste.title.trim() || !paste.content.trim()) {
        return toast.error("Title and content cannot be empty");
      }

      const isDuplicateTitle = state.pastes.some(
        (p) => p.title === paste.title
      );
      const isDuplicateId = state.pastes.some((p) => p._id === paste._id);

      if (isDuplicateId) {
        return toast.error("Paste with same id already exists");
      }
      if (isDuplicateTitle) {
        return toast.error("Paste with same title already exists");
      }

      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste created successfully");
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((p) => p._id === paste._id);

      if (index === -1) {
        return toast.error("Paste not found");
      } else {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated successfully");
      }
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      state.pastes = state.pastes.filter((p) => p._id !== pasteId);
      toast.success("Paste deleted successfully");
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
    },
    resetAllPaste: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },
  },
});

export const { addToPastes, updateToPastes, removeFromPastes, resetAllPaste } =
  pasteSlice.actions;

export default pasteSlice.reducer;
