import axios from "axios";
// import { token } from "./apiAuth";
export async function apiUsers(query, name) {
  const token = localStorage.getItem("token");
  // const query = "first";
  // const name = 111111;
  console.log(query);
  console.log(name);
  let url = `http://localhost:5000/api/v1/users?year=${query}`;
  if (name) {
    url += `&keyword=${encodeURIComponent(name)}`;
  }
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { data, error } = await res.json();
  if (error) {
    console.error(error);
    throw new Error("User could not be loaded");
  }
  console.log(data);
  return data;
}
export async function deleteUsers(idOfUser) {
  const token = localStorage.getItem("token");
  const { data, error } = await axios.delete(
    `http://localhost:5000/api/v1/users/${idOfUser}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (error) {
    console.error(error);
    throw new Error("User could not be deleted");
  }
  return data;
}
export async function createUsers(data1) {
  const token = localStorage.getItem("token");
  console.log(data1);
  const { data, error } = await axios.post(
    "http://localhost:5000/api/v1/users",
    data1,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (error) {
    console.error(error);
    throw new Error("User could not be created");
  }

  return data;
}

export async function editUsers(newData2, idOfUser) {
  const token = localStorage.getItem("token");
  console.log(newData2, idOfUser);
  // const { data, error } = await axios.get(
  //   `http://localhost:5000/api/v1/users/${idOfUser}`,
  //   newData2,
  //   {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   }
  // );
  // if (idOfUser)
  const { data, error } = await axios.put(
    `http://localhost:5000/api/v1/users/${idOfUser}`,
    newData2,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (error) {
    console.error(error);
    throw new Error("User could not be  edited");
  }
  console.log(data);
  return data;
}
