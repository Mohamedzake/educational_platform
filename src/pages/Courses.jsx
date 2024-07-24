import React from "react";
import { courses } from "../components/assets/data/dummydata";
import { FaBook } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import { apiUsers } from "../services/apiUsers";
import { apiCabins, apiCabinsT } from "../services/apiCabins";

export const Courses = () => {
  // const year = "general";
  // const year = "first";
  const { data: date3 } = useQuery({
    queryKey: ["courses"],
    queryFn: () => apiCabinsT(),
  });
  console.log(date3?.courses);
  return (
    <>
      <section className="courses bg-[#F3F4F8] py-16 ">
        <div className="w-4/5 m-auto">
          <div className="heading py-12 text-center w-2/3 m-auto md:w-full">
            <h1 className="text-3xl font-semibold text-black">Our Courses</h1>
            <span className="text-[14px] mt-2 block">
              Our university takes pride in our exceptional course catalog,
              designed to empower students like you. Whether you seek to deepen
              expertise or explore new frontiers, our diverse range of courses
              will inspire and challenge you.
            </span>
          </div>

          <div className="grid grid-cols-4 gap-5 md:grid-cols-1">
            {date3?.courses?.slice(0, 8).map((items) => (
              <div className="box rounded-lg shadow-shadow1 bg-white">
                <div className="images rounded-t-lg relative overflow-hidden h-40 w-ful">
                  <img
                    src={items.image || "/default-image.jpg"}
                    alt=""
                    className="rounded-t-lg object-cover w-full h-full transition ease-in-out delay-150 cursor-pointer hover:scale-125 duration-300"
                  />
                </div>
                <div className="text p-1">
                  <NavLink>
                    <h3 className="text-black my-4 font-medium h-10">
                      {items.name}
                    </h3>
                  </NavLink>
                </div>
                {/* <span className="text-[14px] bg-pink-700 p-1 px-3 text-white rounded-[5px] shadow-md">
                  for {items.year} year
                </span> */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
