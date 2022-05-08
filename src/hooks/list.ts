import {useEffect, useState} from "react";


export type BaseListFilter  = {
  page: number;
  pageSize: number;
}

const useApiList = <FT,DT>(
  {
    onFetch
  }: {
    onFetch: (filter: FT | BaseListFilter) => Promise<API.PageResultContainer<DT>>
  }
) => {
  const [filter, setFilter] = useState<FT | BaseListFilter>({
    page: 1, pageSize: 20
  });
  const [list, setList] = useState<DT[]>([])
  const [total, setTotal] = useState(0)

  const refresh = async () => {
    const response = await onFetch(filter)
    const data = response.data
    if (!data) {
      return
    }
    setList(data.result)
    setTotal(data.total)
  }
  useEffect(() => {
    refresh()
  },[filter])
  return {
    list,
    filter,
    setFilter,
    total,
    refresh,
  }
}
export default useApiList
