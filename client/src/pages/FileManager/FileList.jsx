import { DeleteOutlined, DownloadOutlined, EditOutlined, FileOutlined, FolderOutlined } from '@ant-design/icons';
import { Button, Col, Popconfirm, Space, Table, Tag } from 'antd';
import { createStyles } from "antd-style";
import { useContext, useEffect, useState } from "react";
import { Context } from './context';
import { GetFileList } from '@/api/storageApi';
import { FormatFileSize, FormatModifiedDate, GetFileName, IsDir } from '@/utils/fileUtils';

const columns = [
  { title: 'Name', dataIndex: 'key', key: 'key', render: (text) => <p className='font-semibold'>{GetFileName(text)}</p> },
  {
    title: 'Type', dataIndex: 'key', key: 'key', render: key => {
      const dir = IsDir(key)
      return <Tag color={dir ? 'blue' : 'green'}>{dir ? "Folder" : "File"}</Tag>
    }
  },
  { title: 'Size', dataIndex: 'size', key: 'size', render: (_, entry) => IsDir(entry.key) ? "" : FormatFileSize(_) },
  { title: 'Modified', dataIndex: 'lastModified', key: 'lastModified', render: date => FormatModifiedDate(date) },
  {
    title: 'Actions', key: 'actions', render: (_, record) => (
      <Space>
        <Button type="text" icon={<EditOutlined />} size="small" onClick={() => handleEdit(record)} />
        <Button type="text" icon={<DownloadOutlined />} size="small" disabled={record.type === 'folder'} />
        <Popconfirm title="Delete this item?"
          onConfirm={() => {
            // handleDelete(record.key)
          }} okText="Yes" cancelText="No">
          <Button type="text" icon={<DeleteOutlined />} size="small" danger />
        </Popconfirm>
      </Space>
    )
  }
];
const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
        ${antCls}-table {
          ${antCls}-table-container {
            ${antCls}-table-body,
            ${antCls}-table-content {
              scrollbar-width: thin;
              scrollbar-color: #eaeaea transparent;
              scrollbar-gutter: stable;
            }
          }
        }
      `,
  };
});
function FileList() {
  const { styles } = useStyle();
  const [state, dispatch] = useContext(Context)

  useEffect(function () {
    GetFileList()
      .then(files => dispatch({ type: "updateFileList", payload: files.filter(i => i.key.split('/').filter(i => i).length > 1) }))
  }, [])

  return (
    <Table size='small' columns={columns} dataSource={state.files}
      pagination={{ pageSize: 12 }}
      className={[styles, "mx-2"].join(" ")}
      rowClassName="hover:bg-gray-50 cursor-pointer"
      onRow={record => ({
        onClick: () => dispatch({ type: "updateSelectedFile", payload: record }),
      })} />
  )
}


export default FileList