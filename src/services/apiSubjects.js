import axios from "axios";
// import { token } from "./apiAuth";
export async function apiSubject() {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:5000/api/v1/materials", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { data, error } = await res.json();
  if (error) {
    console.error(error);
    throw new Error("Subject could not be loaded");
  }
  console.log(data);
  return data;
}

export async function deleteSubject(idOfCourse) {
  const token = localStorage.getItem("token");
  const { data, error } = await axios.delete(
    `http://localhost:5000/api/v1/materials/${idOfCourse}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (error) {
    console.log(idOfCourse);
    console.error(error);
    throw new Error("Subject could not be deleted");
  }

  return data;
}
export async function createSubject(data1) {
  const token = localStorage.getItem("token");
  console.log(data1);
  const { data, error } = await axios.post(
    "http://localhost:5000/api/v1/materials",
    data1,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(data);
  if (error) {
    console.error(error);
    throw new Error("Subject could not be created");
  }

  return data;
}

export async function editSubject(newData2, idOfUser) {
  const token = localStorage.getItem("token");
  console.log(newData2, idOfUser);
  // const { data, error } = await axios.get(
  //   `http://localhost:5000/api/v1/materials/${idOfUser}`,
  //   newData2,
  //   {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }
  // );
  // if (idOfUser)
  const { data, error } = await axios.put(
    `http://localhost:5000/api/v1/materials/${idOfUser}`,
    newData2,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (error) {
    console.log(newData2, idOfUser);
    console.error(error);
    throw new Error("User could not be  edited");
  }
  return data;
}
// export async function getSubjects(idOfCourse) {

//   const { data, error } = await axios.get(
//     `http://localhost:5000/api/v1/courses/${idOfCourse}`
//   );
//   if (error) {
//     console.error(error);
//     throw new Error("Subject could not be loaded");
//   }

//   return data;
// }
