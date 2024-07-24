import React from "react";
import aboutImg from "../components/assets/images/about.jpg";
import aboutImgBanner from "../components/assets/images/about-banner.jpg";
import imgs from "../components/assets/images/join1.png";
import { FaBookDead } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";

export const About = () => {
  return (
    <>
      <section className="about py-16">
        <div className="container">
          <section>
            <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="text-center">
                <h1 class="text-3xl font-bold text-gray-800 mb-4">
                  About the Department
                </h1>
                <p class="text-gray-600 text-lg max-w-2xl mx-auto">
                  The Department of Systems and Computer Engineering is a
                  long-established department that was established in 1978 as
                  the second oldest department in the Arab Republic of Egypt. It
                  has graduated many generations of distinguished engineers who
                  have proven their competence in various fields.
                </p>
              </div>

              <div class="mt-12">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 class="text-xl font-bold text-gray-800 mb-2">
                      Bachelor's Degree
                    </h2>
                    <p class="text-gray-600">
                      The department awards a bachelor's degree in systems and
                      computer engineering to students looking for jobs as
                      engineers in industry or military fields and private and
                      governmental companies.
                    </p>
                  </div>
                  <div>
                    <h2 class="text-xl font-bold text-gray-800 mb-2">
                      Graduate Degrees
                    </h2>
                    <p class="text-gray-600">
                      The department also awards master's and doctoral degrees
                      to students who plan to be researchers or who intend to
                      obtain an advanced degree in engineering. The typical
                      program curriculum includes analytical tools, creative
                      thinking, and a variety of skills.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <div className="heading text-center py-12">
            <h1 className="text-3xl font-semibold text-black">
              About the department
            </h1>
            <span className="text-sm mt-2 block">
              <h1 className="text-1xl font-semibold text-black">
                1-The Department of Systems and Computer Engineering is a
                long-established department that was established in 1978 as the
                second oldest department in the Arab Republic of Egypt.
              </h1>
              <h1 className="text-1xl font-semibold text-black">
                2-It has graduated many generations of distinguished engineers
                who have proven their competence in various fields.
              </h1>
              <h1 className="text-1xl font-semibold text-black">
                3-The department awards abachelor's degree in systems and
                computer engineering to students looking for jobs as engineers
                in industry or military fields and private and governmental
                companies.
              </h1>
              <h1 className="text-1xl font-semibold text-black">
                4-The department also awards master's and doctoral degrees to
                students who plan to be researchers or who intend to obtain an
                advanced degree in engineering. The typical program curriculum
                includes analytical tools, creative thinking, and a variety of
                skills.
              </h1>
            </span>
          </div> */}
          {/* <div className='grid grid-cols-4 gap-5 mt-5 md:grid-cols-2'>
            <AboutCard color='bg-[#2D69F0]' icon={<FaBookDead size={50} />} title='4,000 Online courses' desc="You don't have to struggle alone, you've " />
            <AboutCard color='bg-[#DD246E]' icon={<FaBookDead size={50} />} title='4,000 Online courses' desc="You don't have to struggle alone, you've " />
            <AboutCard color='bg-[#8007E6]' icon={<FaBookDead size={50} />} title='4,000 Online courses' desc="You don't have to struggle alone, you've " />
            <AboutCard color='bg-[#0CAE74]' icon={<FaBookDead size={50} />} title='4,000 Online courses' desc="You don't have to struggle alone, you've " />
          </div> */}
        </div>
      </section>
      <AboutContent />
    </>
  );
};
export const AboutCard = (props) => {
  return (
    <div
      className={`box shadow-md p-5 py-8 rounded-md text-white ${props.color} cursor-pointer transition ease-in-out delay-150 hover:-translate-y-4 duration-300 `}
    >
      <div className="icon">{props.icon}</div>
      <div className="text mt-5">
        <h4 className="text-lg font-semibold my-3">{props.title}</h4>
        <p className="text-sm">{props.desc}</p>
      </div>
    </div>
  );
};

export const AboutContent = () => {
  return (
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
              learning and research for postgraduate success. Motivating faculty
              to elevate the educational experience and drive innovative
              studies. Providing expert technical consultations to support the
              college, university, and beyond. Collaborating with the community
              to drive meaningful development.
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
  );
};
