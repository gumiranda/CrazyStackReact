import { useCreateMapRoute } from "./createMapRoute.hook";
import { BoxCreateItem, FormControl, Checkbox, GridForm, Flex } from "shared/ui";
import { useRef } from "react";
import { useMap } from "shared/libs/hooks/useMap";
const countries = [
  { value: "ghana", label: "Ghana" },
  { value: "nigeria", label: "Nigeria" },
  { value: "kenya", label: "Kenya" },
  { value: "southAfrica", label: "South Africa" },
  { value: "unitedStates", label: "United States" },
  { value: "canada", label: "Canada" },
  { value: "germany", label: "Germany" },
];
export const CreateMapRouteForm = () => {
  // const mapContainerRef = useRef<HTMLDivElement>(null);
  // const map = useMap(mapContainerRef);
  const {
    formState,
    register,
    handleSubmit,
    handleCreateMapRoute,
    active,
    setActive,
    watch,
  } = useCreateMapRoute();
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleCreateMapRoute)}
      title={"Criar rota"}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/mapRoutes/1"}
    >
      <GridForm>
        <FormControl
          label="Nome da rota"
          error={formState.errors.name}
          {...register("name")}
        />
        <FormControl
          label="Origem"
          error={formState.errors.originText}
          autoCompleteProps={{ list: countries }}
          {...register("originText")}
        />
        <FormControl
          label="Destino"
          error={formState.errors.destinationText}
          {...register("destinationText")}
        />
        <Checkbox
          label="Ativo"
          colorScheme="green"
          isChecked={active}
          onChange={(e) => {
            e.preventDefault();
            setActive(e.target.checked);
          }}
        />
      </GridForm>
      {/* <Flex id="map" p={400} ref={mapContainerRef}></Flex> */}
    </BoxCreateItem>
  );
};
