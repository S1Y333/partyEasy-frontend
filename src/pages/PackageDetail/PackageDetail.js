import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Map from "../../components/Map/Map";
import NavHeader from "../../components/NavHeader/NavHeader";
import "./PackageDetail.scss";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import { Typography } from "@mui/material";
import PageTop from "../../components/PageTop/PageTop";
import { useParams } from "react-router-dom";

import { useCallback, useEffect } from "react";

import { getPackageById } from "../../utils/package-functions";
import { useState } from "react";
import Loading from "../../components/Loading/Loading";
import LinkIcon from "@mui/icons-material/Link";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";



const PackageDetail = () => {
  const { packageId } = useParams();
  // const [packageDetail, setPackageDetail] = useState({});
  const [venue, setVenue] = useState("");
  const [venuelink, setVenuelink] = useState("");
  const [drink, setDrink] = useState("");
  const [food, setFood] = useState("");
  const [budget, setBudget] = useState("");
  const [coordinates, setCoordinates] = useState([]);
  const [totalPack, setTotalPack] = useState(0);

 

  const loadPackageDetail = useCallback(async () => {

    const result = await getPackageById(packageId);
    setVenue(result.data.venues.venuename);
    setVenuelink(result.data.venues.link);
    setDrink(result.data.drinks.map((d) => d.drinkname).join(", "));
    setFood(
      result.data.foods
        .map((f) => {
          return `${f.foodname} of ${f.foodchoice} party size`;
        })
        .join(", ")
    );
    setBudget(result.data.price);
    setCoordinates(result.data.venues.location);
    setTotalPack(result.data.drinks.length);
    // setPackageDetail(result.data);

  }, [packageId]);

   useEffect(() => {
     loadPackageDetail();
   }, [loadPackageDetail]);
  

  // console.log(packageDetail);
  console.log(coordinates);

  return (
    <div className="cover-form detail">
      <NavHeader />

      <div className="detail__up">
        <PageTop title="Package Detail" />
        {coordinates.length > 0 ? (
          <Map coordinates={coordinates} />
        ) : (
          <Loading />
        )}
      </div>
      <div className="detail__down">
        <List sx={{ width: "100%" }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ backgroundColor: "#13182c" }}>
                <FmdGoodIcon />
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary="Venue"
              secondary={`3 hours of ${venue}`}
              secondaryTypographyProps={{ color: " white" }}
            />
            <Link to={venuelink} target="_blank" className="link">
              <ListItemButton>
                <LinkIcon />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ backgroundColor: "#13182c" }}>
                <SportsBarIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Drink"
              secondary={`${totalPack} Packs of Drinks: ${drink}. Each pack serves around 10 people`}
              secondaryTypographyProps={{ color: " white" }}
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ backgroundColor: "#13182c" }}>
                <LunchDiningIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Food"
              secondary={`${totalPack} Packs of Food: ${food}. Each pack serves around 10 people`}
              secondaryTypographyProps={{ color: " white" }}
            />
          </ListItem>
        </List>
      </div>
      <div className="detail__bottom">
        <Typography variant="h5" gutterBottom>
          Budget from CA ${budget}
        </Typography>

        <Checkbox
          sx={{ color: "white" }}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite sx={{ color: "red" }} />}
        />
      </div>
    </div>
  );
};

export default PackageDetail;
