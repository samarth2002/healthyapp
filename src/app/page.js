import { Box } from "@mui/material";
import Glass from "../../components/Water/Glass";
import Navbar from "../../components/Navbar/Navbar";
import "./globals.css";

export default function Home() {
  return (
    <main className="main-container">
      <Navbar />
      <Box className="content-container">
        <Glass />
      </Box>
    </main>
  );
}
