import { DatabaseOutlined } from '@ant-design/icons';
import { Progress } from 'antd';
import { useEffect, useState } from 'react';

import { GetQuota } from '@/api/storageApi';
import { FormatFileSize } from '@/utils/fileUtils';

function FileQuota() {
  const [info, setInfo] = useState({ current: 0, totalSize: 100 })

  useEffect(function () {
    GetQuota().then(a => setInfo(a));
  }, [])

  const storagePercent = (info.current / info.totalSize) * 100;
  return (
    <div className="bg-white px-5 py-4 flex items-center space-x-5">
      <DatabaseOutlined className="text-blue-500 text-lg" />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">Storage Usage</span>
          <span className="text-sm font-medium">{FormatFileSize(info.current)}  / {FormatFileSize(info.totalSize)}</span>
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