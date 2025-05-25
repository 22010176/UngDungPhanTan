import { DeleteOutlined, DownloadOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tag } from 'antd';
import { createStyles } from "antd-style";
import { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router';

import { DeleteFile, GetFileList } from '@/api/storageApi';
import { FormatFileSize, FormatModifiedDate, GetFileName, IsDir } from '@/utils/fileUtils';
import { Context } from './context';
import { UpdateFileList } from './utills';
import { DeleteFolder } from '@/api/directoryApi';



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
  let { "*": path } = useParams();
  const navigate = useNavigate()
  const { styles } = useStyle();
  const [state, dispatch] = useContext(Context)

  const columns = [
    {
      title: 'Name', dataIndex: 'key', key: 'key',
      render: (text) => {
        const fileName = GetFileName(text)
        return !IsDir(text) ?
          <p className='font-semibold'>{fileName}</p> :
          <Link to={`./${fileName}`}>{fileName}</Link>
      }
    },
    {
      title: 'Type', dataIndex: 'key', key: 'key', render: (key, record) => {
        if (record.key == "../") return ""
        const dir = IsDir(key)
        return <Tag color={dir ? 'blue' : 'green'}>{dir ? "Folder" : "File"}</Tag>
      }
    },
    { title: 'Size', dataIndex: 'size', key: 'size', render: (_, entry) => IsDir(entry.key) ? "" : FormatFileSize(_) },
    { title: 'Modified', dataIndex: 'lastModified', key: 'lastModified', render: (date, entry) => IsDir(entry.key) ? "" : FormatModifiedDate(date) },
    {
      title: 'Actions', key: 'actions', render: (_, record) => {
        if (record.key == "../") return ""
        return (
          <Space>
            <Button type="text" icon={<EditOutlined />} size="small" onClick={e => {
              e.stopPropagation()
              const fileName = GetFileName(record.key)
              dispatch([
                { type: "updateForm", payload: "editFile" },
                { type: "updateFileForm", payload: fileName },
                { type: "updateFileEdit", payload: fileName }
              ])
            }} />
            <Popconfirm title="Delete this item?"
              onConfirm={async e => {
                e.stopPropagation()

                if (!IsDir(record.key)) await DeleteFile(record.key)
                else await DeleteFolder(record.key)

                UpdateFileList(dispatch, path)
              }} okText="Yes" cancelText="No">
              <Button type="text" icon={<DeleteOutlined />} size="small" danger onClick={e => e.stopPropagation()} />
            </Popconfirm>
          </Space>
        )
      }
    }
  ];

  useEffect(function () {
    UpdateFileList(dispatch, path)
  }, [path, dispatch])

  return (
    <Table size='small' columns={columns} dataSource={state.files}
      pagination={{ pageSize: 12 }}
      className={[styles, "mx-2"].join(" ")}
      rowClassName="hover:bg-gray-50 cursor-pointer"
      onRow={record => ({
        onClick: () => {
          if (!IsDir(record.key)) {
            dispatch({ type: "updateSelectedFile", payload: record })
            return
          }

          navigate(`./${GetFileName(record.key)}`)
        },
      })} />
  )
}


export default FileList