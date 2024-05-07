import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { Link } from 'react-router-dom'
import "./SocialModal.scss"

const SocialModal = ({ socialOpen, handleClose }) => {
  return (
    <>
      <Dialog
        open={socialOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Share this package to your friends!
        </DialogTitle>
        <DialogContent className="social-container">
          <Link to="https://twitter.com" className="social-icon">
            <TwitterIcon  />
          </Link>
          <Link to="https://instagram.com" className="social-icon">
            <InstagramIcon />
          </Link>
          <Link to="https://facebook.com" className="social-icon">
            <FacebookIcon  />
          </Link>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SocialModal;
