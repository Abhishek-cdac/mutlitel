import { doGet, doPost, doPut }  from "../utils/request"

export const registerUser = async (data) => {
    return await doPost("api/user/userRegistration", data);
  };
 
  
export const updateUser = async (data) => {
    return await doPut("api/user/updateProfile", data);
  };
  
//   export const loginUser = async (email, password) => {
//     const response = await doPost("admin/userLogin", {
//       userName: email,
//       password,
//     });
//     new FormModel("userDetails")._createForm(response?.data?.data);
//     updateUserAccessInRedux(response?.data?.data?.role);
  
//     return response;
//   };
  
  export const forgotPassword = async (email) => {
    return await doPost("api/user/forgotPassword", { email });
  };
  
  export const changePassword = async (data) => {
    return await doPost("api/user/changePassword", data);
  };
  
  export const resetPassword = async (email, otp) => {
    return await doPost("api/user/resetPassword", { email, otp });
  };
  