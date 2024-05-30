import axios from "axios";
import { showAlert } from "./alert";

export const addMovie = async (data) => {
  try {
    const res = await axios({
      url: `/api/v1/movies`,
      method: "POST",
      data,
    });

    if (res.data.status === "success") {
      showAlert("success", "Movie added successfully!");

      window.setTimeout(() => {
        location.assign("/admin-stats");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
    // window.setTimeout(() => {
    //   location.reload(true);
    // }, 2000);
  }
};

export const likeMovie = async (slug) => {
  try {
    const res = await axios({
      url: `/api/v1/movies/${slug}/like`,
      method: "POST",
    });

    if (res.data.status === "success") {
      showAlert("success", "Hurray you liked it!");

      // window.setTimeout(() => {
      //   location.reload(true);
      // }, 1000);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
    window.setTimeout(() => {
      location.reload(true);
    }, 2000);
  }
};

export const dislikeMovie = async (slug) => {
  try {
    const res = await axios({
      url: `/api/v1/movies/${slug}/dislike`,
      method: "POST",
    });

    if (res.data.status === "success") {
      showAlert("error", "Ohho! we will improve");

      // window.setTimeout(() => {
      //   location.reload(true);
      // }, 1000);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
    // window.setTimeout(() => {
    //   location.reload(true);
    // }, 2000);
  }
};

export const addToWatchList = async (slug) => {
  try {
    const res = await axios({
      url: `/api/v1/users/${slug}/watchlist/add`,
      method: "POST",
    });

    if (res.data.status === "success") {
      showAlert("success", "Movie added to the watchlist!");

      window.setTimeout(() => {
        location.assign("/my-watchlist");
      }, 2000);
    }
  } catch (err) {
    // console.log(err);
    showAlert("error", err.response.data.message);
    window.setTimeout(() => {
      location.assign("/my-watchlist");
    }, 2000);
  }
};

export const removeFromWatchList = async (slug) => {
  try {
    const res = await axios({
      url: `/api/v1/users/${slug}/watchlist/remove`,
      method: "POST",
    });

    if (res.data.status == "success") {
      showAlert("success", "Movie removed from watchlist!");

      window.setTimeout(() => {
        location.reload(true);
      }, 2000);
    }
  } catch (err) {
    showAlert("error", err.message);
  }
};

export const deleteMovie = async (id) => {
  try {
    const res = await axios({
      url: `/api/v1/movies/${id}`,
      method: "DELETE",
    });

    if (res.status == 204) {
      showAlert("success", "Movie deleted successfully!");

      window.setTimeout(() => {
        location.reload(true);
      }, 2000);
    }
  } catch (err) {
    showAlert("error", err.message);
    window.setTimeout(() => {
      location.reload(true);
    }, 2000);
  }
};

export const giveReview = async (id, review, rating) => {
  try {
    const res = await axios({
      url: `/api/v1/movies/${id}/reviews`,
      method: "POST",
      data: {
        review,
        rating,
      },
    });

    if (res.data.status == "success") {
      showAlert("success", "Review submitted successfully!");

      window.setTimeout(() => {
        location.reload(true);
      }, 2000);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);

    window.setTimeout(() => {
      location.reload(true);
    }, 2000);
  }
};

export const deleteMovieReview = async (id) => {
  try {
    const res = await axios({
      url: `/api/v1/reviews/${id}`,
      method: "DELETE",
    });

    if (res.status === 204) {
      showAlert("success", "Review Deleted Successfully!");

      window.setTimeout(() => {
        location.reload(true);
      }, 2000);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);

    window.setTimeout(() => {
      location.reload(true);
    }, 2000);
  }
};

// export const getSearchedMovies = async (name) => {
//   try {
//     const res = await axios({
//       url: `/api/v1/movies?name=${name}`,
//       method: "DELETE",
//     });

//     if (res.status == 204) {
//       showAlert("success", "Review deleted succesfully!");

//       // window.setTimeout(() => {
//       //   location.reload(true);
//       // }, 2000);
//     }
//   } catch (err) {
//     showAlert("error", err.response.data.message);

//     // window.setTimeout(() => {
//     //   location.reload(true);
//     // }, 2000);
//   }
// };

//Adding the user Statictics

const ctx = document.getElementById("myChart");

export async function gettingUserStats() {
  try {
    const res = await axios({
      url: "api/v1/users/my-stats",
    });
    let stats = [];

    if (res.data.status === "success") {
      Object.values(res.data.resp).forEach((el) => {
        stats.push(el);
      });

      new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Likes", "Dislikes", "Reviews"],
          datasets: [
            {
              label: "Number of activiy",
              data: stats,
              borderWidth: 10,
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    }
  } catch (err) {
    showAlert("error", "Chart is already displayed!");
  }
}

// console.log(stats);
