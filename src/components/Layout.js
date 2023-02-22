import React from "react";
import Header from "./header/Header";
import { Container } from "@chakra-ui/react";
import Footer from "./footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container maxW="container.md" marginTop="80px">
        {children}
      </Container>
      {/* <Footer /> */}
    </>
  );
};
export default Layout;
