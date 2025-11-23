import React, { useEffect } from "react";
import { gsap } from "gsap";

// Register the BezierPlugin directly from gsap
gsap.registerPlugin(gsap.BezierPlugin);

const AuthLayout = ({ children }) => {
  useEffect(() => {
    const bills = document.querySelectorAll('.money-bill');
    const wallet = document.getElementById('wallet');
    const plusSign = document.getElementById('plusSign');
    const walletContainer = document.querySelector(".wallet-container");

    function animateBills() {
      bills.forEach((bill, index) => {
        const side = Math.floor(Math.random() * 4);
        let startX, startY;

        switch (side) {
          case 0: // Top
            startX = Math.random() * window.innerWidth;
            startY = -bill.offsetHeight;
            break;
          case 1: // Right
            startX = window.innerWidth;
            startY = Math.random() * window.innerHeight;
            break;
          case 2: // Bottom
            startX = Math.random() * window.innerWidth;
            startY = window.innerHeight;
            break;
          case 3: // Left
            startX = -bill.offsetWidth;
            startY = Math.random() * window.innerHeight;
            break;
          default:
            startX = 0;
            startY = 0;
        }

        const delay = index * 0.4;
        const duration = 1.8 + Math.random() * 0.4;

        gsap.set(bill, { 
          opacity: 0, 
          x: startX,
          y: startY,
          scale: 0.6 + Math.random() * 0.4,
          rotation: Math.random() * 180 - 90
        });

        gsap.to(bill, {
          opacity: 1,
          scale: 1 + Math.random() * 0.2,
          x: wallet.offsetLeft + wallet.offsetWidth / 2 - bill.offsetWidth / 2,
          y: wallet.offsetTop + wallet.offsetHeight / 2 - bill.offsetHeight / 2,
          duration: duration,
          ease: "sine.inOut",
          delay: delay,
          rotation: Math.random() * 10 - 5,
          bezier: {
            type: "soft",
            values: [
              {
                x: startX + (Math.random() - 0.5) * 100,
                y: startY + (Math.random() - 0.5) * 100
              },
              {
                x: wallet.offsetLeft + wallet.offsetWidth / 2 - bill.offsetWidth / 2,
                y: wallet.offsetTop + wallet.offsetHeight / 2 - bill.offsetHeight / 2
              }
            ],
            autoRotate: false
          },
          onComplete: () => {
            gsap.to(bill, {
              opacity: 0,
              scale: 0.3,
              duration: 0.4,
              ease: "sine.in",
              delay: 0.2,
            });
            if (index === bills.length - 1) {
              showPlusSign();
            }
          }
        });
      });
    }

    function showPlusSign() {
      gsap.set(plusSign, {
        x: wallet.offsetLeft + wallet.offsetWidth / 2 - plusSign.offsetWidth / 2,
        y: wallet.offsetTop - 20,
        opacity: 0
      });
      gsap.to(plusSign, {
        opacity: 1,
        y: wallet.offsetTop - 5,
        duration: 0.6,
        ease: "bounce.out",
        onComplete: () => {
          gsap.to(plusSign, {
            y: wallet.offsetTop - 20,
            duration: 0.6,
            delay: 1,
            opacity: 0,
            ease: "sine.out"
          });
        }
      });
    }

    function resetBills() {
      bills.forEach((bill) => {
        walletContainer.appendChild(bill);
        gsap.set(bill, { opacity: 0, scale: 0.6, x: 0, y: 0, rotation: 0 });
      });
      gsap.set(plusSign, {
        x: wallet.offsetLeft + wallet.offsetWidth / 2 - plusSign.offsetWidth / 2,
        y: wallet.offsetTop - 20,
        opacity: 0
      });
      setTimeout(() => {
        animateBills();
      }, 800);
    }

    animateBills();
    setInterval(resetBills, 4500);
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-purple-200 to-blue-200">
      {/* Left Section: Login Form */}
      <div className="w-screen md:w-[60vw] h-screen flex flex-col items-center justify-center px-6 md:px-12 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Expense Tracker</h2>
        <p className="text-gray-600 mb-6 text-center max-w-sm">
          Welcome back! Manage your finances with our simple and intuitive expense tracking tool.
        </p>
        <div className="w-full max-w-md space-y-6">
          {children}
        </div>
        {/* Decorative line */}
      
      </div>

      {/* Right Section: Wallet Animation */}
      <div className="hidden md:flex w-[40vw] h-screen items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-blue-100/50"></div>
        <div className="relative wallet-container">
          <div
            id="wallet"
            style={{
              width: "180px",
              height: "120px",
              background: "#8B4513",
              borderRadius: "15px",
              position: "relative",
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
              border: "2px dashed #D2B48C"
            }}
          >
            <div
              style={{
                width: "75px",
                height: "30px",
                background: "#ADD8E6",
                position: "absolute",
                top: "45px",
                left: "50%",
                transform: "translateX(-50%)",
                borderRadius: "10px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                border: "1px dashed #B0C4DE"
              }}
            ></div>
            <div
              style={{
                width: "90px",
                height: "45px",
                background: "#A0522D",
                position: "absolute",
                top: "-22px",
                left: "50%",
                transform: "translateX(-50%)",
                borderRadius: "10px 10px 0 0",
                borderBottom: "none",
                border: "2px dashed #D2B48C",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div
                style={{
                  width: "15px",
                  height: "15px",
                  background: "#FFF",
                  borderRadius: "50%",
                  boxShadow: "inset 0px 1px 3px rgba(0, 0, 0, 0.2)"
                }}
              ></div>
            </div>
          </div>
          <div className="money-bill text-4xl" id="bill1">💵</div>
          <div className="money-bill text-4xl" id="bill2">💵</div>
          <div className="money-bill text-4xl" id="bill3">💵</div>
          <div className="plus-sign text-2xl font-bold text-green-500" id="plusSign" style={{ position: "absolute" }}>+</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
