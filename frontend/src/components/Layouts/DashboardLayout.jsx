import React, { useContext, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { UserContext } from "../../context/UserContext";

gsap.registerPlugin(gsap.BezierPlugin);

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    // Slide-in animation for SideMenu
    gsap.from(".side-menu", {
      x: -200,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    // Fade-in animation for Navbar
    gsap.from(".navbar", {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });

    // Fade-in and scale for main content
    gsap.from(contentRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 1,
      ease: "power2.out",
      delay: 0.2,
    });

    // Hover effect for SideMenu items
    const menuItems = document.querySelectorAll(".side-menu-item");
    menuItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        gsap.to(item, {
          scale: 1.05,
          backgroundColor: "#4f46e5",
          color: "#fff",
          duration: 0.3,
          ease: "power1.out",
        });
      });
      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          scale: 1,
          backgroundColor: item.classList.contains("active") ? "#3b82f6" : "transparent",
          color: item.classList.contains("active") ? "#fff" : "#000",
          duration: 0.3,
          ease: "power1.out",
        });
      });
    });

    return () => {
      menuItems.forEach((item) => {
        item.removeEventListener("mouseenter", () => {});
        item.removeEventListener("mouseleave", () => {});
      });
    };
  }, [user]);

  return (
    <div className="">
      {/* Fixed navbar */}
      <div className="navbar fixed top-0 left-0 right-0 z-50">
        <Navbar activeMenu={activeMenu} />
      </div>

      {user && (
        <div className="flex min-h-screen bg-gradient-to-r from-purple-200 to-blue-200">
          <div className="max-[1080px]:hidden side-menu">
            <SideMenu activeMenu={activeMenu} />
          </div>

          {/* Padding top to avoid content going under navbar */}
          <div className="grow mx-5 pt-16" ref={contentRef}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
