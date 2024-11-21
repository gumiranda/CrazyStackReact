"use client";

/* eslint-disable react/no-children-prop */
/* eslint-disable no-unused-vars */
import {
  InputProps as ChakraInputProps,
  Button,
  Input,
  Text,
  Box,
  Grid,
  Center,
  HStack,
  IconButton,
  VStack,
  Heading,
  Fieldset,
} from "@chakra-ui/react";
import React, { useState, createRef } from "react";
import { daysMap, getMonthDetails, getMonthStr } from "./functions";
import { FormLabel } from "../FormLabel";
import { MenuContent, MenuRoot, MenuTrigger } from "@/components/ui/menu";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
const oneDay = 60 * 60 * 24 * 1000;
const todayTimestamp =
  Date.now() - (Date.now() % oneDay) + new Date().getTimezoneOffset() * 1000 * 60;

export interface IDatePickerProps extends Omit<ChakraInputProps, "onChange"> {
  dateFormat?: string;
  onChange: (date: string) => void;
  label: string;
  labelColor?: string;
  ta?: any | undefined;
}

export const DatePicker = (props: IDatePickerProps) => {
  const {
    onChange,
    dateFormat = "DD/MM/YYYY",
    label,
    labelColor = "white",
    ta = null,
    ...rest
  } = props;
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const [monthDetails, setMonthDetails] = useState(getMonthDetails(year, month, 4));
  const [selectedDay, setSelectedDay] = useState<number>();
  const inputRef = createRef<HTMLInputElement>();
  const color = "gray.500";
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
    setMonthDetails(getMonthDetails(year + offset, month, 4));
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
    setMonthDetails(getMonthDetails(_year, _month, 4));
  };
  return (
    <MenuRoot>
      <MenuTrigger w="100%" type="button">
        <FormLabel color={labelColor} textAlign={ta ?? "left"}>
          {label}
        </FormLabel>
        <Fieldset.Root>
          <Input color={labelColor} ref={inputRef} {...rest} />
        </Fieldset.Root>
      </MenuTrigger>
      <MenuContent>
        <Center p={3}>
          <HStack>
            <IconButton
              variant="ghost"
              aria-label="datepicker left button"
              color={color}
              onClick={() => setMonthAction(-1)}
              children={<ArrowLeftIcon />}
            />

            <VStack align="center">
              <Button variant="ghost" size="md">
                <Heading color={color} m={0} fontWeight={200} as="h5">
                  {year}
                </Heading>
              </Button>
              <Button
                variant="ghost"
                size="sm"
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
              children={<ArrowRightIcon />}
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
            {monthDetails.map((day: any, index: number) => {
              return (
                <Button
                  disabled={day?.month !== 0}
                  color={day?.month === 0 ? color : "gray.200"}
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
                  onClick={() => {
                    if (day?.month !== 0) {
                      return;
                    }
                    onDateClick(day);
                  }}
                >
                  {day.date}
                </Button>
              );
            })}
          </Grid>
        </Box>
      </MenuContent>
    </MenuRoot>
  );
};
