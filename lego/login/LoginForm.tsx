import { LockOutlined, MobileOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import React from 'react'

export interface LoginFormProps {
  setIsReset: () => void
}
const placeholders = {
  mobile: '请输入手机号',
  password: '请输入密码'
}

export function LoginForm({ setIsReset }: LoginFormProps) {
  return (
    <>
      <Form.Item name="account" rules={[{ required: true, message: placeholders.mobile }]}>
        <Input prefix={<MobileOutlined className="site-form-item-icon" />} placeholder={placeholders.mobile} />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: placeholders.password }]}>
        <Input.Password
          type="password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder={placeholders.password}
        />
      </Form.Item>
      {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>记住密码</Checkbox>
      </Form.Item> */}

      <Form.Item>
        <Button htmlType="submit" type="primary" className="login-page-form_button">
          登录
        </Button>
      </Form.Item>
      <Form.Item className="login-tail">
        {/* <Button disabled type="link">
          验证码登录
        </Button> */}
        <Button type="link" onClick={setIsReset}>
          忘记密码
        </Button>
      </Form.Item>
    </>
  )
}
