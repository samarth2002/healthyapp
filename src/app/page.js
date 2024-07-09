import { Box } from "@mui/material";
import Glass from "../../components/Water/Glass";
import Navbar from "../../components/Navbar/Navbar";
import "./globals.css";
import Stats from "../../components/Water/Stats";
import Water from "../../components/Water/Water";
import TargetComplete from "../../components/Water/TargetComplete";

export default function Home() {

  return (
    <main className="main-container">
      <Navbar />

      <Box
        className="content-container"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Water />
      </Box>
    </main>
  );
}
