import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./PackageCard.scss";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import { reverseGeocode } from "../../utils/helper";
import { useEffect, useState } from "react";
import {
  likeOnePackage,
  unLikeOnePackage,saveOnePackage, unSaveOnePackage
} from "../../utils/package-functions";
import SocialModal from "../SocialModal/SocialModal";

const PackageCard = ({ authtoken, packageInfo, checkLike, checkSave }) => {


  const packageId = packageInfo.id;
  const venuename = packageInfo.venues.venuename;
  const budget = packageInfo.price;
  const [likes, setLikes] = useState(packageInfo.likes);
  const [saves, setSaves] = useState(packageInfo.saves);

  const [address, setAddress] = useState("");
  const coverUrl = packageInfo.coverphotolink;
  const lat = packageInfo.venues.location[0];
  const lon = packageInfo.venues.location[1];
  const [socialOpen, setSocialOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState(checkSave);
  const [likeStatus, setLikeStatus] = useState(checkLike);

  const handleClose = () => {
    setSocialOpen(false);
  };

  useEffect(() => {
    getAddress(lat, lon); //convert to an address
  }, [lat, lon]);

  

  const getAddress = async (lat, lon) => {
    const result = await reverseGeocode(lat, lon);
    setAddress(result);
  };

  const handleLike = async () => {
    //no user found, then can still view how many likes now, click on like will be poped to login

    //if user found, user liked the video, the heart showed red, if user hasn't like the video,
    if (!likeStatus) {
      const result = await likeOnePackage(authtoken, packageId);
      setLikes(result.packageInfo.likes);
      setLikeStatus(!likeStatus);
    } else {
      const result = await unLikeOnePackage(authtoken, packageId);
      setLikes(result.packageInfo.likes);
      setLikeStatus(!likeStatus);
    }
  };

  const handleSave = async () => {
     if (!saveStatus) {
       const result = await saveOnePackage(authtoken, packageId);
       setSaves(result.packageInfo.saves);
       setSaveStatus(!saveStatus);
     } else {
       const result = await unSaveOnePackage(authtoken, packageId);
       setSaves(result.packageInfo.saves);
       setSaveStatus(!saveStatus);
     }

  };

  //get cover photo
  // const getCover = async () => {
  //   const result = await getCoverPhoto();
  //   setCoverUrl(result);
  // }

  //console.log(venuename + " " + budget + " " + address + "YEAH!!!!");

  return (
    <>
      <Card sx={{ width: 350, marginBottom: "2rem" }}>
        <Link to={`/packageDetail/${packageId}`} className="link">
          <CardMedia sx={{ height: 140 }} image={coverUrl} title="party img" />
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingBottom: 0,
            }}
          >
            <Typography gutterBottom variant="h6" color="text.primary">
              {venuename}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Budget from CA$ {budget}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ display: "flex", alignItems: "center" }}
            >
              <LocationOnIcon />
              <p className="location-copy">{address}</p>
            </Typography>
          </CardContent>
        </Link>
        <CardActions>
          <IconButton aria-label="like">
            <Checkbox
              // sx={{ color: "white" }}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
              onClick={handleLike}
              checked={likeStatus}
            />
            {likes}
          </IconButton>
          <IconButton aria-label="save">
            <Checkbox
              // sx={{ color: "white" }}
              icon={<BookmarkBorderOutlinedIcon />}
              checkedIcon={<BookmarkOutlinedIcon sx={{ color: "red" }} />}
              onClick={handleSave}
              checked={saveStatus}
            />
            {saves}
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon onClick={() => setSocialOpen(true)} />
          </IconButton>
        </CardActions>
      </Card>
      <SocialModal socialOpen={socialOpen} handleClose={handleClose} />
    </>
  );
};

export default PackageCard;
