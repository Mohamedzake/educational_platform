import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;

  grid-template-columns: 20rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  /* background-color: #f9fafb; */
  background-color: #e5e7eb;
  /* padding: 3.6rem 4rem 6rem; */
  padding: 2rem 3rem 6rem;
  overflow: scroll;
`;
function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
