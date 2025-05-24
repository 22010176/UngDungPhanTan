import { Col, Input, Layout, message, Modal, Row } from 'antd';
import { useContext, useState } from 'react';

import withAuth from '@/hoc/withAuth';
import withContext from '@/hoc/withContext';
import { Context, initialValues, reducer } from './context';
import FileActions from './FileActions';
import FileDetails from './FileDetails';
import FileList from './FileList';
import FileQuota from './FileQuota';
import ReNameForm from './ReNameForm';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

function Page() {
  const [state, dispatch] = useContext(Context)
  console.log(state)
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

  return (
    <>
      <Content className="p-2 overflow-hidden flex flex-col">
        <Row className="p-4 flex items-center justify-between">
          <FileActions />
        </Row>

        <Row className="grow">
          <Col span={state.selectedFile ? 16 : 24}><FileList /></Col>
          {state.selectedFile && <Col span={8} className="h-full"><FileDetails /></Col>}
        </Row>
      </Content>

      <FileQuota />

      <Modal open={false} okText="Save"
        onOk={handleSave}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingFile(null);
        }}>
        <ReNameForm />
      </Modal>
    </>
  );
}

const FileManager = withAuth(withContext(Page, Context, initialValues, reducer));
export default FileManager;