import { UnorderedListOutlined } from '@ant-design/icons'
import { Button, Form, Popconfirm } from 'antd'
import React, { useMemo } from 'react'
import { CheckboxInput } from '../customForm'
import { CustomCheckboxInputOptionProps } from '../customForm/interface'
import { ConfigurableColumnsType } from './interface'
import { StyPopCheckboxWrap } from './style'

interface Props {
  initialValue: string[]
  options: ConfigurableColumnsType<any>
  style?: React.CSSProperties
  onSelect: (mergeColumns: string[]) => void
}

const ConfigurableColumns = ({ initialValue, options, style, onSelect }: Props) => {
  const [form] = Form.useForm()

  const optionList = useMemo(() => {
    return (
      [...options].map(
        (item: any) =>
          ({
            value: item.title,
            code: item.dataIndex,
            disabled: item.defaultShow
          } as CustomCheckboxInputOptionProps)
      ) || []
    )
  }, [options])

  const handleConfirm = async () => {
    const formData = await form.validateFields()
    onSelect(formData.columns)
  }

  const handleVisibleChange = (
    visible: boolean,
    e?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (!visible && !e) {
      form.resetFields()
    }
  }

  return (
    <Popconfirm
      icon={null}
      placement="bottomRight"
      title={
        <StyPopCheckboxWrap>
          <Form name="channelColumnsForm" form={form}>
            <CheckboxInput
              name="columns"
              FormItem={Form.Item}
              optionList={optionList}
              initialValue={initialValue}
              responsive={false}
              labelCol={{ span: 0 }}
              wrapperCol={{ span: 24 }}
            />
          </Form>
        </StyPopCheckboxWrap>
      }
      onConfirm={handleConfirm}
      onVisibleChange={handleVisibleChange}
      okText="确定"
      okButtonProps={{ style: { height: '32px', padding: '4px 23px' } }}
      cancelButtonProps={{ hidden: true }}
    >
      <Button type="ghost" style={style} icon={<UnorderedListOutlined />}>
        选择列
      </Button>
    </Popconfirm>
  )
}

export { ConfigurableColumns, ConfigurableColumnsType }
