import axios from "axios";

// export let token;

export async function login({ email, password }) {
  try {
    const response = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    const token = data.token;
    localStorage.setItem("token", token);
    // process.env.TOKEN = data.token;
    // console.log(process.env.TOKEN);
    console.log(data.token);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function getCurrentUser() {
  try {
    const token = localStorage.getItem("token");
    console.log(6);

    const response = await fetch("http://localhost:5000/api/v1/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        // Include any necessary authentication headers here if required by your API
      },
    });

    if (!response.ok) {
      // console.log(response);
      throw new Error("Failed to fetch current user");
    }

    const data = await response.json();
    console.log(5);
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function editCurrentUserp(newData2) {
  try {
    console.log(newData2);
    const token = localStorage.getItem("token");
    const response = await axios.put(
      "http://localhost:5000/api/v1/users/changeMyPassword",
      newData2,
      {
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Check if the request was successful
    if (!response || response.status !== 200) {
      throw new Error("Failed to update current user");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function editCurrentUserA(newData2) {
  try {
    console.log(newData2);
    const token = localStorage.getItem("token");
    const response = await axios.put(
      "http://localhost:5000/api/v1/users/changePassword/id",
      newData2,
      {
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Check if the request was successful
    if (!response || response.status !== 200) {
      throw new Error("Failed to update current user");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function editCurrentUser(newData2) {
  try {
    console.log(222);
    console.log(newData2);
    const token = localStorage.getItem("token");
    const response = await axios.put(
      "http://localhost:5000/api/v1/users/me",
      newData2,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Check if the request was successful
    if (!response || response.status !== 200) {
      throw new Error("Failed to update current user");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
// logout

// export async function logout(token) {
//   try {
//     console.log(6);
//     token = "";
//     const response = await axios.put("http://localhost:5000/api/v1/users/me", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       // console.log(response);
//       throw new Error("Failed to fetch current user");
//     }

//     const data = await response.json();
//     console.log(5);
//     console.log(data);
//     return data;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }
// export async function logout() {
//   console.log(6);
//   token = "";
// }

// export async function updateCurrentUser({ password, fullName, avatar }) {
//   // 1. Update password OR fullName
//   let updateData;
//   if (password) updateData = { password };
//   if (fullName) updateData = { data: { fullName } };

//   const { data, error } = await supabase.auth.updateUser(updateData);

//   if (error) throw new Error(error.message);
//   if (!avatar) return data;

//   // 2. Upload the avatar image
//   const fileName = `avatar-${data.user.id}-${Math.random()}`;

//   const { error: storageError } = await supabase.storage
//     .from("avatars")
//     .upload(fileName, avatar);

//   if (storageError) throw new Error(storageError.message);

//   // 3. Update avatar in the user
//   const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
//     data: {
//       avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
//     },
//   });

//   if (error2) throw new Error(error2.message);
//   return updatedUser;
// }
