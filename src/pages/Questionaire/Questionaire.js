import Header from "../Header/Header";
import { TextField, Button, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./Questionaire.scss";
import { useState } from "react";
import AutocompleteInput from "../../components/AutoComplete/AutoCompleteInput";
import { formatCoordinateString } from "../../utils/helper";

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
  const [drinkName, setDrinkName] = useState([]);
  const [foodName, setFoodName] = useState([]);
  const [coordinates, setCoordinates] = useState({})
  const initialFormData = {
    numOfGuests: 0,
    budget: 0,
  };
  const [formData, setFormData] = useState(initialFormData)
//   const handleChange = (event) => {
//     event.preventDefault();
//     set

  // }
    const handleChange = (e) => {
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
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const FormattedCoordinates = formatCoordinateString(coordinates);
    const newRequestData = {
    numOfGuests: formData.numOfGuests,
      budget: formData.budget,
        coordinates: FormattedCoordinates,
          drink: drinkName,
            food: foodName
    }
    console.log(newRequestData);
    // }
    // console.log(
    //   "DATA GET!!....>>" +
    //     JSON.stringify(formData) +
    //     " " +
    //     drinkName +
    //     " " +
    //     foodName +
    //     " " +
    //     coordinates
    // );
  }
  

  return (
    <div>
      <Header page="question" />

      <form className="form">
        <TextField
          style={{ width: "100%", margin: "5px" }}
          type="text"
          label="Number Of Guests*"
          variant="outlined"
          value={FormData.numOfGuests}
          onChange={handleChange}
          name="numOfGuests"
        />
        <br />
        <TextField
          style={{ width: "100%", margin: "5px" }}
          type="number"
          label="Estimated Budget*"
          variant="outlined"
          value={FormData.budget}
          onChange={handleChange}
          name="budget"
        />

        <br />

        <AutocompleteInput setCoordinates={setCoordinates} />

        <br />
        <FormControl sx={{ m: 1, width: "100%" }}>
          <InputLabel id="demo-multiple-name-label">Drink</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={drinkName}
            onChange={handleDrinkChange}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
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
        <FormControl sx={{ m: 1, width: "100%" }}>
          <InputLabel id="demo-multiple-name-label">Food</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={foodName}
            onChange={handleFoodChange}
            input={<OutlinedInput label="Food Name" />}
            MenuProps={MenuProps}
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
