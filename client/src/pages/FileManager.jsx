import React, { useState } from 'react';
import { Layout, Table, Button, Input, Space, Popconfirm, Upload, message, Modal, Select, Tag, Progress, Card, Row, Col, Descriptions } from 'antd';
import { FolderOutlined, FileOutlined, DeleteOutlined, EditOutlined, UploadOutlined, PlusOutlined, SearchOutlined, DownloadOutlined, DatabaseOutlined, FileTextOutlined, CalendarOutlined, EyeOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';

const { Header, Content, Footer } = Layout;
const { Search } = Input;
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
export default function FileManager() {
  const [files, setFiles] = useState([
    { key: '1', name: 'Documents', type: 'folder', size: '-', modified: '2024-01-15' },
    { key: '2', name: 'report.pdf', type: 'file', size: '2.4 MB', modified: '2024-01-14' },
    { key: '3', name: 'Images', type: 'folder', size: '-', modified: '2024-01-13' },
    { key: '4', name: 'presentation.pptx', type: 'file', size: '5.1 MB', modified: '2024-01-12' },
    { key: '5', name: 'data.xlsx', type: 'file', size: '856 KB', modified: '2024-01-11' },
    { key: '6', name: 'data.xlsx', type: 'file', size: '856 KB', modified: '2024-01-11' },
    { key: '7', name: 'data.xlsx', type: 'file', size: '856 KB', modified: '2024-01-11' },
    { key: '8', name: 'data.xlsx', type: 'file', size: '856 KB', modified: '2024-01-11' },
    { key: '9', name: 'data.xlsx', type: 'file', size: '856 KB', modified: '2024-01-11' },
    { key: '10', name: 'data.xlsx', type: 'file', size: '856 KB', modified: '2024-01-11' },
    { key: '11', name: 'data.xlsx', type: 'file', size: '856 KB', modified: '2024-01-11' },
    { key: '12', name: 'data.xlsx', type: 'file', size: '856 KB', modified: '2024-01-11' },
    { key: '13', name: 'data.xlsx', type: 'file', size: '856 KB', modified: '2024-01-11' },
    { key: '14', name: 'data.xlsx', type: 'file', size: '856 KB', modified: '2024-01-11' },
    { key: '15', name: 'data.xlsx', type: 'file', size: '856 KB', modified: '2024-01-11' },
    { key: '16', name: 'data.xlsx', type: 'file', size: '856 KB', modified: '2024-01-11' },
    { key: '17', name: 'data.xlsx', type: 'file', size: '856 KB', modified: '2024-01-11' },
    { key: '18', name: 'data.xlsx', type: 'file', size: '856 KB', modified: '2024-01-11' },
    { key: '19', name: 'data.xlsx', type: 'file', size: '856 KB', modified: '2024-01-11' },
    { key: '20', name: 'data.xlsx', type: 'file', size: '856 KB', modified: '2024-01-11' },
    { key: '21', name: 'data.xlsx', type: 'file', size: '856 KB', modified: '2024-01-11' },
    { key: '22', name: 'data.xlsx', type: 'file', size: '856 KB', modified: '2024-01-11' },
    { key: '23', name: 'data.xlsx', type: 'file', size: '856 KB', modified: '2024-01-11' },
  ]);

  const [filteredFiles, setFilteredFiles] = useState(files);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  const [editName, setEditName] = useState('');
  const [editType, setEditType] = useState('file');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSearch = (value) => {
    const filtered = files.filter(file =>
      file.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredFiles(filtered);
  };

  const handleDelete = (key) => {
    const newFiles = files.filter(file => file.key !== key);
    setFiles(newFiles);
    setFilteredFiles(newFiles);
    message.success('File deleted successfully');
  };

  const handleEdit = (record) => {
    setEditingFile(record);
    setEditName(record.name);
    setEditType(record.type);
    setIsModalVisible(true);
  };

  const handleSave = () => {
    if (!editName.trim()) {
      message.error('Please enter a name');
      return;
    }

    const newFiles = files.map(file =>
      file.key === editingFile.key
        ? { ...file, name: editName, type: editType }
        : file
    );
    setFiles(newFiles);
    setFilteredFiles(newFiles);
    setIsModalVisible(false);
    setEditingFile(null);
    message.success('File updated successfully');
  };

  // Storage information
  const totalStorage = 100; // GB
  const usedStorage = 68.5; // GB
  const storagePercent = (usedStorage / totalStorage) * 100;

  const handleNewFolder = () => {
    const newFolder = {
      key: Date.now().toString(),
      name: 'New Folder',
      type: 'folder',
      size: '-',
      modified: new Date().toISOString().split('T')[0]
    };
    const newFiles = [...files, newFolder];
    setFiles(newFiles);
    setFilteredFiles(newFiles);
    message.success('New folder created');
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const newFile = {
        key: Date.now().toString(),
        name: file.name,
        type: 'file',
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        modified: new Date().toISOString().split('T')[0]
      };
      const newFiles = [...files, newFile];
      setFiles(newFiles);
      setFilteredFiles(newFiles);
      message.success('File uploaded successfully');
      return false;
    },
    showUploadList: false
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          {record.type === 'folder' ?
            <FolderOutlined className="text-blue-500" /> :
            <FileOutlined className="text-gray-500" />
          }
          <span className="font-medium">{text}</span>
        </Space>
      )
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag color={type === 'folder' ? 'blue' : 'green'}>
          {type.toUpperCase()}
        </Tag>
      )
    },
    { title: 'Size', dataIndex: 'size', key: 'size' },
    { title: 'Modified', dataIndex: 'modified', key: 'modified' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="text" icon={<EditOutlined />} size="small" onClick={() => handleEdit(record)} />
          <Button type="text" icon={<DownloadOutlined />} size="small" disabled={record.type === 'folder'} />
          <Popconfirm title="Delete this item?" onConfirm={() => handleDelete(record.key)} okText="Yes" cancelText="No">
            <Button type="text" icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      )
    }
  ];
  const { styles } = useStyle();
  return (
    <>
      <Content className="p-6 overflow-hidden">
        <div className="p-4 flex items-center justify-between flex-shrink-0">
          <Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleNewFolder}>
              New Folder
            </Button>
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>
                Upload File
              </Button>
            </Upload>
          </Space>

          <Search placeholder="Search files..." onSearch={handleSearch} onChange={(e) => handleSearch(e.target.value)} style={{ width: 250 }} prefix={<SearchOutlined />} />
        </div>

        <Row className="h-full">
          <Col span={selectedFile ? 16 : 24} className="h-full">
            <Table size='small' columns={columns} dataSource={filteredFiles}
              pagination={{ pageSize: 12 }}
              className={[styles, "m-2"].join(" ")}
              rowClassName="hover:bg-gray-50 cursor-pointer"
              onRow={(record) => ({
                onClick: () => setSelectedFile(record),
              })}
            />
          </Col>

          {selectedFile && (
            <Col span={8} className="h-full">
              <Card title={<Space><EyeOutlined />File Details</Space>} className="h-full overflow-auto" extra={
                <Button type="text" size="small" onClick={() => setSelectedFile(null)}>
                  ×
                </Button>
              }>
                <div className="text-center mb-4">
                  {selectedFile.type === 'folder' ?
                    <FolderOutlined className="text-6xl text-blue-500" /> :
                    <FileTextOutlined className="text-6xl text-gray-500" />}
                </div>

                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Name">
                    <div className="font-medium">{selectedFile.name}</div>
                  </Descriptions.Item>
                  <Descriptions.Item label="Type">
                    <Tag color={selectedFile.type === 'folder' ? 'blue' : 'green'}>
                      {selectedFile.type.toUpperCase()}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Size">
                    {selectedFile.size}
                  </Descriptions.Item>
                  <Descriptions.Item label="Modified">
                    <Space>
                      <CalendarOutlined />
                      {selectedFile.modified}
                    </Space>
                  </Descriptions.Item>
                </Descriptions>

                <div className="mt-4 space-y-2">
                  <Button type="primary" block icon={<DownloadOutlined />} disabled={selectedFile.type === 'folder'}>
                    Download
                  </Button>
                  <Button block icon={<EditOutlined />} onClick={() => handleEdit(selectedFile)}>
                    Rename
                  </Button>
                  <Popconfirm title="Delete this item?" okText="Yes" cancelText="No"
                    onConfirm={() => {
                      handleDelete(selectedFile.key);
                      setSelectedFile(null);
                    }}>
                    <Button block danger icon={<DeleteOutlined />}>Delete</Button>
                  </Popconfirm>
                </div>
              </Card>
            </Col>
          )}
        </Row>
      </Content>

      {/* Fixed Footer with Storage Info */}
      {/* <div className="bg-white shadow-lg"> */}
      <Card size="small" className="w-full ">
        <div className="flex items-center space-x-5">
          <DatabaseOutlined className="text-blue-500 text-lg" />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-600">Storage Usage</span>
              <span className="text-sm font-medium">{usedStorage} GB / {totalStorage} GB</span>
            </div>
            <Progress
              percent={Math.round(storagePercent)}
              status={storagePercent > 80 ? 'exception' : 'active'}
              strokeColor={storagePercent > 80 ? '#ff4d4f' : '#1890ff'}
              size="small" />
          </div>
        </div>
      </Card>
      {/* </div> */}

      <Modal
        open={isModalVisible} onOk={handleSave} okText="Save"
        onCancel={() => {
          setIsModalVisible(false);
          setEditingFile(null);
        }}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <Input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Enter name" />
          </div>
        </div>
      </Modal>
    </>
  );
}