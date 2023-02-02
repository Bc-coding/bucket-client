import { useState } from "react";
import {
  Flex,
  Switch,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { Redirect } from "react-router";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  // Use form state
  const { values, handleChange, handleSubmit } = useForm(
    credentials => loginUser(),
    {
      email: "",
      password: "",
    }
  );

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  // Lazy query for login user method
  const [loginUser, { called, loading, data, error }] = useLazyQuery(
    LOGIN_USER,
    { variables: values }
  );

  // Wait for lazy query
  if (called && loading) return <div>Loading...</div>;

  // Show error message if lazy query fails
  if (error) return <div>{error.message}</div>;

  // Store token if login is successful
  if (data) {
    window.localStorage.setItem("token", data.loginUser.token);

    // Redirect to home page
    return <Redirect to="/" />;
  }

  return (
    <Layout>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        paddingTop="80px"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="teal.500" />
          <Heading color="teal.400">Welcome</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4} p="1rem" boxShadow="md">
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      required
                      id="email"
                      name="email"
                      type="email"
                      placeholder="email address"
                      value={values.email}
                      onChange={handleChange}
                      autoFocus
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      required
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={values.password}
                      onChange={handleChange}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText textAlign="right">
                    <Link>forgot password?</Link>
                  </FormHelperText>
                </FormControl>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          Haven't created an account with us?{" "}
          <Link color="teal.500" href="#">
            Sign up here!
          </Link>
        </Box>
      </Flex>
    </Layout>
  );
};

export default Login;
