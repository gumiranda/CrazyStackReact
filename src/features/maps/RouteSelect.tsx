import { fetcher } from "shared/libs/utils";
import { Select } from "shared/ui";
import useSWR from "swr";

export type RouteSelectProps = {
  onChange?: (place_id: string) => void;
};

export function RouteSelect(props: any) {
  const {
    data: routes,
    error,
    isLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_NEXT_API_URL}/routes`, fetcher, {
    fallbackData: [],
  });

  return (
    <Select
      bg="purple.700"
      name="ownerList"
      label="Rotas"
      list={routes}
      // value={ownerSelected}
      onChange={props.onChange as any}
      keyValue="_id"
      keyLabel="name"
      {...props}
    >
      {isLoading && <option value="">Loading...</option>}
      {routes && (
        <>
          <option value="">Select a route</option>
          {routes!.map((route: any) => (
            <option key={route.id} value={route.id}>
              {route.name}
            </option>
          ))}
        </>
      )}
    </Select>
  );
}
