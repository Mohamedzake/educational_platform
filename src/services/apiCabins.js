import axios from "axios";
// import { token } from "./apiAuth";
export async function apiCabins(query) {
  console.log(query);
  const token = localStorage.getItem("token");
  const res = await fetch(
    `http://localhost:5000/api/v1/courses?year=${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const { data, error } = await res.json();
  if (error) {
    console.error(error);
    throw new Error("Subject could not be loaded");
  }

  return data;
}

export async function deleteCabins(idOfCourse) {
  const token = localStorage.getItem("token");
  const { data, error } = await axios.delete(
    `http://localhost:5000/api/v1/courses/${idOfCourse}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (error) {
    console.error(error);
    throw new Error("Subject could not be deleted");
  }
  return data;
}
export async function createCabins(data1) {
  const token = localStorage.getItem("token");
  console.log(data1);
  const { data, error } = await axios.post(
    "http://localhost:5000/api/v1/courses",
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
    throw new Error("Subject could not be created");
  }

  return data;
}

export async function editCabins(newDataa, idOfCourse) {
  const token = localStorage.getItem("token");
  console.log(newDataa, idOfCourse);
  // const { data, error } = await axios.get(
  //   `http://localhost:5000/api/v1/courses/${idOfCourse}`,
  //   newDataa
  // );
  // if (idOfCourse)
  const { data, error } = await axios.put(
    `http://localhost:5000/api/v1/courses/${idOfCourse}`,
    newDataa,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (error) {
    console.error(error);
    throw new Error("Subject could not be  edited");
  }
  return data;
}

export async function getSubjects(idOfCourse) {
  const token = localStorage.getItem("token");
  console.log(idOfCourse);

  const { data, error } = await axios.get(
    `http://localhost:5000/api/v1/courses/${idOfCourse}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (error) {
    console.error(error);
    throw new Error("Subject could not be loaded");
  }

  return data;
}
////////////
////
////
///
/////
//test
export async function apiCabinsT() {
  // console.log(query);
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:5000/api/v1/courses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { data, error } = await res.json();
  if (error) {
    console.error(error);
    throw new Error("Subject could not be loaded");
  }

  return data;
}
