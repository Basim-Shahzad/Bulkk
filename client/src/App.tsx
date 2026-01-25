import { useState } from "react";
import Homepage from "./pages/HomePage";
import "./App.css";
import Navbar from "./layout/Navbar";
import Dashboard from "./pages/DashboardPage";

function App() {
   return (
      <div>
         <Navbar />
         <Homepage />
      </div>
   );
}

export default App;
