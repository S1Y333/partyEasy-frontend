import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import sampleImg from "../../assets/images/surprise-party-hero.jpg"
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./PackageCard.scss"
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import {Link }from "react-router-dom";

const PackageCard = ({packageId}) => {
    return (
      <Link to={`/packageDetail/${packageId}`} className="link">
        <Card sx={{ width: 350 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={sampleImg}
            title="green iguana"
          />
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingBottom: 0,
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              Boston Pizza
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Budget from $1000
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ display: "flex", alignItems: "center" }}
            >
              <LocationOnIcon />
              <p className="location-copy">
                5170 Yonge St #100, North York, ON M2N 0G1
              </p>
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton aria-label="add to favorites">
              <Checkbox
                // sx={{ color: "white" }}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: "red" }} />}
              />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Link>
    );
};

export default PackageCard;
