import {generateAuthCode, getLoginApp} from "@/services/ant-design-pro/api";
import {useState} from "react";
import {history} from "umi";

const useAppLoginModel = () => {
  const [app,setApp] = useState<API.App|undefined>()
  const load = async (appId: string) => {
    const response = await getLoginApp(appId)
    if (response.success && response.data) {
      setApp(response.data)
    }
  }
  const allow = async (appId: string) => {
    if (!app) {
      return
    }
    const response = await generateAuthCode(appId)
    if (response.success && response.data) {
      const query = history.location.query
      if (query && query.redirect) {
        const url = new URL(query.redirect as string)
        url.searchParams.append("code", response.data.authCode)
        window.location.href = url.toString()
      }
    }
  }
  return {
   load,app,allow
  };
};

export default useAppLoginModel;
