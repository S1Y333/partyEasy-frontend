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
import { reverseGeocode} from "../../utils/helper";
import { useEffect, useState } from "react";
import SocialModal from "../SocialModal/SocialModal"

const PackageCard = ({ packageInfo }) => {
  const packageId = packageInfo.id;
  const venuename = packageInfo.venues.venuename;
  const budget = packageInfo.price;
  const [address, setAddress] = useState("");
  const coverUrl = packageInfo.coverphotolink;
  const lat = packageInfo.venues.location[0];
  const lon = packageInfo.venues.location[1];
   const [socialOpen, setSocialOpen] = useState(false);

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
            />
          </IconButton>
          <IconButton aria-label="save">
            <Checkbox
              // sx={{ color: "white" }}
              icon={<BookmarkBorderOutlinedIcon />}
              checkedIcon={<BookmarkOutlinedIcon sx={{ color: "red" }} />}
            />
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
