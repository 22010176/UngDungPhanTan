import { Col, Input, Layout, Modal, Row } from 'antd';
import { useContext } from 'react';
import { useParams } from 'react-router';

import { CreateFolder } from '@/api/directoryApi';
import { UpdateFile } from '@/api/storageApi';
import withAuth from '@/hoc/withAuth';
import withContext from '@/hoc/withContext';

import { Context, initialValues, reducer } from './context';
import FileActions from './FileActions';
import FileDetails from './FileDetails';
import FileList from './FileList';
import FileQuota from './FileQuota';
import ReNameForm from './ReNameForm';
import { UpdateFileList } from './utills';

const { Header, Content, Footer } = Layout;

function Page() {
  const [state, dispatch] = useContext(Context)
  const { "*": path } = useParams()

  const handleSave = async () => {
    const { openForm } = state
    switch (openForm) {
      case "newFolder":
        await CreateFolder(`${path}${state.fileName}`)
        break;
      case "editFile": {
        await UpdateFile(`${path}${state.oldFileName}`, `${path}${state.fileName}`)
        break
      }
    }

    UpdateFileList(dispatch, path)
    dispatch([
      { type: "updateFileForm", payload: "" },
      { type: "updateFileEdit", payload: "" },
      { type: "updateForm" },
    ])
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

      <Modal open={state.openForm} okText="Save"
        onOk={handleSave}
        onCancel={() => dispatch([
          { type: "updateForm" },
          { type: "updateFileForm" },
          { type: "updateFileEdit" },
        ])}>
        <ReNameForm />
      </Modal>
    </>
  );
}

const FileManager = withAuth(withContext(Page, Context, initialValues, reducer));
export default FileManager;