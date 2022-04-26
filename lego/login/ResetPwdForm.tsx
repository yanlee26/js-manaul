import { LockOutlined, MailOutlined, MobileOutlined } from '@ant-design/icons'
import { apiCheckMobileIsExist, apiMobileSendVCode } from '@keukenhof/api'
import { Button, Form, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'

interface ResetPwdFormProps {}
const telephone = /^[1]([3-9])[0-9]{9}$/
export const pwdPattern = /^[a-zA-Z0-9_\-!@#$%^&*()]{8,20}$/
const placeholders = {
  mobile: '请输入手机号',
  code: '请输入验证码',
  password: '请输入密码',
  confirm: '请再次输入密码',
  msg: '手机号不存在'
}
const hiddenStyle = {
  height: 0,
  width: 0,
  opacity: 0,
  border: 0,
  margin: 0,
  padding: 0
}
const [TIME, DURATION] = [1000, 60]

export function ResetPwdForm({}: ResetPwdFormProps) {
  const [delay, setDelay] = useState<number>(0)
  const [msg, setMsg] = useState('')
  const [pwdValue, setPwdValue] = useState('')
  const [isMobileValidate, setMobileValidate] = useState<boolean>(false)

  useEffect(() => {
    function tick() {
      setDelay(value => --value)
    }
    if (delay) {
      const id = setTimeout(tick, TIME)
      return () => clearInterval(id)
    }
  }, [delay])

  async function getCode(mobile: string) {
    try {
      const { message: msg } = await apiMobileSendVCode({
        mobile,
        smsTemplate: 'RESET_PASSWORD'
      })
      message.success(msg || '验证码发送成功')
      setDelay(DURATION)
    } catch (e) {
      console.log(e)
    }
  }

  function validateMobileRule() {
    let errorMsg = ''
    return {
      async validator(_: any, value: string) {
        if (!value) {
          errorMsg = placeholders.mobile
        } else if (telephone.test(value)) {
          try {
            const { success, message } = await apiCheckMobileIsExist(value)
            if (success) {
              return setMobileValidate(true)
            } else {
              errorMsg = message || placeholders.msg
            }
          } catch (e) {
            console.log(e)
          }
        } else {
          errorMsg = `请输入正确格式的手机号`
        }

        setMobileValidate(false)
        return Promise.reject(errorMsg)
      },
      validateTrigger: 'onChange'
    }
  }

  function onChange(params: any) {
    const value = params.target.value
    setPwdValue(value)
    let errorMsg = ''

    switch (true) {
      case !value: {
        errorMsg = placeholders.password
        break
      }
      case value.length < 8 || value.length > 20: {
        errorMsg = '密码不得低于8位，不得超过20位'
        break
      }
      case !pwdPattern.test(value): {
        errorMsg = '密码支持大小写字母、数字和_-!@#$%^&*()'
        break
      }

      default: {
        break
      }
    }
    setMsg(errorMsg)
  }

  function onEmptyPwdValidate() {
    if (!pwdValue) {
      setMsg(placeholders.password)
    }
  }

  return (
    <>
      <Form.Item name="account" rules={[validateMobileRule]}>
        <Input
          type="mobile"
          maxLength={11}
          prefix={<MobileOutlined className="site-form-item-icon" />}
          placeholder={placeholders.mobile}
        />
      </Form.Item>
      <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.mobile !== currentValues.mobile}>
        {({ getFieldValue }) => {
          const phoneNum = getFieldValue('account')
          return (
            <Form.Item name="code" rules={[{ required: true, message: `${placeholders.code}` }]}>
              <Input
                type="search"
                prefix={<MailOutlined className="site-form-item-icon" />}
                suffix={
                  <Button type="link" disabled={!isMobileValidate || !!delay} onClick={() => getCode(phoneNum)}>
                    {delay && delay < DURATION ? `${delay}s后重新获取` : '获取验证码'}
                  </Button>
                }
                placeholder={placeholders.code}
              />
            </Form.Item>
          )
        }}
      </Form.Item>

      <Form.Item name="newPassword" className="custom-form-item" validateStatus={msg ? 'error' : 'success'}>
        {/* NOTE: hack https://www.zhihu.com/question/23529765 */}
        <input type="text" name="fake" style={hiddenStyle} />

        <Input.Password
          onChange={onChange}
          value={pwdValue}
          //NOTE: hack https://blog.csdn.net/qq_37233023/article/details/108469025
          // https://github.com/ant-design/ant-design/issues/18808
          autoComplete="new-password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder={placeholders.password}
        />
        {/* NOTE: hack msg */}
        <div className="ant-form-item-explain ant-form-item-explain-error">
          <div role="alert">{msg}</div>
        </div>
      </Form.Item>

      <Form.Item
        name="confirm"
        rules={[
          { required: true, message: `${placeholders.confirm}` },
          () => ({
            validator(_, value) {
              if (!value || pwdValue === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('两次输入的密码不一致'))
            }
          })
        ]}
      >
        <Input.Password
          type="password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder={placeholders.confirm}
        />
      </Form.Item>
      {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>记住密码</Checkbox>
      </Form.Item> */}

      <Form.Item>
        <Button htmlType="submit" type="primary" className="login-page-form_button" onClick={onEmptyPwdValidate}>
          重置密码
        </Button>
      </Form.Item>
    </>
  )
}
