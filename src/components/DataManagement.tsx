
import React, { useRef } from 'react';
import { Milestone, Material } from '../types';

interface DataManagementProps {
  milestones: Milestone[];
  materials: Material[];
  onImport: (data: { milestones: Milestone[], materials: Material[] }) => void;
}

const DataManagement: React.FC<DataManagementProps> = ({ milestones, materials, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = JSON.stringify({ milestones, materials }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `办学日程备份_${new Date().toLocaleDateString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.milestones && json.materials) {
          onImport(json);
          alert('数据导入成功！您的日程已更新。');
        }
      } catch (err) {
        alert('导入失败，请检查文件格式。');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-900">数据同步中心</h3>
          <p className="text-sm text-slate-400 font-medium">在不同设备间迁移您的办学日程数据</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button 
          onClick={handleExport}
          className="flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-100 rounded-3xl transition-all group"
        >
          <div className="text-left">
            <div className="font-black text-slate-800">备份当前数据</div>
            <div className="text-xs text-slate-500 mt-1">下载 JSON 备份文件</div>
          </div>
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          </div>
        </button>

        <button 
          onClick={handleImportClick}
          className="flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-100 rounded-3xl transition-all group"
        >
          <div className="text-left">
            <div className="font-black text-slate-800">导入备份文件</div>
            <div className="text-xs text-slate-500 mt-1">从其他设备同步进度</div>
          </div>
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
          </div>
        </button>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept=".json"
      />

      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
        <span className="text-xl">💡</span>
        <p className="text-xs text-amber-700 font-medium leading-relaxed">
          <b>温馨提示：</b> 发布后，您的修改会保存在当前手机的浏览器中。如果您更换了手机或清除了缓存，建议先在旧设备上点击“备份”，再到新设备上“导入”。
        </p>
      </div>
    </div>
  );
};

export default DataManagement;
