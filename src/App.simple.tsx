import React, { useState } from 'react';
import { Milestone, ProgramPhase, Material } from './types';

const INITIAL_MILESTONES: Milestone[] = [
  {
    id: 'p1-1',
    title: '1. 内部论证与立项',
    date: '2026-01-05',
    phase: ProgramPhase.PREPARATION,
    description: '完成文化产业MBA双学位项目的必要性调研、可行性报告初稿编写及学院预立项审批。',
    status: 'completed',
    owner: '厦门大学 MBA 中心'
  },
];

const INITIAL_MATERIALS: Material[] = [
  { id: 'm1', name: '中外合作办学项目申请表', category: '申报核心', status: 'polishing', requirement: '由中外合作办学监管平台导出，需根据最新政策指引修订办学宗旨及规模描述。' },
];

const App: React.FC = () => {
  const [milestones] = useState<Milestone[]>(INITIAL_MILESTONES);
  const [materials] = useState<Material[]>(INITIAL_MATERIALS);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'list'>('dashboard');

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative bg-slate-50">
      <aside className="w-full md:w-72 bg-slate-900 text-slate-300 p-6 flex flex-col z-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg border border-blue-400/30">X</div>
          <div>
            <h1 className="text-white font-bold leading-none tracking-tight">XMU-MBA</h1>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Center Admin</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full px-4 py-3 rounded-xl text-left text-sm font-bold transition-all flex items-center gap-3 ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <span>📊</span> 战略看板
          </button>
          <button 
            onClick={() => setActiveTab('list')}
            className={`w-full px-4 py-3 rounded-xl text-left text-sm font-bold transition-all flex items-center gap-3 ${activeTab === 'list' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <span>📋</span> 里程碑列表
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <header className="mb-10">
          <h2 className="text-3xl font-black text-slate-900 mb-2">中外合作办学项目日程管理系统</h2>
          <p className="text-slate-500">文化产业MBA双学位项目 - 厦门大学</p>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-sm font-bold text-slate-500 mb-2">已完成里程碑</h3>
                <p className="text-4xl font-black text-slate-900">{milestones.filter(m => m.status === 'completed').length}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-sm font-bold text-slate-500 mb-2">总里程碑数</h3>
                <p className="text-4xl font-black text-slate-900">{milestones.length}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-sm font-bold text-slate-500 mb-2">材料准备中</h3>
                <p className="text-4xl font-black text-slate-900">{materials.length}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'list' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">里程碑列表</h3>
            <div className="space-y-4">
              {milestones.map(milestone => (
                <div key={milestone.id} className="p-4 bg-slate-50 rounded-xl">
                  <h4 className="font-bold text-slate-900">{milestone.title}</h4>
                  <p className="text-sm text-slate-600 mt-1">{milestone.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                    <span>📅 {milestone.date}</span>
                    <span>👤 {milestone.owner}</span>
                    <span className={`px-2 py-1 rounded ${milestone.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {milestone.status === 'completed' ? '已完成' : '进行中'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
