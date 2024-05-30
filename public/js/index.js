import "@babel/polyfill";
import { showAlert } from "./alert.js";
import {
  login,
  logOut,
  signUp,
  resetPassword,
  forgotPassword,
  updatePassword,
  deleteMe,
  updateMe,
  deleteAUser,
} from "./auth.js";

import { deteleGenre } from "./genreFunc.js";

import {
  likeMovie,
  addToWatchList,
  removeFromWatchList,
  dislikeMovie,
  deleteMovie,
  giveReview,
  getSearchedMovies,
  deleteMovieReview,
  addMovie,
  gettingUserStats,
} from "./movieFunc.js";

const inputUserName = document.getElementById("user-name");
const inputName = document.getElementById("name");

const inputEmail = document.getElementById("email");
const inputCurrentPass = document.getElementById("password-current");
const inputPass = document.getElementById("password");
const inputConfPass = document.getElementById("password-confirm");
const inputReview = document.getElementById("review-text");
const inputRating = document.getElementById("Numbers");
const inputMov = document.getElementById("searchInput");
const inputMovieName = document.getElementById("movie-name");
const inputMovieGenre = document.getElementById("movie-genre");
const inputMoviedescrp = document.getElementById("movie-desc");
const inputMovieImbd = document.getElementById("movie-imbd");
const inputMovieUrl = document.getElementById("movie-url");

const resetToken = document.getElementById("reset-token");
const btnGetToken = document.getElementById("getToken");
const btnLike = document.getElementById("likemovie");
const btnDislike = document.getElementById("dislikemovie");
const btnAddToWatchList = document.getElementById("watchlater");
const btnRemoveFromWatchList = document.getElementById("remove-movie");
const btnDeleteMovie = document.querySelectorAll(".deletemovie");
const btnDeleteGenre = document.querySelectorAll(".deletegenre");
const btnDeleteMe = document.getElementById("delete-me");
const btnDeleteReview = document.querySelectorAll(".deleteReview");
const btnGetUserStats = document.querySelector(".user-stats");
const btnDeleteUser = document.querySelectorAll(".deleteUser");

const movFrame = document.querySelector(".movie-frame");

const formAddMovie = document.querySelector(".form-add-movie");
const formLogin = document.querySelector(".form_login");
const formSignup = document.querySelector(".form_signup");
const resetPassForm = document.getElementById("resetpass-form");
const formUpdateMe = document.getElementById("user-data");
const updatePassForm = document.getElementById("update-pass");
const fromReview = document.querySelector(".review-rate");
const formSearch = document.querySelector(".search-form");
const formDeleteMe = document.querySelector(".form-deleteME");

const logOutBtn = document.querySelector(".nav__el--logout");

// if(mapEl)

if (formLogin)
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    login(inputEmail.value, inputPass.value);
  });

//logging out user
if (logOutBtn) logOutBtn.addEventListener("click", logOut);

if (formSignup)
  formSignup.addEventListener("submit", (e) => {
    e.preventDefault();

    signUp(
      inputUserName.value,
      inputEmail.value,
      inputPass.value,
      inputConfPass.value
    );
  });

if (btnGetToken)
  btnGetToken.addEventListener("click", (e) => {
    e.preventDefault();

    if (email.value) {
      forgotPassword(email.value);
      e.target.textContent = "sending...";
    }
  });

if (resetPassForm)
  resetPassForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // resetPassword(resetToken.value, password.value, confPassword.value);
    if (resetToken.value && inputPass.value && inputConfPass.value) {
      resetPassword(resetToken.value, inputPass.value, inputConfPass.value);

      document.getElementById("passResetBtn").textContent = "Resetting..";
    }
  });

if (btnLike) {
  btnLike.addEventListener("click", () => {
    const movSlug = btnLike.dataset.slug;

    likeMovie(movSlug);

    btnLike.textContent = "Liked";
  });
}

if (btnAddToWatchList) {
  btnAddToWatchList.addEventListener("click", () => {
    const movSlug = btnAddToWatchList.dataset.slug;

    addToWatchList(movSlug);
  });
}

if (btnRemoveFromWatchList) {
  btnRemoveFromWatchList.addEventListener("click", () => {
    const movSlug = btnRemoveFromWatchList.dataset.slug;

    removeFromWatchList(movSlug);
  });
}

if (btnDislike) {
  btnDislike.addEventListener("click", () => {
    const movSlug = btnDislike.dataset.slug;

    dislikeMovie(movSlug);
    btnDislike.textContent = "disliked";
  });
}

if (btnDeleteMovie) {
  btnDeleteMovie.forEach((btn) => {
    btn.addEventListener("click", () => {
      const movId = btn.dataset.id;

      deleteMovie(movId);
    });
  });
}

if (btnDeleteGenre) {
  btnDeleteGenre.forEach((btn) => {
    btn.addEventListener("click", () => {
      const genName = btn.dataset.name;

      deteleGenre(genName);
    });
  });
}

if (updatePassForm) {
  updatePassForm.addEventListener("submit", (e) => {
    e.preventDefault();

    updatePassword(
      inputCurrentPass.value,
      inputPass.value,
      inputConfPass.value
    );
  });
}

if (fromReview) {
  fromReview.addEventListener("submit", (e) => {
    e.preventDefault();

    const movId = fromReview.dataset.id;

    giveReview(movId, inputReview.value, inputRating.value);
  });
}

if (formSearch) {
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = inputMov.value;

    getSearchedMovies(name);

    inputMov.value = "";
  });
}

if (formDeleteMe) {
  formDeleteMe.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = btnDeleteMe.dataset.id;

    if (inputEmail.value === email) {
      alert("Please confirm if you really want to delete your account!");
      deleteMe();
    } else {
      showAlert("error", "Incorrect email! Try again later");
    }
  });
}

if (btnDeleteReview) {
  btnDeleteReview.forEach((btn) =>
    btn.addEventListener("click", () => {
      const revId = btn.dataset.id;

      deleteMovieReview(revId);
    })
  );
}

if (btnDeleteUser)
  btnDeleteUser.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let userId = e.target.dataset.id;

      deleteAUser(userId);
    });
  });

if (formUpdateMe) {
  formUpdateMe.addEventListener("submit", (e) => {
    e.preventDefault();

    const form = new FormData();

    form.append("name", inputName.value);
    form.append("email", inputEmail.value);
    form.append("photo", document.getElementById("photo").files[0]);

    document.getElementById("saveData").textContent = "Updating...";

    updateMe(form);
  });
}

if (formAddMovie)
  formAddMovie.addEventListener("submit", (e) => {
    e.preventDefault();

    const form = new FormData();

    form.append("name", inputMovieName.value);
    form.append("genre", inputMovieGenre.value);
    form.append("url", inputMovieUrl.value);
    form.append("ImbdRating", inputMovieImbd.value);
    form.append("image", document.getElementById("photo").files[0]);

    addMovie(form);

    document.getElementById("add-movie").textContent = "Adding..";
  });

if (btnGetUserStats)
  btnGetUserStats.addEventListener("click", () => {
    gettingUserStats();

    document.querySelector(".user-stats").style.opacity = 0;
  });
