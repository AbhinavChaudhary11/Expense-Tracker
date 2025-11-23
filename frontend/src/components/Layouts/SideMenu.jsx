import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import CharAvatar from "../Cards/CharAvatar";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white shadow-md sticky top-[61px] z-20">
      <div className="flex items-center space-x-2 p-4">
        {user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl || ""}
            alt="Profile Image"
            className="w-10 h-10 bg-gray-200 rounded-full"
          />
        ) : (
          <CharAvatar
            fullName={user.fullName || "Guest"}
            width="w-10"
            height="h-10"
            style="text-base"
          />
        )}
        <span className="text-gray-950 font-medium">{user.fullName || ""}</span>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center space-x-2 py-3 px-4 rounded-md mb-2 ${
            activeMenu === item.label
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-950 hover:bg-gray-200 transition-colors"
          }`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          <span className="side-menu-item-label">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SideMenu;