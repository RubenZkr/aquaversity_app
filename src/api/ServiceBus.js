import axios from "axios";

const URL = "https://aquaversity-api.azurewebsites.net";
//const URL = "http://localhost:5050";

export const login = async (email, password) => {
  try {
    // Make a POST request to the backend login endpoint
    const response = await axios.post(
      `${URL}/api/users/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      return response.status;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return error.response.status;
    } else {
      throw new Error("An error occurred during login");
    }
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(
      `${URL}/api/users/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      return response.status;
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    throw new Error("An error occurred during test");
  }
};

export const register = async (email, password) => {
  try {
    const response = await axios.post(
      `${URL}/api/users/register`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    if (response.status === 201) {
      return response.status;
    } else {
      throw new Error("Register failed");
    }
  } catch (error) {
    throw new Error("An error occurred while trying to register the user");
  }
};

export const getLevelDetails = async (id) => {
  try {
    const response = await axios.get(`${URL}/level/${id}`,  {
      withCredentials:true,
    });
    if (response.status === 200 || response.status === 403) {
      return response;
    }else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    throw new Error("An error occurred during getting level");
  }
}

export const getExamDetails = async (id) => {
  try{
    const response = await axios.get(`${URL}/level/${id}/Exam`,
    {
      withCredentials:true,
    });
    if (response.status === 200 || response.status === 403) {
      return response;
    }else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  }catch (error) {
    throw new Error("An error occurred during getting exam");
  }
}

export const postAnswer = async (id) => {
  try{
    const response = await axios.post(`${URL}/level/${id}/Exam`,
    {
       id
    }, 
    {
      withCredentials:true,
    });
    if (response.status === 200 || response.status === 401) {
      return response;
    } else {
      throw new Error("Posting answer failed");
    }
  }catch (error){
    throw new Error("An error occurred during posting exam");
  }
}

export const getAnswers = async (id) => {
    try{
        const response = await axios.get(`${URL}/level/${id}/answers`,
        {
        withCredentials:true,
        });
        if (response.status === 200 || response.status === 401) {
        return response;
        } else {
        throw new Error("Getting answers failed");
        }
    }catch (error){
        throw new Error("An error occurred during getting answers");
    }

}

export const getQuestions = async (id) => {
    try{
        const response = await axios.get(`${URL}/level/${id}/questions`,
        {
        withCredentials:true,
        });
        if (response.status === 200 || response.status === 401) {
        return response;
        } else {
        throw new Error("Getting questions failed");
        }
    }catch (error){
        throw new Error("An error occurred during getting questions");
    }


}

export const getLoggedInStatus = async () => {
  try {
    const response = await axios.get(`${URL}/api/users/status`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    throw new Error("An error occurred during test");
  }
};

export const getUserProgress = async () => {
  try {
    const response = await axios.get(`${URL}/progress`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    throw new Error("An error occurred while getting the progress");
  }
};

export const getRole = async () => {
  try {
    const response = await axios.get(`${URL}/api/users/role`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 403) {
      return { role: "none" };
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    if (error.response && error.response.status === 403) {
      return { role: "none" };
    } else {
      throw new Error("An error occurred during test");
    }
  }
};

export const getLevels = async () => {
  try {
    const response = await axios.get(`${URL}/api/levels/all`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    throw new Error("An error occurred during getting role");
  }
};

export const updateUser = async (email, password) => {
  try {
    const response = await axios.put(
      `${URL}/api/users/user`,
      { email, password },
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    throw new Error("An error occurred during updating the user");
  }
};

export const getUserEmail = async () => {
  try {
    const response = await axios.get(`${URL}/api/users/user`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    throw new Error("An error occurred while getting user email");
  }
};

export const postMessage = async (message) => {
  try {
    const response = await axios.post(
      `${URL}/api/forum/message`,
      {
        message,
      },
      {
        withCredentials: true,
      }
    );
    if (response.status === 201) {
      return response.data.message;
    } else {
      throw new Error("Message failed");
    }
  } catch (error) {
    throw new Error("An error occurred while trying to send the message");
  }
};

export const getPosts = async () => {
  try {
    const response = await axios.get(`${URL}/api/forum/messages`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    throw new Error("An error occurred during test");
  }
};

//api/message/{{id}}/like
export const sendLike = async (id) => {
  try {
    const response = await axios.post(
      `${URL}/api/forum/message/${id}/like`,
      {},
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    throw new Error("An error occurred during test");
  }
};

export const getComments = async (id) => {
  try {
    const response = await axios.get(
      `${URL}/api/forum/message/${id}/comments`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    throw new Error("An error occurred during test");
  }
};

export const postComment = async (id, comment) => {
  try {
    const response = await axios.post(
      `${URL}/api/forum/message/${id}/comment`,
      {
        comment,
      },
      {
        withCredentials: true,
      }
    );
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Comment failed");
    }
  } catch (error) {
    throw new Error("An error occurred while trying to send the comment");
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${URL}/api/users/all`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    throw new Error("An error occurred during test");
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${URL}/api/users/${id}/delete`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    throw new Error("An error occurred during test");
  }
};

export const getTestOverview = async () => {
    try {
       await axios.get(`${URL}/api/test/route`);
    } catch (error) {
console.log(error);
        throw new Error("An error occurred during test");
    }
}