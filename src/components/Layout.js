import React from "react";
import Header from "./header/Header";
import { Container } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container maxW="container.lg" marginTop="80px">
        {children}
      </Container>
    </>
  );
};
export default Layout;
