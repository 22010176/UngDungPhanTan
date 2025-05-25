import { CalendarOutlined, DeleteOutlined, DownloadOutlined, EditOutlined, EyeOutlined, FileTextOutlined, FolderOutlined } from '@ant-design/icons';
import { Button, Card, Descriptions, Popconfirm, Space, Tag } from 'antd';
import { useContext } from "react";

import { FormatFileSize, FormatModifiedDate, GetFileName, IsDir } from '@/utils/fileUtils';

import { Context } from './context';

function FileDetails() {
  const [state, dispatch] = useContext(Context)
  const selectedFile = state.selectedFile

  const handleDelete = key => {

  };
  const handleEdit = key => {

  };

  function UnSelectedFile() {
    dispatch({ type: "updateSelectedFile", payload: null })
  }
  return (
    <Card title={<Space><EyeOutlined />File Details</Space>} className="h-full overflow-auto" extra={
      <Button type="text" size="small" onClick={UnSelectedFile} >X</Button>}>
      <div className="text-center mb-4">
        {selectedFile.type === 'folder' ?
          <FolderOutlined className="text-6xl text-blue-500" /> :
          <FileTextOutlined className="text-6xl text-gray-500" />}
      </div>

      <Descriptions column={1} size="small">
        <Descriptions.Item label="Name">
          <div className="font-medium">{GetFileName(selectedFile.key)}</div>
        </Descriptions.Item>
        <Descriptions.Item label="Type">
          <Tag color={IsDir(selectedFile.key) === 'folder' ? 'blue' : 'green'}>
            {IsDir(selectedFile.key) ? "Folder" : "File"}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Size">
          {FormatFileSize(selectedFile.size)}
        </Descriptions.Item>
        <Descriptions.Item label="Modified">
          <Space>
            <CalendarOutlined />
            {FormatModifiedDate(selectedFile.lastModified)}
          </Space>
        </Descriptions.Item>
      </Descriptions>

      <div className="mt-4 space-y-2">
        <Button type="primary" block icon={<DownloadOutlined />} disabled={selectedFile.type === 'folder'}>
          Download
        </Button>
        {/* <Button block icon={<EditOutlined />} onClick={e => {
          e.stopPropagation()
          handleEdit(selectedFile.key)
        }}>
          Rename
        </Button> */}
        {/* <Popconfirm title="Delete this item?" okText="Yes" cancelText="No"
          onConfirm={() => {
            handleDelete(selectedFile.key);
            dispatch({ type: "updateSelectedFile", payload: null })
          }}>
          <Button block danger icon={<DeleteOutlined />} onClick={e => e.stopPropagation()}>Delete</Button>
        </Popconfirm> */}
      </div>
    </Card>
  )
}

export default FileDetails