import styles from './index.less';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {Button, Form, message} from 'antd';
import React from 'react';
import {LoginForm, ProFormText} from '@ant-design/pro-form';
import {FormattedMessage, history, SelectLang, useIntl, useModel} from 'umi';
import Footer from '@/components/Footer';
import {registerUser} from '@/services/ant-design-pro/api';

type RegisterUserFormValues = {
  username: string;
  password: string;
  confirm: string;
};
const RegisterPage: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [form]  = Form.useForm<RegisterUserFormValues>();
  const intl = useIntl();
  const handleSubmit = async (values: RegisterUserFormValues) => {
    try {
      // 登录
      const msg: API.LoginResult= await registerUser(values.username,values.password);
      if (msg.success) {
        message.success("sign up success");
        localStorage.removeItem('token')
        setInitialState({
          ...initialState,
          currentUser:undefined
        })
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      }
      console.log(msg);
      // 如果失败去设置用户错误信息
    } catch (error) {
      message.error("sign up failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg" />}
          title="YouAuth Dashboard"
          subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          initialValues={{

          }}
          actions={[]}
          onFinish={async (values) => {
            await handleSubmit(values as RegisterUserFormValues);
          }}
          form={form}
          submitter={{
            render: (props: any) => (
              <Button
                type="primary"
                {...props}
                 />
            ),
          }}
        >
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.username.placeholder',
              defaultMessage: '用户名: admin or user',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.username.required"
                    defaultMessage="请输入用户名!"
                  />
                ),
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.password.placeholder',
              defaultMessage: '密码: ant.design',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.password.required"
                    defaultMessage="请输入密码！"
                  />
                ),
              },
            ]}
          />
          <ProFormText.Password
            name="repassword"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.password.placeholder',
              defaultMessage: '确认密码: ant.design',
            })}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.password.required"
                    defaultMessage="请输入密码！"
                  />
                ),
              },
              {
                validator: (rule, value) => {
                  if (!value || value === '') {
                    return Promise.resolve();
                  }
                  if (value !== form.getFieldValue('password')) {
                    return Promise.reject(
                      intl.formatMessage({
                        id: 'pages.login.password.confirm.error',
                        defaultMessage: '两次输入的密码不匹配!',
                      }),
                    );
                  }
                  return Promise.resolve();
                },
              }
            ]}
          />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign up
            </Button>
          </Form.Item>

          <div
            style={{
              marginBottom: 24,
            }}
          />
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;
