import { useForm } from "react-hook-form";
import { DishType } from "../../types/dish";
import { FormInput } from "../molecules/FormInput";
import { useState } from "react";
import { FormSelect, FormTimePicker, SelectValueType } from "../molecules";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import { Controller } from "react-hook-form";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import validator from "validator";
import { useTheme } from "@mui/material/styles";
import styled from "styled-components";
import { LoadingButton } from "@mui/lab";
import { Box, Modal, Typography } from "@mui/material";
import { addDish } from "../../api";
import { useDishForm } from "../../hooks/dish";

export interface IFormInput {
  diameter: string;
  name: string;
  no_of_slices: string;
  preparation_time: Date | null;
  slices_of_bread: string;
  spiciness_scale: string;
  type: DishType;
}

const dishes: SelectValueType[] = [
  {
    name: "Pizza",
    value: "pizza",
    icon: <LocalPizzaIcon fontSize="small" />,
  },
  {
    name: "Sandwich",
    value: "sandwich",
    icon: <BreakfastDiningIcon fontSize="small" />,
  },
  { name: "Soup", value: "soup", icon: <SoupKitchenIcon fontSize="small" /> },
];

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DishForm = () => {
  const [time, setTime] = useState<Dayjs | null>(null);
  const [type, setType] = useState<DishType | "">("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const theme = useTheme();

  const {
    control,
    clearErrors,
    setError,
    setValue,
    reset,
    formState: { errors, isSubmitted, isSubmitSuccessful },
    handleSubmit,
  } = useForm<IFormInput>({
    defaultValues: {
      diameter: "",
      name: "",
      no_of_slices: "",
      preparation_time: null,
      slices_of_bread: "",
      spiciness_scale: "",
      type: undefined,
    },
  });
  const { errMessage, rules } = useDishForm();

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    try {
      addDish(data);
      reset();
      setTime(null);
      setType("");
      setIsModalVisible(true);
      setModalMessage(
        "Congratulations, your dish has been successfully sent to the kitchen :)"
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsModalVisible(true);
      setModalMessage(error as string);
    }
  });

  const onDateChange = (value: Dayjs | null) => {
    setTime(value);
    if (value?.isValid()) {
      setValue("preparation_time", value?.toDate());
      clearErrors("preparation_time");
      return;
    }
    if (isSubmitted && !isSubmitSuccessful && !value?.isValid()) {
      setError("preparation_time", {
        message: "Wrong preparation time",
        type: "pattern",
      });
    }
  };

  return (
    <>
      <Form>
        <FormInput
          control={control}
          error={errors.name}
          errorMessage={errMessage.name}
          label="Name*"
          name="name"
          rules={rules.name}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["TimePicker"]}>
            <Controller
              control={control}
              name="preparation_time"
              render={({ field }) => (
                <FormTimePicker
                  fieldProps={field}
                  label="Preparation time*"
                  onChange={onDateChange}
                  value={time}
                  error={errors.preparation_time}
                />
              )}
              rules={{ required: true }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <FormSelect
          control={control}
          label="Type*"
          name="type"
          rules={rules.type}
          value={type}
          selectValues={dishes}
          error={errors.type}
          errorMessage={errMessage.type}
          onChange={(value: DishType) => {
            setType(value);
            setValue("type", value);
            clearErrors("type");
          }}
        />
        {type === "pizza" && (
          <>
            <FormInput
              control={control}
              error={errors.no_of_slices}
              errorMessage={
                errors.no_of_slices?.type === "required"
                  ? "Required"
                  : "Wrong number of slices"
              }
              label="Number of slices*"
              name="no_of_slices"
              rules={{
                required: type === "pizza",
                min: 1,
                validate: (value) => validator.isInt(value as string),
              }}
            />
            <FormInput
              control={control}
              error={errors.diameter}
              errorMessage={
                errors.diameter?.type === "required"
                  ? "Required"
                  : "Wrong diameter"
              }
              label="Diameter* (cm)"
              name="diameter"
              rules={{
                required: type === "pizza",
                validate: (value) =>
                  validator.isFloat(value as string) && Number(value) > 0,
              }}
            />
          </>
        )}
        {type === "sandwich" && (
          <FormInput
            control={control}
            error={errors.slices_of_bread}
            errorMessage={
              errors.slices_of_bread?.type === "required"
                ? "Required"
                : "Wrong number of slices of bread"
            }
            label="Slices of bread*"
            name="slices_of_bread"
            rules={{
              required: type === "sandwich",
              min: 1,
              validate: (value) => validator.isInt(value as string),
            }}
          />
        )}
        {type === "soup" && (
          <FormInput
            control={control}
            error={errors.spiciness_scale}
            errorMessage={
              errors.spiciness_scale?.type === "required"
                ? "Required"
                : "Wrong spiciness rating"
            }
            label="Spiciness scale*"
            name="spiciness_scale"
            rules={{
              required: type === "soup",
              min: 0,
              max: 10,
              validate: (value) => validator.isInt(value as string),
            }}
          />
        )}
        <LoadingButton
          onClick={onSubmit}
          variant="contained"
          loading={isLoading}
          sx={{
            minWidth: 64,
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.background.default,
            borderRadius: 10,
            mt: 5,
          }}
        >
          Send
        </LoadingButton>
      </Form>
      <Modal open={isModalVisible} onClose={() => setIsModalVisible(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            mx: 1,
            bgcolor: "background.default",
            borderWidth: 1,
            borderColor: theme.palette.secondary.main,
            boxShadow: 24,
            borderRadius: 8,
            p: 4,
          }}
        >
          <Typography>{modalMessage}</Typography>
        </Box>
      </Modal>
    </>
  );
};
