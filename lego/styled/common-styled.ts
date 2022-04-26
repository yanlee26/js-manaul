export const row = () => `
display: block;
`
export const col = () => `
display: inline-block;  `

export const textEllipsis = () => `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const textEllipsis2 = () => `
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

export const borderBox = () => `
box-sizing: border-box;
`

export const mainPadding = `
padding: 12px;
`

export const clear = () => `
zoom: 1;
&:after {
  content: '';
  display: block;
  clear: both;
}
`

export const noWrap = () => `
text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap;
`

export const bgFull = () => `
background-position: 50%;
background-size: contain;
background-repeat: no-repeat;
`
export default {
  'primary-color': '#13c2c2',
  'theme-color': '#d44439',
  'theme-color-shadow': 'rgba(212, 68, 57, .5)',
  'official-red': '#E82001',
  noWrap,
  bgFull
}

export const colorBlue = '#1890FF'
export const colorGrey = '#CFD3D8'
export const colorRed = '#F05157'
export const colorYellow = '#FFAA16'
export const colorGreen = '#00D199'
export const colorTextBase = '#556675'
/** tree default selected color */
export const treeSelectedDefault = '#ddefff'

export const globalResetStyle = `
    /*整个滚动条*/
  ::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    background-color: transparent;
  }

  /*定义滚动条轨道*/
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  /*定义滑块*/
  ::-webkit-scrollbar-thumb {
    background-color: #ebe8e8;
    border-radius: 4px;
  }
  h1,h2,h3,h4,h5,p,ul,li {
    padding: 0;
    margin: 0;
  }
  ul,li {
    list-style: none;
  } 
  .only-color-green{
    color:${colorGreen};
  }
  .only-color-blue{
    color:${colorBlue};
  }
  .only-color-red{
    color:${colorRed};
  }
  .only-color-yellow{
    color:${colorYellow};
  }
  .only-color-grey{
    color:${colorGrey};
  }
  .text-over{
    ${textEllipsis()}
  }
  .text-line2-over{
    ${textEllipsis2()}
  }

  /** 表格的排序按钮要统一靠近左边 */
  .ant-table-column-sorters {
    justify-content: flex-start!important;
    .ant-table-column-title {
        flex: none;
        margin-right: 8px;
    }
  }

  /** tree的默认选择背景颜色 */
  .ant-tree .ant-tree-node-content-wrapper.ant-tree-node-selected  {
    background-color: ${treeSelectedDefault};
  }
`
