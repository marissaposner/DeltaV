import type { V2_MetaFunction } from "@remix-run/node";
import { Stack, Box, Text, Divider, Button, Select } from '@chakra-ui/react'
import { ReactIcon } from '@chakra-ui/icons'

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Connectr" },
    { name: "description", content: "fffff" },
  ];
};

export default function Index() {
  return (
  <Stack borderRadius="27.71px" width="1339px" height="1076px" maxWidth="100%">
    <Box>
      <Box>
        <Box>
          <Stack
            borderRadius="27.71px"
            borderColor="#FFFFFF"
            borderStartWidth="13.23px"
            borderEndWidth="13.23px"
            borderTopWidth="13.23px"
            borderBottomWidth="13.23px"
            width="1330px"
            height="1070.25px"
            maxWidth="100%"
            background="#F9F9F9"
            boxShadow="18.9px 31.19px 91.23px 0px rgba(0, 0, 0, 0.09)"
            backdropFilter="blur(60.32px)"
          >
            <Stack justify="flex-start" align="flex-start" spacing="0px">
              <Stack width="1034.45px" height="62.81px" maxWidth="100%">
                <Box
                  width="1034.45px"
                  height="62.81px"
                  maxWidth="100%"
                  background="#FFFFFF"
                  borderColor="#F1F1F5"
                />
                <Text
                  fontFamily="Roboto"
                  lineHeight="1.62"
                  fontWeight="medium"
                  fontSize="14.78px"
                  letterSpacing="0.09px"
                  color="#696974"
                >
                  West Coast Managers
                </Text>
                <Text
                  fontFamily="Roboto"
                  lineHeight="1.62"
                  fontWeight="regular"
                  fontSize="14.78px"
                  letterSpacing="0.09px"
                  color="#696974"
                >
                  66%
                </Text>
                <Text
                  fontFamily="Roboto"
                  lineHeight="1.62"
                  fontWeight="regular"
                  fontSize="14.78px"
                  letterSpacing="0.09px"
                  color="#696974"
                >
                  45
                </Text>
                <Text
                  fontFamily="Roboto"
                  lineHeight="1.62"
                  fontWeight="regular"
                  fontSize="14.78px"
                  letterSpacing="0.09px"
                  color="#696974"
                >
                  74%
                </Text>
              </Stack>
            </Stack>
            <Divider />
            <Stack
              direction="row"
              justify="flex-start"
              align="center"
              spacing="14.78px"
            >
              <Text
                fontFamily="Inter"
                fontWeight="bold"
                fontSize="22.17px"
                color="Base Shade . 100"
              >
                Create Endpoints
              </Text>
            </Stack>
            <Stack
              width="212.43px"
              height="1073.24px"
              boxShadow="0px 4.62px 18.47px 0px rgba(0, 0, 0, 0.05)"
            >
              <Stack
                borderRadius="18.47px"
                borderColor="Stroke Color"
                borderStartWidth="0.92px"
                borderEndWidth="0.92px"
                borderTopWidth="0.92px"
                borderBottomWidth="0.92px"
                width="227.21px"
                height="1073.24px"
                background="Base White . 100"
              >
                <Stack
                  justify="flex-start"
                  align="flex-start"
                  spacing="36.94px"
                  width="212.43px"
                >
                  <Stack width="1339px" height="1079px" maxWidth="100%">
                    <Text
                      fontFamily="Martel"
                      fontWeight="regular"
                      fontSize="20px"
                      letterSpacing="-0.14px"
                      color="#000000"
                      width="147px"
                      height="21px"
                    >
                      Connectr
                    </Text>
                  </Stack>
                  <Stack
                    paddingX="18.47px"
                    paddingY="22.17px"
                    width="230.9px"
                    height="64.65px"
                    justify="center"
                    align="flex-start"
                    spacing="9.24px"
                  />
                </Stack>
                <Button
                  leftIcon={<ReactIcon data-icon="CkReact" />}
                  size="lg"
                  colorScheme="blue"
                  width="178px"
                  height="42px"
                >
                  Endpoints
                </Button>
              </Stack>
              <Text
                fontFamily="Inter"
                lineHeight="1.25"
                fontWeight="semibold"
                fontSize="14.78px"
                letterSpacing="-0.18px"
                color="Base Shade . 50"
              >
                Support
              </Text>
              <Box
                borderRadius="9.24px"
                width="178.26px"
                height="42.49px"
                background="rgba(27, 89, 248, 0.1)"
              />
              <Text
                fontFamily="Inter"
                fontWeight="medium"
                fontSize="12.93px"
                letterSpacing="-0.14px"
                color="#4D4D4D"
              >
                Actions
              </Text>
              <Text
                fontFamily="Inter"
                fontWeight="medium"
                fontSize="12.93px"
                letterSpacing="-0.14px"
                color="#1B59F8"
              >
                Endpoints
              </Text>
              <Text
                fontFamily="Inter"
                fontWeight="medium"
                fontSize="12.93px"
                letterSpacing="-0.14px"
                color="Base Shade . 70"
              >
                Get Started
              </Text>
              <Stack width="22.17px" height="22.17px">
                <Box>
                  <Box />
                </Box>
              </Stack>
              <Text
                fontFamily="Inter"
                fontWeight="medium"
                fontSize="12.93px"
                letterSpacing="-0.14px"
                color="Base Shade . 70"
              >
                Settings
              </Text>
              <Stack width="22.17px" height="22.17px" />
              <Stack width="24.09px" height="22.17px" />
              <span className="unsupported" />
              <Box
                borderRadius="22.17px"
                width="31.4px"
                height="31.4px"
                background="Photo . Key"
                borderColor="#E2E2EA"
              />
              <Text
                fontFamily="Inter"
                fontWeight="regular"
                fontSize="11.08px"
                color="Base Shade . 50"
              >
                samwheeler@example.com
              </Text>
              <Text
                fontFamily="Inter"
                lineHeight="1.29"
                fontWeight="semibold"
                fontSize="12.93px"
                color="Base Shade . 100"
              >
                Sam Wheeler
              </Text>
            </Stack>
            <Box>
              <Stack width="10.16px" height="10.16px" />
            </Box>
            <Box>
              <Box>
                <Stack
                  borderRadius="18.47px"
                  direction="row"
                  justify="flex-start"
                  align="center"
                  spacing="0px"
                  width="160.1px"
                  height="30.17px"
                >
                  <Stack width="22.17px" height="22.17px" />
                </Stack>
              </Box>
              <Stack width="21.89px" height="22.17px" />
              <Stack width="21.89px" height="22.17px" />
            </Box>
            <Box />
            <Stack width="14.78px" height="14.78px" />
            <Stack width="10.16px" height="10.16px" />
            <Stack
              padding="19.51px"
              borderRadius="9.75px"
              justify="flex-start"
              align="flex-start"
              spacing="11.71px"
              borderColor="Border"
              borderStartWidth="0.98px"
              borderEndWidth="0.98px"
              borderTopWidth="0.98px"
              borderBottomWidth="0.98px"
              height="742px"
              background="White"
            >
              <Stack justify="flex-start" align="flex-start" spacing="29px">
                <Stack
                  justify="flex-start"
                  align="flex-start"
                  spacing="12px"
                  width="993px"
                  maxWidth="100%"
                >
                  <Stack
                    direction="row"
                    justify="flex-start"
                    align="flex-start"
                    spacing="12px"
                    alignSelf="stretch"
                  >
                    <Stack
                      paddingStart="11.71px"
                      paddingY="3.9px"
                      borderRadius="7.8px"
                      height="760px"
                      flex="1"
                      background="White"
                      boxShadow="0px 1.95px 9.75px 0px rgba(124, 141, 181, 0.12)"
                    >
                      <Box>
                        <Box width="226px" height="2px" background="#D9D9D9" />
                        <Box width="226px" height="2px" background="#D9D9D9" />
                        <Box>
                          <Text
                            fontFamily="SF Pro"
                            lineHeight="1.12"
                            fontWeight="bold"
                            fontSize="14.78px"
                            color="#000000"
                            width="138px"
                            height="54px"
                          >
                            DeFi{' '}
                          </Text>
                        </Box>
                        <Box>
                          <Text
                            fontFamily="SF Pro"
                            lineHeight="1.12"
                            fontWeight="bold"
                            fontSize="14.78px"
                            color="#000000"
                            width="138px"
                            height="54px"
                          >
                            Tokens
                          </Text>
                          <Text
                            fontFamily="SF Pro"
                            lineHeight="1.12"
                            fontWeight="bold"
                            fontSize="14.78px"
                            color="#000000"
                            width="138px"
                            height="54px"
                          >
                            Custom Contract
                          </Text>
                          <Text
                            fontFamily="SF Pro"
                            lineHeight="1.12"
                            fontWeight="regular"
                            fontSize="14.78px"
                            color="#000000"
                            width="138px"
                            height="22px"
                          >
                            ETH
                          </Text>
                          <Text
                            fontFamily="SF Pro"
                            lineHeight="1.12"
                            fontWeight="regular"
                            fontSize="14.78px"
                            color="#000000"
                            width="138px"
                            height="22px"
                          >
                            USDC{' '}
                          </Text>
                          <Text
                            fontFamily="SF Pro"
                            lineHeight="1.12"
                            fontWeight="regular"
                            fontSize="14.78px"
                            color="#000000"
                            width="138px"
                            height="22px"
                          >
                            WstETH
                          </Text>
                          <Text
                            fontFamily="SF Pro"
                            lineHeight="1.12"
                            fontWeight="regular"
                            fontSize="14.78px"
                            color="#000000"
                            width="138px"
                            height="22px"
                          >
                            rETH
                          </Text>
                          <Text
                            fontFamily="SF Pro"
                            lineHeight="1.12"
                            fontWeight="regular"
                            fontSize="14.78px"
                            color="#000000"
                            width="138px"
                            height="22px"
                          >
                            DAI
                          </Text>
                          <Text
                            fontFamily="SF Pro"
                            lineHeight="1.12"
                            fontWeight="regular"
                            fontSize="14.78px"
                            color="#000000"
                            width="138px"
                            height="22px"
                          >
                            USDT
                          </Text>
                          <Text
                            fontFamily="SF Pro"
                            lineHeight="1.12"
                            fontWeight="regular"
                            fontSize="14.78px"
                            color="#000000"
                            width="138px"
                            height="22px"
                          >
                            Matic
                          </Text>
                          <Text
                            fontFamily="SF Pro"
                            lineHeight="1.12"
                            fontWeight="regular"
                            fontSize="14.78px"
                            color="#000000"
                            width="138px"
                            height="22px"
                          >
                            BNB
                          </Text>
                          <Text
                            fontFamily="SF Pro"
                            lineHeight="1.12"
                            fontWeight="regular"
                            fontSize="14.78px"
                            color="#000000"
                            width="138px"
                            height="22px"
                          >
                            WBTC
                          </Text>
                        </Box>
                        <Button size="lg" colorScheme="blue">
                          Add custom contract
                        </Button>
                      </Box>
                      <Select
                        placeholder="Lending"
                        size="lg"
                        width="230px"
                        height="45px"
                      />
                      <Select
                        placeholder="Staking"
                        size="lg"
                        width="230px"
                        height="45px"
                      />
                    </Stack>
                    <Stack
                      paddingStart="11.71px"
                      paddingY="3.9px"
                      borderRadius="7.8px"
                      height="760px"
                      flex="1"
                      background="White"
                      boxShadow="0px 1.95px 9.75px 0px rgba(124, 141, 181, 0.12)"
                    >
                      <Box>
                        <Box>
                          <Text
                            fontFamily="SF Pro"
                            lineHeight="1.12"
                            fontWeight="bold"
                            fontSize="14.78px"
                            color="#000000"
                            width="138px"
                            height="54px"
                          >
                            Attributes
                          </Text>
                          <Text
                            fontFamily="SF Pro"
                            lineHeight="1.12"
                            fontWeight="regular"
                            fontSize="14.78px"
                            color="#000000"
                            width="138px"
                            height="22px"
                          >
                            Deposit APR{' '}
                          </Text>
                          <Text
                            fontFamily="SF Pro"
                            lineHeight="1.12"
                            fontWeight="regular"
                            fontSize="14.78px"
                            color="#000000"
                            width="138px"
                            height="22px"
                          >
                            Borrow APR{' '}
                          </Text>
                          <Text
                            fontFamily="SF Pro"
                            lineHeight="1.12"
                            fontWeight="regular"
                            fontSize="14.78px"
                            color="#000000"
                            width="138px"
                            height="22px"
                          >
                            Stable APR{' '}
                          </Text>
                          <Text
                            fontFamily="SF Pro"
                            lineHeight="1.12"
                            fontWeight="regular"
                            fontSize="14.78px"
                            color="#000000"
                            width="138px"
                            height="22px"
                          >
                            Liquidity{' '}
                          </Text>
                          <Text
                            fontFamily="SF Pro"
                            lineHeight="1.12"
                            fontWeight="regular"
                            fontSize="14.78px"
                            color="#000000"
                            width="138px"
                            height="22px"
                          >
                            Utilisation{' '}
                          </Text>
                          <Text
                            fontFamily="SF Pro"
                            lineHeight="1.12"
                            fontWeight="regular"
                            fontSize="14.78px"
                            color="#000000"
                            width="138px"
                            height="22px"
                          >
                            Size
                          </Text>
                        </Box>
                      </Box>
                    </Stack>
                    <Stack
                      paddingStart="11.71px"
                      paddingY="3.9px"
                      borderRadius="7.8px"
                      height="760px"
                      flex="1"
                      background="White"
                      boxShadow="0px 1.95px 9.75px 0px rgba(124, 141, 181, 0.12)"
                    >
                      <Box>
                        <Box>
                          <Text
                            fontFamily="SF Pro"
                            lineHeight="1.12"
                            fontWeight="bold"
                            fontSize="14.78px"
                            color="#000000"
                            width="138px"
                            height="54px"
                          >
                            Fields
                          </Text>
                          <Text
                            fontFamily="SF Pro"
                            lineHeight="1.12"
                            fontWeight="regular"
                            fontSize="14.78px"
                            color="#000000"
                            width="138px"
                            height="22px"
                          >
                            Block Number
                          </Text>
                          <Text
                            fontFamily="SF Pro"
                            lineHeight="1.12"
                            fontWeight="regular"
                            fontSize="14.78px"
                            color="#000000"
                            width="138px"
                            height="22px"
                          >
                            Time Stamp
                          </Text>
                          <Text
                            fontFamily="SF Pro"
                            lineHeight="1.12"
                            fontWeight="regular"
                            fontSize="14.78px"
                            color="#000000"
                            width="138px"
                            height="22px"
                          >
                            Stable APR{' '}
                          </Text>
                          <Text
                            fontFamily="SF Pro"
                            lineHeight="1.12"
                            fontWeight="regular"
                            fontSize="14.78px"
                            color="#000000"
                            width="138px"
                            height="22px"
                          >
                            Liquidity{' '}
                          </Text>
                          <Text
                            fontFamily="SF Pro"
                            lineHeight="1.12"
                            fontWeight="regular"
                            fontSize="14.78px"
                            color="#000000"
                            width="138px"
                            height="22px"
                          >
                            Utilisation{' '}
                          </Text>
                          <Text
                            fontFamily="SF Pro"
                            lineHeight="1.12"
                            fontWeight="regular"
                            fontSize="14.78px"
                            color="#000000"
                            width="138px"
                            height="22px"
                          >
                            Size
                          </Text>
                        </Box>
                      </Box>
                      <Button
                        size="lg"
                        state="Default"
                        variant="Solid"
                        leftIcon="False"
                        rightIcon="True"
                      >
                        <Button>Save action</Button>
                        <Stack
                          id="arrow-right-s-line"
                          width="18px"
                          height="18px"
                        />
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  </Stack>
  )
}
