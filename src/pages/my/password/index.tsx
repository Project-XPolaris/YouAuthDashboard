import {Button, Card, Form, Input } from "antd";
import {PageContainer} from "@ant-design/pro-layout";
import useChangePassword from "@/pages/my/password/model";
type ChangePasswordForm = {

  oldPassword: string;
  password: string;
  repassword: string;

}
const ChangePasswordPage = () => {
  const model = useChangePassword();
  const onFinish = async (values: ChangePasswordForm) => {
    await model.changePassword(values.oldPassword,values.password);
  };
  const [form] = Form.useForm<ChangePasswordForm>();
  return (
    <PageContainer
      extra={[]}
    >
      <Card>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          form={form}
          autoComplete="off"
        >
          <Form.Item
            label="Old Password"
            name="oldPassword"
            rules={[{ required: true, message: 'Please input your old password!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="repassword"
            rules={[{ required: true, message: 'Please reinput your password!' },{
              validator: (_, value) => {
                if (!value || value === form.getFieldValue('password')) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
              },
            }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Change
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
    )

}
export default ChangePasswordPage;
