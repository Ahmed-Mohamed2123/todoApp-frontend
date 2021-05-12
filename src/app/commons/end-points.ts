const prefixRoute = 'http://localhost:3000/api';
export const ApiEndpoints = {
  AuthEndpoints: {
    login: `${prefixRoute}/user/login`,
    signup: `${prefixRoute}/user/signup`,
    getUserInfo: `${prefixRoute}/user/UserInfo`,
    forgotPassword: `${prefixRoute}/user/forgot-password`,
    resetPassword: `${prefixRoute}/user/reset-password`
  },
  taskEndpoints: {
    addTask: `${prefixRoute}/task/add`,
    editTask: `${prefixRoute}/task/update`,
    deleteTask: `${prefixRoute}/task/delete`,
    getDataById: `${prefixRoute}/task`,
    getAllData: `${prefixRoute}/task/getAll`,
  },
};
