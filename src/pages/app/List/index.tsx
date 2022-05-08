import {Button, Card, Modal, Popconfirm, Table} from "antd";
import {PageContainer} from "@ant-design/pro-layout";
import useAppListModel from "@/pages/app/List/model";
import {useEffect, useState} from "react";
import type {ColumnsType} from "antd/es/table";
import {TablePaginationConfig} from "antd/lib/table/interface";
import {PlusOutlined} from "@ant-design/icons";
import NewAppDialog from "@/components/NewAppDialog";


const AppListPage = () => {
  const model = useAppListModel()
  const [displaySecret, setDisplaySecret] = useState<string | null>(null)
  const [isNewAppDialogVisible, setIsNewAppDialogVisible] = useState<boolean>(false)
  useEffect(() => {
    model.refresh()
  }, [])
  const paginationProps: TablePaginationConfig = {
    total: model.total,
    defaultCurrent: 1,
    defaultPageSize: 20,
    onChange: (page: number, pageSize?: number) => {
      console.log({page, pageSize})
      model.setFilter({
        ...model.filter,
        page,
      })
    },
  };
  const columns: ColumnsType<API.App> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'AppID',
      dataIndex: 'appId',
      key: 'appId',
    },
    {
      title: 'Secret',
      dataIndex: 'secret',
      key: 'secret',
      render: (text, record) => {
        return <a onClick={() => setDisplaySecret(text)}>{record.secret.substr(0, 10)}...</a>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Popconfirm
            title="Confirm to delete?"
            onConfirm={() => model.deleteApp(record.appId)}
            okText="Yes"
            cancelText="No"
          >
        <a>Delete</a>
          </Popconfirm>
      </span>
      ),
    },
  ];
  return (
    <PageContainer
      extra={
        <div>
          <Button type="primary" onClick={() => {
            setIsNewAppDialogVisible(true)
          }} icon={<PlusOutlined/>}>
            新建
          </Button>
        </div>
      }
    >
      <Modal title="Secret"
             visible={Boolean(displaySecret)}
             onOk={() => setDisplaySecret(null)}
             onCancel={() => setDisplaySecret(null)}
      >
        <p>{displaySecret}</p>
      </Modal>
      <NewAppDialog
        visible={isNewAppDialogVisible}
        onCancel={() => setIsNewAppDialogVisible(false)}
        onOk={(values) => model.newApp(values)}
      />
      <Card>
        <Table columns={columns} dataSource={model.apps} pagination={paginationProps}/>
      </Card>
    </PageContainer>
  )
}
export default AppListPage
