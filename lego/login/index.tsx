import { CloseOutlined } from '@ant-design/icons'
import { apiUserResetPassword } from '@keukenhof/api'
import { encrypto } from '@keukenhof/utils'
import React, { useCallback, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { DASHBOARD_PATH } from '../constant'
import { LoginForm } from './LoginForm'
import { ResetPwdForm } from './ResetPwdForm'
import { Form, LoginContainer, message } from './style'

export interface UserLoginParams {
  account: string
  password: string
}

const initialLoginValues: UserLoginParams = {
  account: '',
  password: ''
  // remember: true
}
const initialPwdResetValues = {
  newPassword: '',
  confirm: '',
  remember: true
}

export const tailLayout = {
  wrapperCol: { span: 16 }
}

type LoginPageProps = {
  loginAsync: (form: any) => void
  rootPath?: string
}

export const LoginPage = ({ loginAsync, rootPath = DASHBOARD_PATH }: LoginPageProps) => {
  const [isPwdReset, setIsPwdReset] = useState(false)
  const accountRef = useRef('')
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const setIsReset = useCallback((visible = false) => {
    setIsPwdReset(visible)
  }, [])

  const onLogin = async (form: any) => {
    const res = await dispatch(loginAsync(form))
    // @ts-ignore
    if (!!res) {
      localStorage.setItem('account', encrypto(form.account))
      localStorage.setItem('password', encrypto(form.password))
      const from = (location.state as any)?.from || { pathname: rootPath }
      navigate(from)
    }
  }

  const onResetPwd = async (form: any) => {
    const { confirm, ...rest } = form
    const { message: msg } = await apiUserResetPassword(rest)
    message.success(msg || '密码设置成功')
    setIsReset(false)
  }

  const onFinish = async () => {
    try {
      const { account, password, code, confirm } = await form.validateFields()
      if (!isPwdReset) {
        await onLogin({
          account,
          password
        })
      } else {
        await onResetPwd({
          mobile: account,
          password: confirm,
          code
        })
      }
    } catch (e) {
      console.log('e: ', e)
    }
  }

  function toggle() {
    setIsReset(true)
    form.resetFields()
    form.setFieldsValue({ account: accountRef.current, code: '', confirm: '', password: '' })
  }

  function onChange({ account }: { account: string }) {
    if (account !== undefined) {
      accountRef.current = account
    }
  }
  return (
    <LoginContainer>
      <Form
        autoComplete="off"
        form={form}
        initialValues={isPwdReset ? initialPwdResetValues : initialLoginValues}
        onFinish={onFinish}
        onValuesChange={onChange}
      >
        {isPwdReset ? (
          <>
            <div className="close" onClick={() => setIsReset(false)}>
              <CloseOutlined />
            </div>
            <h3>重置密码</h3>
            <ResetPwdForm />
          </>
        ) : (
          <>
            <div className="only-edu-bg"></div>
            <LoginForm setIsReset={toggle} />
          </>
        )}
      </Form>
    </LoginContainer>
  )
}
