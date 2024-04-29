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

const names = ["Non-alcohol", "Alcohol", "None"];

const food = ["Pizza", "Sushi", "Mexico", "Chicken"];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Questionaire = () => {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <Header />

      <form className="form">
        <TextField
          style={{ width: "100%", margin: "5px" }}
          type="text"
          label="Number Of Guests*"
          variant="outlined"
        />
        <br />
        <TextField
          style={{ width: "100%", margin: "5px" }}
          type="text"
          label="Estimated Budget*"
          variant="outlined"
        />
        <br />

        <TextField
          style={{ width: "100%", margin: "5px" }}
          type="text"
          label="Preferred party location*"
          variant="outlined"
        />
        <br />

        <AutocompleteInput />

        <br />
        <FormControl sx={{ m: 1, width: "100%" }}>
          <InputLabel id="demo-multiple-name-label">Drink</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
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
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />}
            MenuProps={MenuProps}
          >
            {food.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />

        <Button variant="contained" id="form-button">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Questionaire;
