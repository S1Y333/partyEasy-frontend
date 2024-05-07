import * as React from "react";
import { TextField, Button, Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SendIcon from "@mui/icons-material/Send";
import "./ChatModal.scss";
import { io } from "socket.io-client";
import { useState } from "react";


const ChatModal = ({ open, handleClose }) => {
  const fullScreen = useMediaQuery("(max-width:767px)");
    const socket = io(`${process.env.REACT_APP_ASSETS_URL}`);
    const [chatMessage, setChatMessage] = useState("");
    
    const sendMessages = (e) => {
      e.preventDefault();

      if (chatMessage) {
        socket.emit("message", chatMessage);
        setChatMessage("");
      }

      // Listen for messages
      socket.on("message", (data) => {
        // const li = document.createElement("li");
        // li.textContent = data;
        //   document.querySelector("ul").appendChild(li);

        const chatEl = document.createElement("div");
        chatEl.classList.add("chat__frame");
        document.querySelector(".dynamic-chats").appendChild(chatEl);

        const chatCopy = document.createElement("p");
        chatCopy.classList.add("chat__copy");
        chatCopy.textContent = data;
        chatEl.appendChild(chatCopy);
      });
    }
 
    
  
  return (
    <>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
        <div className="dialog__wrapper">
          <div className="dialog__close">
            <CloseIcon onClick={handleClose} />
          </div>

          <DialogTitle id="alert-dialog-title" className="dialog__title">
            Chat Room
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Welcome!
            </DialogContentText>
            <div class="dynamic-chats"></div>
            <div className="chat__type">
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="email"
                //   label="Email Address"
                type="text"
                value={chatMessage}
                sx={{ width: "21rem" }}
                variant="outlined"
                onChange={(e) => setChatMessage(e.target.value)}
              />
              <SendIcon
                sx={{ height: "3rem", width: "3rem", marginLeft: "0.5rem" }}
                onClick={sendMessages}
              />
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
};

export default ChatModal;
