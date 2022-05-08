import useApiList, {BaseListFilter} from "@/hooks/list";
import {getMyTokenList} from "@/services/ant-design-pro/api";

export type MyTokenListFilter = {} & BaseListFilter
const useMyTokenModel = () => {
  const apiList = useApiList<MyTokenListFilter, API.MyToken>({
    onFetch: (params) => {
      return getMyTokenList(params)
    }
  })
  return {
    tokens:apiList.list,
    total:apiList.total,
    refresh:apiList.refresh,
    setFilter:apiList.setFilter,
    filter:apiList.filter,
  }
}

export default useMyTokenModel
