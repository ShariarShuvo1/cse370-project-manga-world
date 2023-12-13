import { useContext, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../../../Auth/Auth";

function Header() {
  const [logoSrc, setLogoSrc] = useState<string>(
    require("./../../../Assets/Images/Icons/Logos/wt-tns-logo.png")
  );

  const {
    authorised,
    setAuthorised,
    userId,
    setUserId,
    userType,
    setUserType,
  } = useContext(Auth);
  let navigate = useNavigate();

  return (
    <>
      <div className="flex bg-black text-white text-2xl items-center justify-between mx-auto">
        <div className="flex items-center">
          <Link to={"/"}>
            <img
              src={logoSrc}
              alt="Anime World Logo"
              className="w-16 p-1 hover:cursor-pointer"
              onMouseOver={() => {
                setLogoSrc(
                  require("./../../../Assets/Images/Icons/Logos/hover-logo.png")
                );
              }}
              onMouseDown={() => {
                setLogoSrc(
                  require("../../../Assets/Images/Icons/Logos/active-logo.png")
                );
              }}
              onMouseUp={() => {
                setLogoSrc(
                  require("../../../Assets/Images/Icons/Logos/hover-logo.png")
                );
              }}
              onBlur={() => {
                setLogoSrc(
                  require("../../../Assets/Images/Icons/Logos/wt-tns-logo.png")
                );
              }}
              onMouseOut={() => {
                setLogoSrc(
                  require("../../../Assets/Images/Icons/Logos/wt-tns-logo.png")
                );
              }}
            />
          </Link>
          <p className="font-bold text-3xl pl-1">Manga World</p>
        </div>

        <SearchBar />
        {authorised === "false" && (
          <div>
            <Link
              to="/login"
              className="bg-white hover:bg-gray-300 text-black font-bold py-1.5 px-2 rounded focus:outline-none focus:shadow-outline me-1"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white hover:bg-gray-300 text-black font-bold py-1.5 px-2 rounded focus:outline-none focus:shadow-outline me-1"
            >
              Sign Up
            </Link>
          </div>
        )}

        {authorised === "true" && (
          <div className="flex">
            <Link
              to="/profile"
              className="bg-white hover:bg-gray-300 text-black font-bold py-1.5 px-2 rounded focus:outline-none focus:shadow-outline me-1"
            >
              Profile
            </Link>
            {userType === "admin" && (
              <Link
                to="/addNewManga"
                className="bg-white hover:bg-gray-300 text-black font-bold py-1.5 px-2 rounded focus:outline-none focus:shadow-outline me-1"
              >
                Add New
              </Link>
            )}
            {userType === "admin" && (
              <Link
                to="/adminPanel"
                className="bg-white hover:bg-gray-300 text-black font-bold py-1.5 px-2 rounded focus:outline-none focus:shadow-outline me-1"
              >
                Admin Panel
              </Link>
            )}
            <div
              onClick={(e) => {
                setAuthorised("false");
                setUserId("");
                setUserType("");
              }}
              className="bg-white hover:bg-gray-300 hover:cursor-pointer text-black font-bold py-1.5 px-2 rounded focus:outline-none focus:shadow-outline me-1"
            >
              Log Out
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
