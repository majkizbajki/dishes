import { IFormInput } from "../components/organisms";
import axios from "axios";
import { API_URL } from "../constants/api";

export const addDish = async (data: IFormInput) => {
  try {
    const preparationTime = `${data.preparation_time?.getHours()}:${data.preparation_time?.getMinutes()}:${data.preparation_time?.getSeconds()}`;

    await axios.post(API_URL, {
      diameter: data.type === "pizza" ? Number(data.diameter) : undefined,
      name: data.name,
      no_of_slices:
        data.type === "pizza" ? Number(data.no_of_slices) : undefined,
      preparation_time: preparationTime,
      slices_of_bread:
        data.type === "sandwich" ? Number(data.slices_of_bread) : undefined,
      spiciness_scale:
        data.type === "soup" ? Number(data.spiciness_scale) : undefined,
      type: data.type,
    });
  } catch (error) {
    throw new Error("Unexpected error occured. Try again, please.");
  }
};
