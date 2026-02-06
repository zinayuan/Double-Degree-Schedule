import React, { useMemo } from 'react';
import { Milestone, ProgramPhase, Material } from '../types';

interface DashboardProps {
  milestones: Milestone[];
  materials: Material[];
}

const Dashboard: React.FC<DashboardProps> = ({ milestones, materials }) => {
  // 计算健康分值 (0-100)
  const healthScore = useMemo(() => {
    const milestoneWeight = 0.6;
    const materialWeight = 0.4;
    
    const completedMilestones = milestones.filter(m => m.status === 'completed').length;
    const milestoneScore = milestones.length ? (completedMilestones / milestones.length) * 100 : 100;
    
    const readyMaterials = materials.filter(m => m.status === 'ready').length;
    const materialScore = materials.length ? (readyMaterials / materials.length) * 100 : 100;
    
    const baseScore = (milestoneScore * milestoneWeight) + (materialScore * materialWeight);
    const urgentPenalty = milestones.filter(m => m.status === 'urgent').length * 5;
    
    return Math.max(0, Math.min(100, Math.round(baseScore - urgentPenalty)));
  }, [milestones, materials]);

  const stats = useMemo(() => ({
    completed: milestones.filter(m => m.status === 'completed').length,
    pending: milestones.filter(m => m.status === 'pending').length,
    urgent: milestones.filter(m => m.status === 'urgent').length,
    materialReady: materials.filter(m => m.status === 'ready').length,
    materialTotal: materials.length
  }), [milestones, materials]);

  const phaseData = Object.values(ProgramPhase).map(phase => ({
    name: phase,
    count: milestones.filter(m => m.phase === phase).length
  }));

  return (
    <div className="space-y-8 animate-fadeIn pb-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* 健康评分大卡片 */}
        <div className="md:col-span-4 bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/20 blur-[80px] rounded-full"></div>
          <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">AI 实时评分</h3>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative mb-6">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-800" />
                <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" 
                  strokeDasharray={502.4} strokeDashoffset={502.4 - (502.4 * healthScore) / 100}
                  className="text-blue-500 transition-all duration-1000 ease-out" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl font-black">{healthScore}</span>
                <span className="text-xs text-slate-500 font-bold uppercase mt-1">Score</span>
              </div>
            </div>
            <p className="text-slate-400 text-center text-sm font-medium px-4">
              当前项目推进稳健，{stats.urgent > 0 ? `但存在 ${stats.urgent} 项紧急任务需要立即处理。` : '核心材料就绪率符合预期。'}
            </p>
          </div>
        </div>

        {/* 快速指标卡片 */}
        <div className="md:col-span-8 grid grid-cols-2 gap-4">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between group hover:border-blue-200 transition-all">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">已合规归档里程碑</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-slate-900">{stats.completed}</span>
                <span className="text-slate-400 font-bold text-sm">/ {milestones.length}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between group hover:border-rose-200 transition-all">
            <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">待响应紧急事项</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-rose-600">{stats.urgent}</span>
                <span className="text-rose-300 font-bold text-sm">Urgent</span>
              </div>
            </div>
          </div>

          {/* 各阶段任务分布 */}
          <div className="col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-6">办学阶段任务分布</h3>
            <div className="space-y-4">
              {phaseData.map((phase, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-32 text-xs font-bold text-slate-600 truncate">{phase.name}</div>
                  <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${(phase.count / milestones.length) * 100}%` }}
                    />
                  </div>
                  <div className="w-12 text-right text-sm font-black text-slate-900">{phase.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
