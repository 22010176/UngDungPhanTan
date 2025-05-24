import { Col, Input, Layout, Modal, Row } from 'antd';
import { useContext } from 'react';

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

  const handleSave = () => {

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
        onCancel={() => { }}>
        <ReNameForm />
      </Modal>
    </>
  );
}

const FileManager = withAuth(withContext(Page, Context, initialValues, reducer));
export default FileManager;