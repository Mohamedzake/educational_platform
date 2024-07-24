import axios from "axios";

export async function apiQuiz(idOfCourse, targett) {
  const token = localStorage.getItem("token");
  console.log(idOfCourse, targett);
  // console.log(data9);
  // console.log(data9?.course, data9?.target);
  // const targett = data9?.target;
  // console.log(targett);
  const res = await fetch(
    `http://localhost:5000/api/v1/questions?course=${idOfCourse}&target=${targett}`,
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
  console.log(data);
  return data;
}
export async function createQuiz(data1) {
  const token = localStorage.getItem("token");
  // console.log(idOfCourse);
  console.log(data1);
  const { data, error } = await axios.post(
    `http://localhost:5000/api/v1/questions`,

    data1,
    {
      headers: {
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
export async function deleteQuiz(idOfCourse) {
  const token = localStorage.getItem("token");
  console.log(idOfCourse);
  const { data, error } = await axios.delete(
    `http://localhost:5000/api/v1/questions/${idOfCourse}`,
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

export async function editQuiz(newData2, idOfUser) {
  const token = localStorage.getItem("token");
  console.log(newData2, idOfUser);

  const { data, error } = await axios.put(
    `http://localhost:5000/api/v1/questions/${idOfUser}`,
    newData2,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "multipart/form-data",
      },
    }
  );
  if (error) {
    console.log(error.message);
    console.error(error);
    throw new Error("User could not be  edited");
  }
  console.log(data);
  return data;
}
///
///
///
///
///
///
///

///////////////////////////////////// dateeeeeeeeee
export async function apiQuizDate(idOfCourse) {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `http://localhost:5000/api/v1/schedules?course=${idOfCourse}`,
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
  console.log(data);
  return data;
}
export async function createQuizDate(data1) {
  const token = localStorage.getItem("token");
  // console.log(idOfCourse);
  console.log(data1);
  const { data, error } = await axios.post(
    `http://localhost:5000/api/v1/schedules`,

    data1,
    {
      headers: {
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
export async function deleteQuizDate(idOfCourse) {
  const token = localStorage.getItem("token");
  console.log(idOfCourse);
  const { data, error } = await axios.delete(
    `http://localhost:5000/api/v1/schedules/${idOfCourse}`,
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

export async function editQuizDate(newData2, idOfUser) {
  const token = localStorage.getItem("token");
  console.log(newData2, idOfUser);

  const { data, error } = await axios.put(
    `http://localhost:5000/api/v1/schedules/${idOfUser}`,
    newData2,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "multipart/form-data",
      },
    }
  );
  if (error) {
    console.log(error.message);
    console.error(error);
    throw new Error("User could not be  edited");
  }
  console.log(data);
  return data;
}
//////////
//////
//////////
///////////////
//////////
//////////////
export async function createQuizGr(data1) {
  const token = localStorage.getItem("token");
  // console.log(idOfCourse);
  console.log(data1);
  const { data, error } = await axios.post(
    `http://localhost:5000/api/v1/grades`,

    data1,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (error) {
    console.error(error);
    throw new Error("Subject could not be created");
  }
  console.log(data);
  return data;
}
export async function apiQuizAll(target, subjectId) {
  const token = localStorage.getItem("token");
  console.log(target);
  console.log(subjectId);
  const res = await fetch(
    `http://localhost:5000/api/v1/grades?course=${subjectId}&target=${target}&sort=username`,
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
  console.log(data);
  return data;
}
export async function deleteQuizGrade(idOfCourse) {
  const token = localStorage.getItem("token");
  console.log(idOfCourse);
  const { data, error } = await axios.delete(
    `http://localhost:5000/api/v1/grades/${idOfCourse}`,
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

export async function editQuizGrade(newData2, idOfUser) {
  const token = localStorage.getItem("token");
  console.log(newData2, idOfUser);

  const { data, error } = await axios.put(
    `http://localhost:5000/api/v1/grades/${idOfUser}`,
    newData2,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "multipart/form-data",
      },
    }
  );
  if (error) {
    console.log(error.message);
    console.error(error);
    throw new Error("User could not be  edited");
  }
  console.log(data);
  return data;
}
/////
////
//type
//
//localhost:5000//api/v1/types
export async function apiQuizType(idOfCourse) {
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:5000/api/v1/types`, {
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
export async function createQuizType(data1) {
  const token = localStorage.getItem("token");
  // console.log(idOfCourse);
  console.log(data1);
  const { data, error } = await axios.post(
    `http://localhost:5000/api/v1/types`,

    data1,
    {
      headers: {
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
