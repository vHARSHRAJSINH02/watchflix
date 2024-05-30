import axios from "axios";
import { showAlert } from "./alert";

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Logged in succesfully!");

      window.setTimeout(() => {
        location.assign("/");
      }, 2000);
    }
    // console.log(res);
  } catch (err) {
    // console.log(err);
    showAlert("error", "Incorrect email or password!");

    window.setTimeout(() => {
      location.reload(true);
    }, 2000);
  }
};

export const logOut = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/users/logout",
    });

    if (res.data.message === "success") {
      showAlert("success", "Logging you out!");

      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.message);

    window.setTimeout(() => {
      location.reload(true);
    }, 2000);
  }
};

export const signUp = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Account created succesfully!");

      window.setTimeout(() => {
        location.assign("/");
      }, 2000);
    }
  } catch (err) {
    // console.log(err);
    showAlert("error", err.response.data.message);
    // window.setTimeout(() => {
    //   location.reload(true);
    // }, 2000);
  }
};

export const forgotPassword = async (email) => {
  try {
    const res = await axios({
      url: "/api/v1/users/forgotPassword",
      method: "POST",
      data: {
        email,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", res.data.message);

      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const resetPassword = async (token, password, passwordConfirm) => {
  try {
    const res = await axios({
      url: `/api/v1/users/resetPassword/${token}`,
      method: "PATCH",
      data: {
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Password reseted sucessfully");

      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const updatePassword = async (
  passwordCurrent,
  password,
  passwordConfirm
) => {
  try {
    const res = await axios({
      url: `/api/v1/users/updatePassword`,
      method: "PATCH",
      data: {
        passwordCurrent,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Password updated sucessfully");

      window.setTimeout(() => {
        location.reload(true);
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const deleteMe = async () => {
  try {
    const res = await axios({
      url: `/api/v1/users/deleteMe`,
      method: "PATCH",
    });

    if (res.status === 204) {
      showAlert("success", "Account Deleted successfully! ");

      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);

    window.setTimeout(() => {
      location.reload(true);
    }, 100);
  }
};

export const updateMe = async (data) => {
  try {
    const res = await axios({
      url: `/api/v1/users/updateMe`,
      method: "PATCH",
      data,
    });

    if (res.data.status === "success") {
      showAlert("success", "Profile updated sucessfully");

      window.setTimeout(() => {
        location.reload(true);
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const deleteAUser = async (userId) => {
  try {
    const res = await axios({
      url: `/api/v1/users/${userId}`,
      method: "DELETE",
    });

    if (res.status === 204) {
      showAlert("success", "User Deleted   sucessfully");

      window.setTimeout(() => {
        location.reload(true);
      }, 2000);
    }
  } catch (err) {
    console.log(err);
    showAlert("error", err.response.data.message);
  }
};
