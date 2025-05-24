import { DatabaseOutlined } from '@ant-design/icons';
import { Progress } from 'antd';

function FileQuota() {
  // Storage information
  const totalStorage = 100; // GB
  const usedStorage = 98.5; // GB
  const storagePercent = (usedStorage / totalStorage) * 100;
  return (
    <div className="bg-white px-5 py-4 flex items-center space-x-5">
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

  )
}

export default FileQuota;