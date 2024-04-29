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

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const PackageDetail = () => {
  return (
    <div className="cover-form detail">
      <NavHeader />

      <div className="detail__up">
       <PageTop title="Package Detail"/>
        <Map />
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
              secondary="CN Tower"
              secondaryTypographyProps={{ color: " white" }}
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ backgroundColor: "#13182c" }}>
                <SportsBarIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Drink"
              secondary="White Wine, Orange Juice"
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
              secondary="Mexico, Chicken"
              secondaryTypographyProps={{ color: " white" }}
            />
          </ListItem>
        </List>
      </div>
      <div className="detail__bottom">
        <Typography variant="h5" gutterBottom>
          Budget from $1000
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
