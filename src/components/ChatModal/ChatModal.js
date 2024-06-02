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

<<<<<<< HEAD
import { useState, useEffect } from "react";

const ChatModal = ({ open, handleClose }) => {
  const fullScreen = useMediaQuery("(max-width:767px)");
  
  const [chatMessage, setChatMessage] = useState("");
=======
import { useState, useEffect,useRef } from "react";

const ChatModal = ({ open, handleClose }) => {
  const fullScreen = useMediaQuery("(max-width:500px)");
  const activityRef = useRef(null);
  
  const [chatMessage, setChatMessage] = useState("");
  //const activity = document.querySelector(".chat__activity");
  const msgInput = document.querySelector(".message");
  
 
>>>>>>> cdfe2add478870de480dc1b904a86a39b0406f20

  const sendMessages = (e) => {
    e.preventDefault();

    if (chatMessage) {
      socket.emit("message", chatMessage);
      setChatMessage("");
<<<<<<< HEAD
=======
     // activity.innerHTML = "";
>>>>>>> cdfe2add478870de480dc1b904a86a39b0406f20
    }
    // socket.off("message sent")
    // socket.disconnect()
  };
<<<<<<< HEAD

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

=======
  

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
      
    
    socket.on("activity", (name) => {
      if (activityRef.current) {
        activityRef.current.innerHTML = `${name} is typing...`;

        let activityTimer; //set timeout when certain time passed
        //clear after 3 seconds
        clearTimeout(activityTimer);
        activityTimer = setTimeout(() => {
          if (activityRef.current) {
            activityRef.current.innerHTML = "";
          }
        }, 1000);
      }
    })
  
  },[]);

if (msgInput)
{
  msgInput.addEventListener("keypress", () => {
   socket.emit("activity", socket.id.substring(0, 5));
 });
}
  
>>>>>>> cdfe2add478870de480dc1b904a86a39b0406f20
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
<<<<<<< HEAD
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
=======
              <p ref={activityRef} className="chat__activity"></p>
              <div>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="message"
                  name="message"
                  className="message"
                  type="text"
                  value={chatMessage}
                  sx={{ width: "21rem" }}
                  variant="outlined"
                  onChange={(e) => setChatMessage(e.target.value)}
                />
                <SendIcon
                  sx={{ height: "2.5rem", width: "2.5rem", marginLeft: "1rem" }}
                  className="chat__sendicon"
                  onClick={sendMessages}
                />
              </div>
>>>>>>> cdfe2add478870de480dc1b904a86a39b0406f20
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
};

export default ChatModal;
