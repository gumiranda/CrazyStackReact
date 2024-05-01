import { useCreateRequest } from "./createRequest.hook";
import {
  BoxCreateItem,
  FormControl,
  Checkbox,
  GridForm,
  Select,
  DatePicker,
} from "@/shared/ui";
import { GetOwnersResponse } from "@/entidades/owner";
import { useTranslation } from "react-i18next";

type CreateRequestFormProps = {
  ownerList: GetOwnersResponse;
};
export const CreateRequestForm = ({ ownerList }: CreateRequestFormProps) => {
  const { t } = useTranslation(["PAGES"]);
  const {
    formState,
    register,
    handleSubmit,
    handleCreateRequest,
    active,
    setActive,
    handleChangeOwnerSelected,
    owners,
    ownerSelected,
    userSelected,
    handleChangeUserSelected,
    users,
    serviceSelected,
    handleChangeServiceSelected,
    services,
    setDateSelected,
    timeAvailable,
    timeSelected,
    handleChangeTimeSelected,
    clientSelected,
    handleChangeClientSelected,
    clients,
  } = useCreateRequest({ ownerList });
  return (
    <BoxCreateItem
      onSubmit={handleSubmit(handleCreateRequest)}
      title={t("PAGES:HOME_PAGE.createDomain", {
        defaultValue: "Criar solicitação",
        domain: t("PAGES:HOME_PAGE.request", {
          defaultValue: "Solicitação",
        }),
      })}
      isLoadingSaveButton={formState.isSubmitting}
      cancelRoute={"/requests/1"}
    >
      <GridForm>
        <Select
          bg="secondary.600"
          name="ownerList"
          label={t("PAGES:HOME_PAGE.owner", {
            defaultValue: "Estabelecimento",
          })}
          list={owners}
          value={ownerSelected}
          onChange={handleChangeOwnerSelected}
          keyValue="_id"
          keyLabel="name"
        >
          <option style={{ backgroundColor: "#7159c1" }} value="loadMore">
            {t("PAGES:NEW_APPOINTMENT.loadMore", {
              defaultValue: "Carregar mais",
            })}
          </option>
        </Select>
        <Select
          bg="secondary.600"
          name="userList"
          label={t("PAGES:HOME_PAGE.professional", {
            defaultValue: "Profissional prestador",
          })}
          list={users}
          value={userSelected}
          onChange={handleChangeUserSelected}
          keyValue="_id"
          keyLabel="name"
        >
          <option style={{ backgroundColor: "#7159c1" }} value="loadMore">
            {t("PAGES:NEW_APPOINTMENT.loadMore", {
              defaultValue: "Carregar mais",
            })}
          </option>
        </Select>
        <Select
          bg="secondary.600"
          name="serviceList"
          label={t("PAGES:HOME_PAGE.service", {
            defaultValue: "Serviço",
          })}
          list={services}
          value={serviceSelected}
          onChange={handleChangeServiceSelected}
          keyValue="_id"
          keyLabel="name"
        >
          <option style={{ backgroundColor: "#7159c1" }} value="loadMore">
            {t("PAGES:NEW_APPOINTMENT.loadMore", {
              defaultValue: "Carregar mais",
            })}
          </option>
        </Select>
        <Select
          bg="secondary.600"
          name="clientList"
          label={t("PAGES:HOME_PAGE.client", {
            defaultValue: "Cliente",
          })}
          list={clients}
          value={clientSelected}
          onChange={handleChangeClientSelected}
          keyValue="_id"
          keyLabel="name"
        >
          <option style={{ backgroundColor: "#7159c1" }} value="loadMore">
            {t("PAGES:NEW_APPOINTMENT.loadMore", {
              defaultValue: "Carregar mais",
            })}
          </option>
        </Select>
        {ownerSelected?.length === 24 &&
          serviceSelected?.length === 24 &&
          userSelected?.length === 24 && (
            <DatePicker
              placeholder={t("PAGES:NEW_APPOINTMENT.selectDate", {
                defaultValue: "Selecione a data do agendamento",
              })}
              name="date"
              label={t("PAGES:NEW_APPOINTMENT.date", {
                defaultValue: "Data do agendamento",
              })}
              onChange={(date: string) => {
                setDateSelected(date as any);
              }}
            />
          )}
        {ownerSelected?.length === 24 &&
          serviceSelected?.length === 24 &&
          userSelected?.length === 24 &&
          timeAvailable?.timeAvailable?.length > 0 && (
            <Select
              bg="secondary.600"
              name="timeList"
              label={t("PAGES:NEW_APPOINTMENT.timeAvailable", {
                defaultValue: "Horário disponível",
              })}
              list={timeAvailable?.timeAvailable ?? []}
              value={timeSelected ?? ""}
              onChange={handleChangeTimeSelected}
              keyValue="value"
              keyLabel="label"
            />
          )}
        <FormControl
          label={t("PAGES:NEW_APPOINTMENT.observations", {
            defaultValue: "Observação",
          })}
          error={formState.errors.message}
          {...register("message")}
        />
        <Checkbox
          label={t("PAGES:FIELDS.active", {
            defaultValue: "Ativo",
          })}
          colorScheme="green"
          isChecked={active}
          onChange={(e) => {
            e.preventDefault();
            setActive(e.target.checked);
          }}
        />
      </GridForm>
    </BoxCreateItem>
  );
};
