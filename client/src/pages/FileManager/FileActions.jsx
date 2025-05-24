import { CalendarOutlined, DatabaseOutlined, DeleteOutlined, DownloadOutlined, EditOutlined, EyeOutlined, FileOutlined, FileTextOutlined, FolderOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Descriptions, Input, Layout, message, Modal, Popconfirm, Progress, Row, Space, Table, Tag, Upload } from 'antd';
import { createStyles } from 'antd-style';
import { useState } from 'react';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

function FileActions() {
  const handleNewFolder = () => {
    // const newFolder = {
    //   key: Date.now().toString(),
    //   name: 'New Folder',
    //   type: 'folder',
    //   size: '-',
    //   modified: new Date().toISOString().split('T')[0]
    // };
    // const newFiles = [...files, newFolder];
    // setFiles(newFiles);
    // setFilteredFiles(newFiles);
    // message.success('New folder created');
  };

  const uploadProps = {
    beforeUpload: (file) => {
      // const newFile = {
      //   key: Date.now().toString(),
      //   name: file.name,
      //   type: 'file',
      //   size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      //   modified: new Date().toISOString().split('T')[0]
      // };
      // const newFiles = [...files, newFile];
      // setFiles(newFiles);
      // setFilteredFiles(newFiles);
      // message.success('File uploaded successfully');
      // return false;
    },
    showUploadList: false
  };

  const handleSearch = (value) => {
    // const filtered = files.filter(file =>
    //   file.name.toLowerCase().includes(value.toLowerCase())
    // );
    // setFilteredFiles(filtered);
  };
  return (
    <>
      <Space>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleNewFolder}>
          New Folder
        </Button>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Upload File</Button>
        </Upload>
      </Space>

      <Search placeholder="Search files..." onSearch={handleSearch} onChange={(e) => handleSearch(e.target.value)} style={{ width: 250 }} prefix={<SearchOutlined />} />
    </>
  )
}

export default FileActions