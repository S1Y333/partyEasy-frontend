import Header from "../../components/Header/Header";
import { TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./Questionaire.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AutocompleteInput from "../../components/AutoComplete/AutoCompleteInput";
import { formatCoordinateString } from "../../utils/helper";
import { createNewPackage } from "../../utils/package-functions";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const drink = ["Non-alcohol", "Alcohol", "None"];

const food = ["Pizza", "Sushi", "Mexico", "Chicken"];

function getStyles(name, eachName, theme) {
  return {
    fontWeight:
      eachName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}



const Questionaire = () => {
  const theme = useTheme();
  const { user } = useSelector((state) => ({ ...state }));
  let navigate = useNavigate();

  const [drinkName, setDrinkName] = useState(localStorage.getItem("drinkName")? JSON.parse(localStorage.getItem("drinkName")) : []);
  const [foodName, setFoodName] = useState(
    localStorage.getItem("foodName")
      ? JSON.parse(localStorage.getItem("foodName"))
      : []
  );
  const [coordinates, setCoordinates] = useState({});
  const [error, setError] = useState(false);

  //console.log(localStorage.getItem("numOfGuests"));

  const initialFormData = {
    numOfGuests: localStorage.getItem("numOfGuests")? localStorage.getItem("numOfGuests") : 0,
    budget: localStorage.getItem("budget")? localStorage.getItem("budget") : 0,
  };
  const [formData, setFormData] = useState(initialFormData);
  //   const handleChange = (event) => {
  //     event.preventDefault();
  //     set

  // }
  const handleChange = (e) => {
    
    if (e.target.value.trim() === "") {
      setError(true);
    } else {
      setError(false);
    }
    
    const { name, value } = e.target;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDrinkChange = (event) => {
    const {
      target: { value },
    } = event;
    setDrinkName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleFoodChange = (event) => {
    
    const {
      target: { value },
    } = event;
    setFoodName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error || !formData.numOfGuests || !formData.budget ||!drinkName || !foodName) {
      toast.error("All fields are required!");
      return;
    }
    if (formData.numOfGuests > 1000) {
      toast.error(
        "The maximum number of Guests is 1000"
      );
    }

   

    const FormattedCoordinates = formatCoordinateString(coordinates);
    const newRequestData = {
      numOfGuests: formData.numOfGuests,
      budget: formData.budget,
      coordinates: FormattedCoordinates,
      drink: drinkName,
      food: foodName,
    };

    //store requestData into localstorage
    localStorage.setItem("numOfGuests", newRequestData.numOfGuests);
    localStorage.setItem("budget", newRequestData.budget);
    localStorage.setItem("drinkName", JSON.stringify(newRequestData.drink));
    localStorage.setItem("foodName", JSON.stringify(newRequestData.food));
    //redirect to the packagelist page with new created packageinfo

    console.log(user + "!!!!");
    if (user && user.token) {

     await createNewPackage(user.token, newRequestData); //successful, tested
      //remove localdata info
      localStorage.removeItem("numOfGuests");
      localStorage.removeItem("budget");
      localStorage.removeItem("drinkName");
      localStorage.removeItem("foodName");

      navigate("/packageList");
    } else {
      navigate("/login");
    }
    
    
  };

  console.log(error);

  return (
    <div>
      <Header page="question" />

      <form className="form">
        <TextField
          style={{ width: "60%", margin: "5px" }}
          type="number"
          label="Number Of Guests*"
          variant="outlined"
          value={formData.numOfGuests}
          onChange={handleChange}
          name="numOfGuests"
          required
          error={error}
          InputLabelProps={{ shrink: true }}
        />
        <br />
        <TextField
          style={{ width: "60%", margin: "5px" }}
          type="number"
          label="Estimated Budget*"
          variant="outlined"
          value={formData.budget}
          onChange={handleChange}
          name="budget"
          required
          error={error}
          InputLabelProps={{ shrink: true }}
        />

        <br />

        <AutocompleteInput setCoordinates={setCoordinates} />

        <br />
        <FormControl sx={{ m: 1, width: "60%" }}>
          <InputLabel id="demo-multiple-name-label">Drink</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={drinkName}
            onChange={handleDrinkChange}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
            required
          >
            {drink.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, drinkName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <FormControl sx={{ m: 1, width: "60%" }}>
          <InputLabel id="demo-multiple-name-label">Food</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={foodName}
            onChange={handleFoodChange}
            input={<OutlinedInput label="Food Name" />}
            MenuProps={MenuProps}
            required
          >
            {food.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, foodName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />

        <Button variant="contained" id="form-button" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Questionaire;
