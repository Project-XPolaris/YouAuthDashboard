import {Form, Input, Modal} from "antd";

export interface NewAppDialogProps {
    visible: boolean;
    onCancel: () => void;
    onOk: ({name}: {name: string}) => void;
}
const NewAppDialog = ({visible,onCancel,onOk}: NewAppDialogProps) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new app"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onOk(values);
            onCancel();
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="name"
          label="Appname"
          rules={[{ required: true, message: 'Please input the app name!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default NewAppDialog
