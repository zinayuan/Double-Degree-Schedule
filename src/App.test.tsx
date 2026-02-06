import React from 'react';

const TestApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">测试页面</h1>
      <p className="text-lg text-slate-600">如果你能看到这个页面，说明React正常工作。</p>
      <div className="mt-8 p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">功能测试</h2>
        <ul className="space-y-2">
          <li>✅ React渲染正常</li>
          <li>✅ Tailwind CSS加载正常</li>
          <li>✅ 中文字体显示正常</li>
        </ul>
      </div>
    </div>
  );
};

export default TestApp;
