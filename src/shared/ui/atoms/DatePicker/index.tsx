/* eslint-disable react/no-children-prop */
/* eslint-disable no-unused-vars */
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  InputProps as ChakraInputProps,
  Menu,
  MenuButton,
  Button,
  MenuList,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Box,
  Grid,
  Center,
  HStack,
  IconButton,
  VStack,
  Heading,
  useColorModeValue,
  FormLabel,
} from "@chakra-ui/react";
import React, { useState, createRef } from "react";
import { daysMap, getMonthDetails, getMonthStr } from "./functions";

const oneDay = 60 * 60 * 24 * 1000;
const todayTimestamp =
  Date.now() - (Date.now() % oneDay) + new Date().getTimezoneOffset() * 1000 * 60;

export interface IDatePickerProps extends Omit<ChakraInputProps, "onChange"> {
  dateFormat?: string;
  onChange: (date: string) => void;
  label: string;
}

export const DatePicker = (props: IDatePickerProps) => {
  const { onChange, dateFormat = "DD/MM/YYYY", label, ...rest } = props;
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const [monthDetails, setMonthDetails] = useState(getMonthDetails(year, month));
  const [selectedDay, setSelectedDay] = useState<number>();
  const inputRef = createRef<HTMLInputElement>();
  const color = useColorModeValue("gray.500", "white");
  const isCurrentDay = (day: any) => {
    return day.timestamp === todayTimestamp;
  };
  const isSelectedDay = (day: any) => {
    return day.timestamp === selectedDay;
  };

  const getDateStringFromTimestamp = (timestamp: number) => {
    const dateObject = new Date(timestamp);
    const month = dateObject.getMonth() + 1;
    const date = dateObject.getDate();
    return `${date < 10 ? "0" + date : date}/${
      month < 10 ? "0" + month : month
    }/${dateObject.getFullYear()}`;
  };

  const onDateClick = (day: any) => {
    setSelectedDay(day.timestamp);
    if (inputRef.current) {
      inputRef.current.value = getDateStringFromTimestamp(day.timestamp);
      onChange(inputRef.current.value);
    }
  };

  const setYearAction = (offset: number) => {
    setYear(year + offset);
    setMonthDetails(getMonthDetails(year + offset, month));
  };

  const setMonthAction = (offset: number) => {
    let _year = year;
    let _month = month + offset;
    if (_month === -1) {
      _month = 11;
      _year--;
    } else if (_month === 12) {
      _month = 0;
      _year++;
    }
    setYear(_year);
    setMonth(_month);
    setMonthDetails(getMonthDetails(_year, _month));
  };
  return (
    <Menu {...rest}>
      <MenuButton w="100%" type="button">
        <VStack>
          <FormLabel textAlign={"left"}>{label}</FormLabel>
          <InputGroup>
            <Input color={color} ref={inputRef} {...rest} />
            <InputRightElement children={<ChevronDownIcon w={5} h={5} />} />
          </InputGroup>
        </VStack>
      </MenuButton>
      <MenuList>
        <Center p={3}>
          <HStack>
            <IconButton
              variant="ghost"
              aria-label="datepicker left button"
              onClick={() => setYearAction(-1)}
              icon={<ArrowLeftIcon color={color} />}
            />
            <IconButton
              variant="ghost"
              aria-label="datepicker left button"
              onClick={() => setMonthAction(-1)}
              icon={<ChevronLeftIcon color={color} />}
            />
            <VStack align="center">
              <Button variant="ghost" size="none">
                <Heading color={color} m={0} fontWeight={200} as="h5">
                  {year}
                </Heading>
              </Button>
              <Button
                variant="ghost"
                size="none"
                py="0px"
                color={color}
                margin="0px !important"
              >
                {getMonthStr(month).toUpperCase()}
              </Button>
            </VStack>
            <IconButton
              variant="ghost"
              aria-label="datepicker right button"
              color={color}
              onClick={() => setMonthAction(1)}
              icon={<ChevronRightIcon />}
            />
            <IconButton
              variant="ghost"
              aria-label="datepicker right button"
              color={color}
              onClick={() => setYearAction(1)}
              icon={<ArrowRightIcon />}
            />
          </HStack>
        </Center>
        <Box p={3}>
          <Grid alignItems="center" templateColumns="repeat(7, 1fr)" gap={3}>
            {daysMap.map((d, i) => (
              <Text color={color} key={i} w="100%">
                {d.substring(0, 3).toLocaleUpperCase()}
              </Text>
            ))}
          </Grid>
        </Box>
        <Box p={3}>
          <Grid templateColumns="repeat(7, 1fr)" gap={3}>
            {monthDetails.map((day, index) => {
              return (
                <Button
                  disabled={day.month !== 0}
                  color={color}
                  backgroundColor={
                    isCurrentDay(day)
                      ? "gray.300"
                      : isSelectedDay(day) && day.month === 0
                      ? "gray.300"
                      : ""
                  }
                  variant="ghost"
                  size="sm"
                  key={index}
                  onClick={() => onDateClick(day)}
                >
                  {day.date}
                </Button>
              );
            })}
          </Grid>
        </Box>
      </MenuList>
    </Menu>
  );
};
