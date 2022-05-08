import {Card, Table} from "antd";
import {PageContainer} from "@ant-design/pro-layout";
import {ColumnsType} from "antd/es/table";
import useMyTokenApp from "@/pages/my/tokens/model";
import {TablePaginationConfig} from "antd/lib/table/interface";
import {useEffect} from "react";

const MyTokensPage = () => {
  const model = useMyTokenApp()
  useEffect(() => {
    model.refresh()
  }, [])
  const columns: ColumnsType<API.MyToken> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'App Name',
      dataIndex: 'app.name',
      key: 'app.name',
      render: (text, record) => {
        return record.app.name
      }
    },
    {
      title: 'Create At',
      dataIndex: 'createAt',
      key: 'createAt',

    },
  ];
  const paginationProps: TablePaginationConfig = {
    total: model.total,
    defaultCurrent: 1,
    defaultPageSize: 20,
    onChange: (page: number) => {
      console.log(page)
      model.setFilter({
        ...model.filter,
        page,
      })
    },
  };
  return (
    <PageContainer
      extra={[]}
    >
      <Card>
        <Table columns={columns} dataSource={model.tokens} pagination={paginationProps}/>
      </Card>
    </PageContainer>
  )
}
export default MyTokensPage
