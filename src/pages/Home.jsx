import React from "react";
import heroImg from "../components/assets/images/hero.png";
import heroImgback from "../components/assets/images/hero-shape-purple.png";
import { FiSearch } from "react-icons/fi";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { FaBookReader, FaGraduationCap, FaUsers } from "react-icons/fa";
import { About, AboutContent } from "./About";
import { Courses } from "./Courses";
import { Instructor } from "./Instructor";
import { Blog } from "./Blog";
import { NavLink } from "react-router-dom";
import { AiOutlineCheck } from "react-icons/ai";
import aboutImg from "../components/assets/images/about.jpg";
import test from "../components/assets/images/test.jpg";
import users from "../components/assets/images/users.png";
import aboutImgBanner from "../components/assets/images/about-banner.jpg";
import imgs from "../components/assets/images/join1.png";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { apiUsers } from "../services/apiUsers";
import { apiCabinsT } from "../services/apiCabins";
const Img = styled.img`
  height: 350px;
  width: 400px;
`;
const Img2 = styled.img`
  height: 150px;
  width: 200px;
`;
const Div = styled.div`
  display: grid;
  place-items: center;
  justify-content: center;
`;
export const Home = () => {
  return (
    <>
      <HomeContent />
      <br />

      {/* <AboutContent /> */}
      {/* <About /> */}

      {/* <Courses /> */}
      {/* <Instructor /> */}
      <Blog />
    </>
  );
};
export const HomeContent = () => {
  const year = "general";

  const { data: date3 } = useQuery({
    queryKey: ["instructor"],
    queryFn: () => apiUsers(year),
  });
  console.log(date3?.users);
  const { data: date2 } = useQuery({
    queryKey: ["courses"],
    queryFn: () => apiCabinsT(),
  });
  console.log(date2?.courses);
  return (
    <>
      <section className="bg-secondary py-10 h-[92vh] md:h-full">
        <div className="container">
          <div className="flex items-center justify-center md:flex-col gap-16">
            <div className="left w-1/2 text-black md:w-full">
              <h1 className="text-3xl leading-tight text-black font-semibold">
                Department of Systems and Computer Engineering
                {/* Launch your{" "}
                <br /> Own online learning <br /> Platform */}
              </h1>
              <h3 className="text-lg mt-3">
                this Department is a pioneering educational and research program
                in the field of systems and computer engineering and a
                competitor at the local and regional levels.
                {/* Unlimited access to all 60+ instructors. */}
              </h3>
              <button className="px-6 py-3 border border-gray-400 rounded-lg text-md mt-20 bg-blue-500 text-white hover:bg-blue-600">
                <NavLink to="/about">Learn More</NavLink>
              </button>
            </div>
            <div className="right w-1/2 md:w-full relative">
              <div className="images relative">
                <img
                  src={heroImgback}
                  alt=""
                  className=" absolute top-32 left-10 w-96 md:left-10"
                />
                <div className="img h-[85vh] w-full">
                  <img
                    src={heroImg}
                    alt=""
                    className="h-full w-full object-contain z-0 relative"
                  />
                </div>
              </div>
              <div className="content">
                <button className="bg-white shadow-md absolute top-56 left-0 z-0 p-2 flex items-center rounded-md">
                  <div className="icon w-10 h-10 text-white rounded-full flex items-center justify-center bg-orange-400">
                    <BsFillLightningChargeFill size={25} />
                  </div>
                  <div className="text flex flex-col items-start px-4">
                    <span className="text-sm text-black">Congrstulations</span>
                    <span className="text-[12px]">
                      Your admission completed
                    </span>
                  </div>
                </button>
                <button className="bg-white shadow-md absolute bottom-32 left-48 z-0 p-2 flex items-center rounded-md pr-8">
                  <div className="icon w-10 h-10 text-white rounded-full flex items-center justify-center bg-blue-400">
                    <FaGraduationCap size={25} />
                  </div>
                  <div className="text flex flex-col items-start px-4">
                    <span className="text-sm text-black">450K</span>
                    <span className="text-[12px]">Assisted Student</span>
                  </div>
                </button>
                <button className="bg-white shadow-md absolute top-56 -right-32 z-0 p-2  md:top-96 md:-right-5 flex items-center rounded-md">
                  <div className="icon w-10 h-10 text-white rounded-full flex items-center justify-center bg-orange-400">
                    <FaUsers size={25} />
                  </div>
                  <div className="text flex flex-col items-start px-4">
                    <span className="text-sm text-black">
                      User Experience Class
                    </span>
                    <span className="text-[12px]">Tomorrow is our</span>
                  </div>
                </button>
                <button className="bg-white shadow-md absolute top-32 right-32 z-0 p-2 flex items-center rounded-md">
                  <div className="icon w-10 h-10 text-white rounded-full flex items-center justify-center bg-indigo-400">
                    <FaBookReader size={25} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
      <div className="heading py-12 text-center w-2/3 m-auto md:w-full">
        <h1 className="text-3xl font-semibold text-black">Our Message</h1>
        <span className="text-[14px] mt-2 block">
          The Systems and Computer Engineering Program - Al-Azhar Engineering
          committed to graduating engineers with advanced reference to compete
          in the distinguished labor market in the disciplines of systems and
          computer engineering participating in community development within a
          framework of Islamic values.
        </span>
      </div>
      <section className="mb-16">
        <div className="container flex md:flex-col">
          <div className="left w-1/3 md:w-full mr-8 md:mr-0 relative">
            <img src={aboutImg} alt="aboutImg" className=" rounded-xl" />
            {/* <img
              src={aboutImgBanner}
              alt="aboutImg"
              className="rounded-xl absolute -bottom-14 -left-24 h-56 md:left-80"
            />
            <div className="img-group ml-24 mt-3">
              <img src={imgs} alt="" />
              <span className="text-[14px]">
                Join over <label className="text-black text-sm">30000+</label>{" "}
                students
              </span>
            </div> */}
          </div>
          <div className="right w-2/3 md:w-full md:mt-16">
            <div className="heading w-4/5 md:w-full">
              <h1 className="text-3xl font-semibold text-black">
                Achieve Your Goals With Educal
              </h1>
              <span className="text-sm mt-2 block leading-6">
                <h1 className="text-black text-sm">
                  The Department of Systems and Computer Engineering aims to:
                </h1>
                Cultivating distinguished engineers equipped to compete and meet
                industry demands. Developing cutting-edge curricula to maintain
                the program's competitive edge globally. Fostering continuous
                learning and research for postgraduate success. Motivating
                faculty to elevate the educational experience and drive
                innovative studies. Providing expert technical consultations to
                support the college, university, and beyond. Collaborating with
                the community to drive meaningful development.
              </span>
              <ul className="my-5">
                <li className="text-sm flex items-center gap-5">
                  <AiOutlineCheck className="text-green-500" /> Upskill your
                  organization.
                </li>
                <li className="text-sm flex items-center gap-5 my-2">
                  <AiOutlineCheck className="text-green-500" />
                  Access more then 20 courses
                </li>
                <li className="text-sm flex items-center gap-5">
                  <AiOutlineCheck className="text-green-500" />
                  Learn the latest skills
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
      <br />

      <section className="mb-16">
        <div className="container flex md:flex-col">
          <div className="right w-2/3 md:w-full md:mt-16">
            <div className="heading w-4/5 md:w-full">
              <h1 className="text-2xl font-semibold text-black">
                inspiring Instructors Shaping Futures
              </h1>
              <span className="text-sm mt-2 block leading-6">
                <h1 className="text-black text-sm">
                  instructors are vital in shaping students' futures :
                </h1>
                Their dedication and passion inspire learning and personal
                growth. Beyond teaching, they mentor and guide, helping students
                discover their true potential. Instructors create an environment
                that fosters critical thinking and a love for learning, making a
                lasting impact on both academic and personal development. Their
                contributions extend beyond the classroom, influencing the
                future leaders and innovators of our society.
              </span>

              <ul className="my-5">
                <li className="text-sm flex items-center gap-5">
                  <AiOutlineCheck className="text-green-500" /> Elevate your
                  education.
                </li>
                <li className="text-sm flex items-center gap-5 my-2">
                  <AiOutlineCheck className="text-green-500" />
                  Benefit from dedicated mentors.
                </li>
                <li className="text-sm flex items-center gap-5">
                  <AiOutlineCheck className="text-green-500" />
                  Learn the latest skills
                </li>
                <li className="text-sm flex items-center gap-5">
                  <AiOutlineCheck className="text-green-500" />
                  Unlock your full potential.
                </li>
              </ul>
            </div>
          </div>
          <div className="left w-1/3 md:w-full mr-8 md:mr-0 relative">
            <Img src={test} alt="testImg" className=" rounded-xl" />
            {/* <img
              src={aboutImgBanner}
              alt="aboutImg"
              className="rounded-xl absolute -bottom-14 -left-24 h-56 md:left-80"
            />
            <div className="img-group ml-24 mt-3">
              <img src={imgs} alt="" />
              <span className="text-[14px]">
                Join over <label className="text-black text-sm">30000+</label>{" "}
                students
              </span>
            </div> */}
          </div>
        </div>
      </section>
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
          <div className="grid grid-cols-3 gap-5 md:grid-cols-1">
            {date3?.users.slice(0, 6).map((items) => (
              <div className="box rounded-lg shadow-shadow1 bg-white">
                <Div className="images rounded-t-lg relative overflow-hidden h-40 w-ful">
                  <Img2
                    src={items.image || "/users.png"}
                    alt=""
                    // className="rounded-t-lg object-cover w-full h-full transition ease-in-out delay-150 cursor-pointer hover:scale-125 duration-300"
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
        </div>
      </section>
      <section className="courses  py-16 ">
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
            {date2?.courses?.slice(0, 4).map((items) => (
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
