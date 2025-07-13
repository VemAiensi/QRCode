import { useState } from "react";
import {
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Button,
  Drawer,
} from "@mui/material";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import QRCodeComponent from "./QRCode";
import "./App.css";
import Profile from "./Profile";

function App() {
  const [ecLevel, setECLevel] = useState<"L" | "M" | "H">("L");
  const [value, setValue] = useState<string | null>(null);
  const [icon, setIcon] = useState<string | null>(null);
  const [color, setColor] = useState<string>("#fff700");

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div className="main-window">
      <h1>Text to QR Code</h1>
      <div className="workarea">
        <QRCodeComponent
          icon={icon}
          eclvl={ecLevel}
          value={value}
          color={color}
        ></QRCodeComponent>
      </div>

      <div className="card">
        <div className="text-inputs">
          <TextField
            fullWidth
            label="Text"
            name="text"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setValue(event.target.value)
            }
            value={value}
          ></TextField>
          <div className="input-group">
            <TextField
              label="Icon"
              name="icon"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setIcon(event.target.value)
              }
              value={icon}
            ></TextField>
            <div className="select">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Error Correction Rate
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ecLevel}
                  label="Error Correction Rate"
                  onChange={(event) => {
                    setECLevel(event.target.value as "L" | "M" | "H");
                  }}
                >
                  <MenuItem value="L">Low</MenuItem>
                  <MenuItem value="M">Medium</MenuItem>
                  <MenuItem value="H">High</MenuItem>
                </Select>
              </FormControl>
            </div>

            <input
              className="color-picker"
              type="color"
              value={color}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setColor(event.target.value);
              }}
            ></input>
          </div>
        </div>
      </div>

      <div className="info">
        <Button variant="contained" onClick={toggleDrawer(true)}>
          <InfoOutlineIcon />
        </Button>
      </div>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        <div className="credits">
          <p>Hello from the dev 👋</p>

          <Profile />
          <p>
            My name is Vem and the app you are using is a tool to convert any
            text into a QR Code
          </p>
          <p>
            Did you know that if you click the QR Code will save it as an image?
          </p>
        </div>
      </Drawer>
    </div>
  );
}

export default App;
