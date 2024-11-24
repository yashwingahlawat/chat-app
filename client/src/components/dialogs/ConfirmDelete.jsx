import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const ConfirmDelete = ({ open, deleteHandler, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <div className=" text-gray-400 bg-[#333333]">
        <DialogTitle className=" bg-[#333333]">Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "white" }}>
            Are you sure you want to delete this group?
          </DialogContentText>
        </DialogContent>
        <div className=" flex m-2 justify-end gap-2">
          <Button
            onClick={deleteHandler}
            sx={{
              color: "#ea7070",
            }}
          >
            Yes
          </Button>
          <Button
            onClick={handleClose}
            sx={{
              bgcolor: "rgb(78, 76, 184)",
              ":hover": {
                bgcolor: "rgb(78, 76, 184,0.7)",
              },
            }}
            variant="contained"
          >
            No
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmDelete;
