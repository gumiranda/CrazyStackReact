import { useCreateMapRoute } from "./createMapRoute.hook";
import {
  BoxCreateItem,
  FormControl,
  Checkbox,
  GridForm,
  Grid,
  Text,
  List,
  ListItem,
  Card,
  CardBody,
  Button,
} from "@/shared/ui";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
export const CreateMapRouteForm = () => {
  const { t } = useTranslation(["PAGES"]);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const {
    formState,
    register,
    handleSubmit,
    handleCreateMapRoute,
    active,
    setActive,
    originListPlaces,
    destinationListPlaces,
    directionsData,
    fetchDirections,
    originText,
    destinationText,
    setValue,
  } = useCreateMapRoute({ mapContainerRef });
  return (
    <>
      <BoxCreateItem
        onSubmit={handleSubmit(handleCreateMapRoute)}
        title={t("PAGES:HOME_PAGE.createDomain", {
          defaultValue: "Criar rotas",
          domain: t("PAGES:HOME_PAGE.route", {
            defaultValue: "Rotas",
          }),
        })}
        isLoadingSaveButton={formState.isSubmitting}
        cancelRoute={"/mapRoutes/1"}
      >
        <GridForm>
          <FormControl
            label={t("PAGES:FIELDS.name", {
              defaultValue: "Nome",
            })}
            error={formState.errors.name}
            {...register("name")}
          />

          {originListPlaces && (
            <FormControl
              label="Origem"
              bgColor="secondary.500"
              color="white"
              labelColor="white"
              error={formState.errors.originText}
              autoCompleteProps={{
                defaultsuggestionsOpen: originListPlaces?.length > 0,
                list: originListPlaces,
                placeholder: "Digite para pesquisar a origem",
                listItemStyleProps: {
                  bgColor: "gray.800",
                  color: "white",
                  onClick: ({ value }) => {
                    if (value?.length > 0) {
                      const origin = (
                        originListPlaces?.find?.(
                          (item: any) => item?.value === value
                        ) as any
                      )?.label;
                      if (origin) {
                        setValue("originText", origin);
                      }
                    }
                  },
                },
                highlightItemBg: "gray.200",
              }}
              {...register("originText")}
            />
          )}
          {destinationListPlaces && (
            <FormControl
              label="Destino"
              bgColor="secondary.500"
              color="white"
              labelColor="white"
              error={formState.errors.destinationText}
              autoCompleteProps={{
                defaultsuggestionsOpen: destinationListPlaces?.length > 0,
                list: destinationListPlaces,
                placeholder: "Digite para pesquisar a destino",
                listItemStyleProps: {
                  bgColor: "gray.800",
                  color: "white",
                  onClick: ({ value }) => {
                    if (value?.length > 0) {
                      const destination = (
                        destinationListPlaces?.find?.(
                          (item: any) => item?.value === value
                        ) as any
                      )?.label;
                      if (destination) {
                        setValue("destinationText", destination);
                      }
                    }
                  },
                },
                highlightItemBg: "gray.200",
              }}
              {...register("destinationText")}
            />
          )}

          <Checkbox
            label={t("PAGES:FIELDS.active", {
              defaultValue: "Ativo",
            })}
            colorPalette="green"
            checked={active}
            onChange={(e) => {
              e.preventDefault();
              setActive(e.target.checked);
            }}
          />
        </GridForm>
        {directionsData && (
          <Card mt={1}>
            <CardBody>
              <List>
                <ListItem>
                  <Text>Origem</Text>
                  <Text>{directionsData?.routes[0]!.legs[0]!.start_address}</Text>
                </ListItem>
                <ListItem>
                  <Text>Destino</Text>
                  <Text>{directionsData?.routes[0]!.legs[0]!.end_address}</Text>
                </ListItem>
                <ListItem>
                  <Text>Distância (em metros)</Text>
                  <Text>{directionsData?.routes[0]!.legs[0]!.distance.text}</Text>
                </ListItem>
                <ListItem>
                  <Text>Duração (em minutos)</Text>
                  <Text>{directionsData?.routes[0]!.legs[0]!.duration.text}</Text>
                </ListItem>
              </List>
            </CardBody>
          </Card>
        )}
      </BoxCreateItem>
      {originText?.length > 0 && destinationText?.length > 0 && (
        <Button
          bgColor="green.500"
          colorPalette="green"
          variant="ghost"
          mt={1}
          mb={2}
          onClick={(e) => {
            e.preventDefault();
            fetchDirections();
          }}
        >
          Ver Rotas
        </Button>
      )}
      <Grid id="map" p={40} ref={mapContainerRef}></Grid>
    </>
  );
};
