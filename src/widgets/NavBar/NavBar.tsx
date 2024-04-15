"use client";
//@ts-nocheck
import { Header, Flex, Logo, Profile, NotificationsNav, SearchBar } from "@/shared/ui";
import { useBreakpointValue, Icon, IconButton, useMediaQuery } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useAuth, useSidebarDrawer } from "@/shared/libs";
import { useEffect, useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { theme } from "@/application/theme";
import { formatLanguageFromi18N, useI18n } from "@/application/providers/i18nProvider";
import { useTranslation } from "react-i18next";

export const NavBar = ({ showLogo = true }) => {
  const { isAuthenticated } = useAuth() || {};
  const { i18n } = useTranslation();
  const { changeLanguage, setCurrentLanguage } = useI18n() || {};
  const { onOpen = () => {}, onClose } = useSidebarDrawer() || {};
  const isDesktopVersion = useBreakpointValue({ base: false, lg: true });
  const [country, setCountry] = useState(formatLanguageFromi18N(i18n?.language));
  useEffect(() => {
    return () => {
      onClose?.();
    };
  }, []);
  const Dropdown = CountryDropdown as any;
  useEffect(() => {
    const language = localStorage.getItem("language");
    if (language) {
      setCountry(formatLanguageFromi18N(language));
      setCurrentLanguage(language);
      i18n?.changeLanguage?.(language);
    }
  }, []);
  return (
    <Header>
      <Flex alignItems={"center"} w={"100%"}>
        {isAuthenticated && !isDesktopVersion && (
          <IconButton
            aria-label="Open sidebar"
            fontSize="24"
            icon={<Icon as={RiMenuLine} />}
            variant="unstyled"
            onClick={onOpen}
            mr="1"
            mt={2}
          />
        )}
        <Logo marginBottom={0} />
        {/* {isLargerThan560 && (
          <SearchBar placeholder="Pesquise por nome..." name="search" width="auto" />
        )} */}
        {isAuthenticated && (
          <Flex align="center" ml="auto">
            {/* <NotificationsNav /> */}
            <Dropdown
              value={country}
              onChange={(val) => {
                setCountry(val);
                changeLanguage(val);
              }}
              labelType="short"
              valueType="short"
              showDefaultOption
              defaultOptionLabel="Selecione o idioma"
              whitelist={["US", "BR"]}
              style={{
                backgroundColor: theme.colors.secondary[400],
                padding: 10,
                width: 60,
                marginRight: 15,
                borderRadius: 8,
              }}
            />
            <Profile showProfileData={isDesktopVersion} />
          </Flex>
        )}
      </Flex>
    </Header>
  );
};
