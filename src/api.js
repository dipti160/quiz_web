import api from "./axios";

export const registerUser = async (data) => {
  try {
    const response = await api.post("/register", data);
    return response.data;
  } catch (error) {
    // throw error;
    console.log(error);
  }
};

export const loginUser = async (data) => {
  try {
    const response = await api.post("/login", data);
    return response.data;
  } catch (error) {
    // throw error;
    console.log(error);
  }
};

// Admin Department
export const createDepartment = async (data) => {
  try {
    const response = await api.post("/department", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const listDepartments = async (page, limit, searchTerm) => {
  try {
    const response = await api.get(
      `/departments?page=${page}&limit=${limit}&search=${
        searchTerm ? searchTerm : ""
      }`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllDepartment = async () => {
  try {
    const response = await api.get("/departments/all");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getDepartmentById = async (id) => {
  try {
    const response = await api.get(`/departments/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateDepartment = async (id, data) => {
  try {
    const response = await api.put(`/departments/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteDepartment = async (id) => {
  try {
    const response = await api.delete(`/departments/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Admin Courses

export const createCourse = async (data) => {
  try {
    const response = await api.post("/course", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const listCourses = async () => {
  try {
    const response = await api.get("/courses");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await api.get(`/course/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCourse = async (id, data) => {
  try {
    const response = await api.put(`/course/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await api.delete(`/course/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Admin instructor
export const createInstructor = async (data) => {
  try {
    const response = await api.post("/instructor", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const listInstructors = async () => {
  try {
    const response = await api.get("/instructors");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getInstructorById = async (id) => {
  try {
    const response = await api.get(`/instructor/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateInstructor = async (id, data) => {
  try {
    const response = await api.put(`/instructor/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteInstructor = async (id) => {
  try {
    const response = await api.delete(`/instructor/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// Admin student

export const createStudent = async (data) => {
  try {
    const response = await api.post("/student", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const listStudents = async () => {
  try {
    const response = await api.get("/students");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getStudentById = async (id) => {
  try {
    const response = await api.get(`/student/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateStudent = async (id, data) => {
  try {
    const response = await api.put(`/student/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await api.delete(`/student/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
