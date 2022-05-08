import {history} from "umi";

const LoginRedirect = () => {
  const redirect = history.location.query?.redirect;
  return (
    <div>
      {redirect}
    </div>
  )
}
export default LoginRedirect
