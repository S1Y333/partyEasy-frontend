import * as React from "react";
import { TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SendIcon from "@mui/icons-material/Send";
import "./ChatModal.scss";
import {socket} from "../../app/socket"

import { useState, useEffect } from "react";

const ChatModal = ({ open, handleClose }) => {
  const fullScreen = useMediaQuery("(max-width:767px)");
  
  const [chatMessage, setChatMessage] = useState("");

  const sendMessages = (e) => {
    e.preventDefault();

    if (chatMessage) {
      socket.emit("message", chatMessage);
      setChatMessage("");
    }
    // socket.off("message sent")
    // socket.disconnect()
  };

  // Listen for messages
    useEffect(() => {
        socket.on("message", (data) => {
            // const li = document.createElement("li");
            // li.textContent = data;
            //   document.querySelector("ul").appendChild(li);
            const chatContainer = document.querySelector(".dynamic-chats");
            if (chatContainer) {
                const chatEl = document.createElement("div");
                chatEl.classList.add("chat__frame");
                chatContainer.appendChild(chatEl);

                const chatCopy = document.createElement("p");
                chatCopy.classList.add("chat__copy");
                chatCopy.textContent = data;
                chatEl.appendChild(chatCopy);
            }
        });
    },[])

  return (
    <>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
        <div className="dialog__wrapper">
          <div className="dialog__close">
            <CloseIcon onClick={handleClose} />
          </div>

          <DialogTitle id="alert-dialog-title" className="dialog__title">
            Party Easy App Chat Room
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Welcome everyone!
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
