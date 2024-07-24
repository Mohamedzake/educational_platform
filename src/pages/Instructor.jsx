import React from "react";
import { FaGraduationCap, FaUsers } from "react-icons/fa";
import { GiEvilBook, GiWorld } from "react-icons/gi";
import { NavLink, useParams } from "react-router-dom";
import { courses } from "../components/assets/data/dummydata";
import { AiTwotoneCalendar } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { apiUsers } from "../services/apiUsers";
import styled from "styled-components";
const Img2 = styled.img`
  height: 150px;
  width: 200px;
`;
const Div = styled.div`
  display: grid;
  place-items: center;
  justify-content: center;
`;
export const Instructor = () => {
  // const { year } = useParams;
  // const year = "first";
  const year = "general";

  const { data: date3 } = useQuery({
    queryKey: ["instructor"],
    queryFn: () => apiUsers(year),
  });
  console.log(date3?.users);
  return (
    <>
      <section className="instructor mb-16">
        <div className="container">
          <div className="heading py-12 text-center w-2/3 m-auto md:w-full">
            <h1 className="text-3xl font-semibold text-black">
              Faculty members
            </h1>
            <span className="text-[14px] mt-2 block">
              Our university takes great pride in the exceptional faculty
              members who lead our academic programs. As distinguished scholars,
              researchers, and practitioners, our faculty bring a wealth of
              knowledge and real-world experience to the classroom.
            </span>
          </div>
          <div className="grid grid-cols-4 gap-5 md:grid-cols-1">
            {date3?.users?.slice(0, 8).map((items) => (
              <div className="box rounded-lg shadow-shadow1 bg-white">
                <Div className="images rounded-t-lg relative overflow-hidden h-40 w-ful">
                  <Img2
                    src={items.image || "/users.png"}
                    alt=""
                    // className="rounded-t-lg object-cover w-full h-full transition ease-in-out delay-150 cursor-pointer hover:scale-125 duration-300"
                  />
                </Div>
                <div className="text p-1">
                  <NavLink>
                    <h3 className="text-black my-4 font-medium h-10">
                      {items.name}
                    </h3>
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="content grid grid-cols-2 gap-5 md:grid-cols-1">
            <div className="images rounded-lg relative overflow-hidden h-72 w-ful before:bg-backbg before:h-72 before:w-full before:absolute before:top-0 before:left-0 before:content before:z-10">
              <img
                src="https://bdevs.net/wp/educal/wp-content/uploads/2021/09/what-1.jpg"
                alt=""
                className="rounded-t-lg object-cover w-full h-72"
              />
              <div className="categ flex flex-col gap-4 absolute top-5 z-30 m-3 p-8 items-center justify-center text-center">
                <h2 className="text-3xl text-white font-semibold">
                  Mostly Online Learning
                </h2>
                <button className="text-[15px] py-2 px-4 border border-gray-200 rounded-md text-white">
                  Start a class today
                </button>
              </div>
            </div>
            <div className="images rounded-lg relative overflow-hidden h-72 w-ful before:bg-backbg before:h-72 before:w-full before:absolute before:top-0 before:left-0 before:content before:z-10">
              <img
                src="https://bdevs.net/wp/educal/wp-content/uploads/2021/09/what-2.jpg"
                alt=""
                className="rounded-t-lg object-cover w-full h-72 relative"
              />
              <div className="categ flex flex-col gap-4 absolute top-5 z-30 m-3 p-8 items-center justify-center text-center">
                <h2 className="text-3xl text-white font-semibold">
                  Become an Instructor
                </h2>
                <button className="text-[15px] py-2 px-4 border border-gray-200 rounded-md text-white">
                  Start a class today
                </button>
              </div>
            </div>
          </div> */}
          <div className="content">
            <div className="heading py-12 text-center w-2/3 m-auto md:w-full">
              <h1 className="text-3xl font-semibold text-black">
                We Are Proud
              </h1>
              <span className="text-[14px] mt-2 block">
                Our exceptional faculty are here to guide and assist you every
                step of the way. You don't have to struggle alone - with their
                expertise and support, you can thrive.
              </span>
            </div>
            <div className="content grid grid-cols-4 gap-5 md:grid-cols-2">
              <InstructorCard
                color="text-red-500"
                icon={<FaUsers size={40} />}
                title="600"
                desc="Students Enrolled"
              />
              <InstructorCard
                color="text-orange-500"
                icon={<GiEvilBook size={40} />}
                title="20"
                desc="Total Courses"
              />
              <InstructorCard
                color="text-purple-500"
                icon={<FaGraduationCap size={40} />}
                title="25000"
                desc="Graduates"
              />
              <InstructorCard
                color="text-indigo-500"
                icon={<GiWorld size={40} />}
                title="3000"
                desc="International Students"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export const InstructorCard = (props) => {
  return (
    <div className={`box p-5 py-5 rounded-md`}>
      <div className={`${props.color}`}>{props.icon}</div>
      <div className="text mt-2">
        <h4 className="text-lg font-semibold text-black">{props.title}</h4>
        <p className="text-[15px]">{props.desc}</p>
      </div>
    </div>
  );
};
