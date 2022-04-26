import { apiUserSetPassword } from '@keukenhof/api'
import { Button, Form, Input, message } from 'antd'
import React, { ChangeEvent, useState } from 'react'
import { pwdPattern } from '../../login/ResetPwdForm'
import { StyledModal } from '../style'

type ValidateStatus = Parameters<typeof Form.Item>[0]['validateStatus']

const formItemLayout = {
  labelCol: {
    xs: { span: 6 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 }
  }
}
const PLACEHOLDER = '请输入'
const formWarningConfig = {
  oldPassword: {
    label: '原密码',
    warning: `${PLACEHOLDER}原密码`
  },
  newPassword: {
    label: '新密码',
    warning: `${PLACEHOLDER}新密码`
  },
  confirm: {
    label: '新密码确认',
    warning1: `${PLACEHOLDER}新密码确认`,
    warning2: `两次输入的新密码不一致`
  }
}
export function newPwdConfirmValidate(value: string): { validateStatus: ValidateStatus; errorMsg: string | null } {
  const len = value.length
  const tips: Record<string, TipType> = {
    lessThan8: { value, validateStatus: 'error', errorMsg: '新密码不得低于8位' },
    moreThan20: { value, validateStatus: 'error', errorMsg: '新密码不得超过20位' },
    invalide: { value, validateStatus: 'error', errorMsg: '密码支持大小写字母、数字和_-!@#$%^&*()' },
    success: { value, validateStatus: 'success', errorMsg: null }
  }
  let tip = tips.success

  switch (true) {
    case len < 8: {
      tip = tips.lessThan8
      break
    }
    case len > 20: {
      tip = tips.moreThan20
      break
    }
    case !pwdPattern.test(value): {
      tip = tips.invalide
      break
    }
    default: {
      tip = tips.success
      break
    }
  }
  return tip
}

interface TweakPasswordModalProps {
  isFirstTimeLogin: boolean
  userId: number
  visible: boolean
  closable?: boolean
  setVisible: (v: boolean) => void
  onSuccess: () => void
}
interface TipType {
  value: string
  validateStatus: ValidateStatus
  errorMsg: string | null
}
export function TweakPasswordModal({
  visible,
  closable,
  isFirstTimeLogin,
  userId,
  onSuccess,
  setVisible
}: TweakPasswordModalProps) {
  const [form] = Form.useForm()
  const [newPassword, setNewPassword] = useState<TipType>({} as TipType)

  const onNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setNewPassword({
      ...newPwdConfirmValidate(value),
      value
    })
  }

  const onSubmit = async () => {
    try {
      const formData = await form.validateFields()
      formData.userId = userId
      const { success } = await apiUserSetPassword(formData)

      if (success) {
        message.success('修改成功')
        form.resetFields()
        onSuccess()
      }
    } catch (e) {
      console.error('apiUserSetPassword', e)
    }
  }
  function onClose() {
    setVisible(false)
  }

  return (
    <StyledModal
      title="修改密码"
      width={480}
      centered
      visible={visible}
      closable={closable}
      maskClosable={false}
      onCancel={onClose}
      footer={[
        !isFirstTimeLogin && (
          <Button key="back" onClick={onClose}>
            取消
          </Button>
        ),
        <Button key="submit" type="primary" onClick={onSubmit}>
          确定
        </Button>
      ]}
    >
      <Form {...formItemLayout} form={form} name="register" initialValues={{}} scrollToFirstError>
        <Form.Item
          name="oldPassword"
          label={formWarningConfig.oldPassword.label}
          rules={[
            {
              required: true,
              message: formWarningConfig.oldPassword.warning
            }
          ]}
        >
          <Input.Password placeholder={PLACEHOLDER} />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label={formWarningConfig.newPassword.label}
          validateStatus={newPassword.validateStatus}
          help={newPassword.errorMsg}
          rules={[
            {
              required: true,
              message: formWarningConfig.newPassword.warning
            }
          ]}
        >
          <Input.Password placeholder={PLACEHOLDER} onChange={onNewPasswordChange} />
        </Form.Item>

        <Form.Item
          name="confirm"
          label={formWarningConfig.confirm.label}
          dependencies={['newPassword']}
          rules={[
            {
              required: true,
              message: formWarningConfig.confirm.warning1
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error(formWarningConfig.confirm.warning2))
              }
            })
          ]}
        >
          <Input.Password placeholder={PLACEHOLDER} />
        </Form.Item>
      </Form>
    </StyledModal>
  )
}
