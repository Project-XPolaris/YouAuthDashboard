import {login} from "@/services/ant-design-pro/api";
import {message} from "antd";
import {history} from "@@/core/history";
import {useModel} from "@@/plugin-model/useModel";
import {useIntl} from "@@/plugin-locale/localeExports";

const useLoginModel = () => {
  const intl = useIntl();
  const {initialState, setInitialState} = useModel('@@initialState');
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg: API.LoginResult = await login({...values});
      if (msg.success && msg.data) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);

        localStorage.setItem('token', msg.data.token);
        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const {query} = history.location;
        const {redirect,mode,appid} = query as { redirect: string,mode: string,appid: string };
        if (mode && mode == 'oauth' && appid) {
          history.push(`/user/oauth?appid=${appid}&redirect=${redirect}` );
          return
        }
        history.push(redirect || '/');
        return;
      }
      console.log(msg);
      // 如果失败去设置用户错误信息
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(defaultLoginFailureMessage);
    }
  };
  return {
    handleSubmit,
  };
};

export default useLoginModel;
