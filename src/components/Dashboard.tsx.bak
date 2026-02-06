
import React, { useState, useMemo } from 'react';
import { Milestone, ProgramPhase, Material } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Sector, RadialBarChart, RadialBar, Legend
} from 'recharts';

interface DashboardProps {
  milestones: Milestone[];
  materials: Material[];
}

const Dashboard: React.FC<DashboardProps> = ({ milestones, materials }) => {
  const [viewMode, setViewMode] = useState<'overview' | 'analytics'>('overview');

  // 计算健康分值 (0-100)
  const healthScore = useMemo(() => {
    const milestoneWeight = 0.6;
    const materialWeight = 0.4;
    
    const completedMilestones = milestones.filter(m => m.status === 'completed').length;
    const milestoneScore = milestones.length ? (completedMilestones / milestones.length) * 100 : 100;
    
    const readyMaterials = materials.filter(m => m.status === 'ready').length;
    const materialScore = materials.length ? (readyMaterials / materials.length) * 100 : 100;
    
    const baseScore = (milestoneScore * milestoneWeight) + (materialScore * materialWeight);
    const urgentPenalty = milestones.filter(m => m.status === 'urgent').length * 5; // 每个紧急任务扣5分
    
    return Math.max(0, Math.min(100, Math.round(baseScore - urgentPenalty)));
  }, [milestones, materials]);

  const stats = useMemo(() => ({
    completed: milestones.filter(m => m.status === 'completed').length,
    pending: milestones.filter(m => m.status === 'pending').length,
    urgent: milestones.filter(m => m.status === 'urgent').length,
    materialReady: materials.filter(m => m.status === 'ready').length,
    materialTotal: materials.length
  }), [milestones, materials]);

  // 图表数据转换
  const phaseData = Object.values(ProgramPhase).map(phase => ({
    name: phase,
    count: milestones.filter(m => m.phase === phase).length
  }));

  const statusData = [
    { name: '已完成', value: stats.completed, color: '#10b981' },
    { name: '推进中', value: stats.pending, color: '#3b82f6' },
    { name: '预警项', value: stats.urgent, color: '#f43f5e' }
  ].filter(d => d.value > 0);

  const materialCategoryData = useMemo(() => {
    const categories = Array.from(new Set(materials.map(m => m.category)));
    return categories.map((cat, index) => {
      const catMaterials = materials.filter(m => m.category === cat);
      const readyCount = catMaterials.filter(m => m.status === 'ready').length;
      const percentage = Math.round((readyCount / catMaterials.length) * 100);
      return {
        name: cat,
        uv: percentage,
        fill: ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'][index % 5]
      };
    });
  }, [materials]);

  const COLORS = ['#3b82f6', '#6366f1', '#a855f7', '#ec4899', '#f43f5e', '#f97316'];

  return (
    <div className="space-y-8 animate-fadeIn pb-10">
      {/* 模式切换控制栏 */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/50 backdrop-blur-sm p-2 rounded-[2rem] border border-slate-200/60 shadow-sm">
        <div className="flex p-1 bg-slate-200/50 rounded-2xl w-full sm:w-auto">
          <button 
            onClick={() => setViewMode('overview')}
            className={`flex-1 sm:flex-none px-8 py-2.5 rounded-xl text-xs font-black transition-all ${viewMode === 'overview' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
          >
            战略概览
          </button>
          <button 
            onClick={() => setViewMode('analytics')}
            className={`flex-1 sm:flex-none px-8 py-2.5 rounded-xl text-xs font-black transition-all ${viewMode === 'analytics' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
          >
            深度效能分析
          </button>
        </div>
        <div className="flex items-center gap-4 px-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">项目健康度评级</span>
          <div className={`px-4 py-1.5 rounded-full font-black text-sm shadow-sm ${healthScore > 80 ? 'bg-emerald-100 text-emerald-700' : healthScore > 50 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
            {healthScore > 80 ? 'EXCELLENT' : healthScore > 50 ? 'STABLE' : 'AT RISK'}
          </div>
        </div>
      </div>

      {viewMode === 'overview' ? (
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

            {/* 各阶段任务波谱图 */}
            <div className="col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-black text-slate-900">办学阶段任务分布</h3>
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span className="w-2 h-2 rounded-full bg-slate-200"></span>
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={phaseData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false} 
                      tick={{fill: '#94a3b8', fontWeight: 700}}
                    />
                    <YAxis allowDecimals={false} fontSize={10} tickLine={false} axisLine={false} tick={{fill: '#94a3b8'}} />
                    <Tooltip 
                      cursor={{fill: '#f8fafc'}}
                      contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '12px'}}
                    />
                    <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={40}>
                      {phaseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 状态占比分析 */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[400px]">
            <h3 className="text-lg font-black text-slate-900 mb-2">任务推进质量占比</h3>
            <p className="text-xs text-slate-400 font-medium mb-8">反映项目团队执行效率的分布情况</p>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'}}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    iconType="circle"
                    formatter={(value) => <span className="text-xs font-bold text-slate-600 ml-2">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 材料分类就绪度 (放射图) */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[400px]">
            <h3 className="text-lg font-black text-slate-900 mb-2">材料类别就绪雷达</h3>
            <p className="text-xs text-slate-400 font-medium mb-8">展示各职能部门材料准备的百分比</p>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart 
                  cx="50%" 
                  cy="50%" 
                  innerRadius="20%" 
                  outerRadius="90%" 
                  barSize={15} 
                  data={materialCategoryData}
                >
                  <RadialBar
                    background
                    dataKey="uv"
                    cornerRadius={10}
                  />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none'}}
                    formatter={(value: any) => [`${value}% 就绪`, '状态']}
                  />
                  <Legend 
                    layout="vertical" 
                    verticalAlign="middle" 
                    align="right"
                    iconType="rect"
                    formatter={(value) => <span className="text-[10px] font-black text-slate-500 uppercase">{value}</span>}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
