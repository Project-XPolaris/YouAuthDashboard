import {changeMyPassword} from "@/services/ant-design-pro/api";

const useChangePassword = () => {
  const changePassword = async (oldPassword: string,newPassword: string) => {
    await changeMyPassword(oldPassword, newPassword)
  }
  return {
    changePassword
  }
}
export default useChangePassword
