import { PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Input, Layout, Space, Upload } from 'antd';
import { useContext } from 'react';
import { useParams } from 'react-router';

import { GetFileList, UploadFile } from '@/api/storageApi';
import { Context } from './context';
import { UpdateFileList } from './utills';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

function FileActions() {
  let { "*": path } = useParams();
  const [, dispatch] = useContext(Context)

  const handleNewFolder = () => {
    dispatch({ type: "updateForm", payload: "newFolder" })
  };

  const uploadProps = {
    beforeUpload: async (file) => {
      await UploadFile(file, path);
      await GetFileList(path)
      UpdateFileList(dispatch, path)

      return false;
    },
    showUploadList: false
  };

  // const handleSearch = (value) => {
  // const filtered = files.filter(file =>
  //   file.name.toLowerCase().includes(value.toLowerCase())
  // );
  // setFilteredFiles(filtered);
  // };
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

      {/* <Search placeholder="Search files..." onSearch={handleSearch} onChange={(e) => handleSearch(e.target.value)} style={{ width: 250 }} prefix={<SearchOutlined />} /> */}
    </>
  )
}

export default FileActions