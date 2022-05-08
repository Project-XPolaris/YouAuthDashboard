import {useEffect, useState} from "react";
import {createApp, deleteAppByAppId, getAppList} from "@/services/ant-design-pro/api";
import {message} from "antd";

type AppListQueryParams = {
  page: number;
  pageSize: number;

};
const useAppListModel = () => {
  const [filter, setFilter] = useState<AppListQueryParams>({
    page: 1,
    pageSize: 10,
  });
  const [apps, setApps] = useState<API.App[]>([])
  const [total, setTotal] = useState(0)

  const refresh = async () => {
    const response = await getAppList({page: filter.page, pageSize: filter.pageSize})
    const data = response.data
    if (!data) {
      return
    }
    setApps(data.result)
    setTotal(data.total)
  }
  useEffect(() => {

  },[filter])
  const newApp = async ({name}: { name: string }) => {
    const response: API.BaseResult<undefined> = await createApp(name)
    if (response.success) {
      message.success(`create ${name} success`)
      await refresh()
      return
    }
    message.error(`create error: ${response.err} [${response.code}]`)
  }
  const deleteApp = async (id: string) => {
    const response: API.BaseResult<undefined> = await deleteAppByAppId(id)
    if (response.success) {
      message.success(`delete ${id} success`)
      await refresh()
      return
    }
    message.error(`delete error: ${response.err} [${response.code}]`)
  }
  return {
    apps,
    filter,
    setFilter,
    total,
    refresh,
    newApp,
    deleteApp
  }
}
export default useAppListModel
