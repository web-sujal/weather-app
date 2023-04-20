import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import useGeolocation from "../../hooks/useGeolocation";

const Navbar = () => {
  const { city } = useGeolocation();

  return (
    <div
      className="sticky top-0 flex justify-between items-center py-4 
      px-2 text-white z-50"
    >
      <div
        className="flex space-x-1 items-center justify-center 
      px-0 z-10"
      >
        <LocationOnIcon />
        <span className="font-heading text-2xl tracking-widest capitalize">
          {city}
        </span>
      </div>
      <MenuIcon className="z-10 mr-2" />

      {/* gradient */}
      <div
        className="absolute top-0 right-0 left-0 bottom-0 h-full
         bg-gradient-to-b from-black to-transparent opacity-90 z-0"
      ></div>
    </div>
  );
};

export default Navbar;
