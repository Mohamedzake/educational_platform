import React, { useState } from "react";
import LogoImg from "../assets/images/lms-kuy2.png";
import { LinkData } from "../assets/data/dummydata";
import { NavLink, useNavigate } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";
import { HiOutlineMenuAlt1, HiViewGrid } from "react-icons/hi";
import MenuIntroduction from "./MenuIntroduction";
import { useQueryClient } from "@tanstack/react-query";
import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import styled from "styled-components";
const Img = styled.img`
  width: 80px;
  height: 80px;
`;
export const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // function logiin() {
  //   console.log("hello");
  //   navigate("/login");
  // }

  const queryClient = useQueryClient();
  function tokenn() {
    queryClient.removeQueries();
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  }

  return (
    <>
      <header className="bg-white py-1 text-black sticky z-50 shadow-md top-0 left-0 w-full">
        <div className="container flex justify-between items-center">
          <div className="logo flex items-center gap-6">
            <Img src={LogoImg} alt="logo" />
            <div className="category flex items-center text-sm gap-3">
              <HiViewGrid size={20} />
              <span>category</span>
            </div>
          </div>
          <nav className={open ? "mobile-view" : "desktop-view"}>
            <ul className="flex items-center gap-6">
              {LinkData.map((link) => (
                <li key={link.id} onClick={() => setOpen(null)}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "text-primary text-sm" : "text-[15px]"
                    }
                    to={link.url}
                  >
                    {link.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="account flex items-center gap-5">
            <MenuIntroduction />
            {/* <button>
              <BiShoppingBag size={25} />
            </button> */}
            <ButtonIcon onClick={tokenn}>
              <HiArrowRightOnRectangle />
            </ButtonIcon>
            {/* <button onClick={() => logiin()}>Log out</button> */}
            <button className="open-menu" onClick={() => setOpen(!open)}>
              <HiOutlineMenuAlt1 size={25} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
