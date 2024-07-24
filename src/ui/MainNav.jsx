import { NavLink, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
// import Subjects from "../pagesGrade/Subjects";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import { getCurrentUser } from "../services/apiAuth";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AiOutlineLink, AiTwotoneCalendar } from "react-icons/ai";
import { FaPlusCircle } from "react-icons/fa";
import {
  HiOutlineChartBar,
  HiOutlineClipboardCheck,
  HiOutlineCollection,
  HiOutlineDocumentAdd,
  HiOutlineDocumentText,
  HiOutlineStar,
} from "react-icons/hi";
import { useSubject } from "../features/subjects/useSubject";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  /* gap: 0.8rem; */
  gap: 0.4rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    /* gap: 1.2rem; */
    gap: 1rem;
    color: #4b5563;
    /* font-size: 1.6rem; */
    font-size: 1rem;
    font-weight: 500;
    /* padding: 1.2rem 2.4rem; */
    padding: 1rem 2rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: #1f2937;
    background-color: #f9fafb;
    border-radius: 5px;
  }

  & svg {
    /* width: 2.4rem; */
    width: 2rem;
    /* height: 2.4rem; */
    height: 2rem;
    color: #9ca3af;
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: #4f46e5;
  }
`;

function MainNav() {
  const navigate = useNavigate();
  const target = "quiz1";
  const { subjectId } = useParams();
  const token = localStorage.getItem("token");
  const [questions, setQuestions] = useState("");
  useEffect(
    function () {
      fetch(`http://localhost:5000/api/v1/questions?course=${subjectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setQuestions(data))
        .catch((err) => console.log("Errror"));
    },
    [token, subjectId]
  );

  console.log(questions?.data?.length);
  const { year } = useParams();
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  const { subject } = useSubject();
  console.log(subject?.data?.course?.instructor);
  const instructor1 = user?.data?.user?.name;
  const instructor2 = subject?.data?.course?.instructor;

  const user1 = user?.data?.user?.role;
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to={`/home`}>
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to={`/${year}/subjects`}>
            <HiOutlineCollection />
            <span>courses</span>
          </StyledNavLink>
        </li>
        {user?.data?.user?.role === "user" ? (
          ""
        ) : (
          <li>
            <StyledNavLink to={`/${year}/cabins`}>
              {/* <HiOutlineHomeModern /> */}
              <HiOutlineDocumentAdd />
              <span>CreateCourse</span>
            </StyledNavLink>
          </li>
        )}
        {user?.data?.user?.role === "user" ? (
          ""
        ) : (
          <>
            <li>
              <StyledNavLink to={`/${year}/users`}>
                <HiOutlineUsers />
                <span>Users</span>
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink to={`/${year}/instructors`}>
                <HiOutlineUsers />
                <span>Instructors</span>
              </StyledNavLink>
            </li>
          </>
        )}
        {instructor1 === instructor2 || user1 === "user" ? (
          <>
            {subjectId ? (
              <>
                <li>
                  <StyledNavLink to={`/${year}/subjects/grades/${subjectId}`}>
                    {/* <HiOutlineUsers /> */}
                    <HiOutlineDocumentText />

                    <span>Grades</span>
                  </StyledNavLink>
                </li>

                {user1 === "user" ? (
                  ""
                ) : (
                  <li>
                    <StyledNavLink
                      to={`/${year}/subjects/createQuiz/${subjectId}`}
                    >
                      <FaPlusCircle />
                      <span>CreateQuiz</span>
                    </StyledNavLink>
                  </li>
                )}
                <li>
                  <StyledNavLink to={`/${year}/subjects/tasks/${subjectId}`}>
                    <FaPlusCircle />
                    <span>tasks</span>
                  </StyledNavLink>
                </li>
              </>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
        <li>
          <StyledNavLink to={`/${year}/profile`}>
            <HiOutlineCog6Tooth />
            <span>Profile</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
