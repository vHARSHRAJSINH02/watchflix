import axios from "axios";
import { showAlert } from "./alert";

export const deteleGenre = async (genName) => {
  try {
    const res = await axios({
      url: `/api/v1/genre/${genName}`,
      method: "DELETE",
    });

    if (res.status == 204) {
      showAlert("success", "Genre deleted successfully!");

      window.setTimeout(() => {
        location.reload(true);
      }, 2000);
    }
  } catch (err) {
    showAlert("error", err.message);
  }
};
