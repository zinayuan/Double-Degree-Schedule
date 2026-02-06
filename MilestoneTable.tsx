
import React from 'react';
import { Milestone, ProgramPhase } from '../types';

interface MilestoneTableProps {
  milestones: Milestone[];
  onUpdateStatus: (id: string, status: Milestone['status']) => void;
}

const MilestoneTable: React.FC<MilestoneTableProps> = ({ milestones, onUpdateStatus }) => {
  // 按阶段分组并排序
  const groupedMilestones = Object.values(ProgramPhase).map(phase => ({
    phase,
    items: milestones
      .filter(m => m.phase === phase)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  })).filter(group => group.items.length > 0);

  const getStatusConfig = (status: Milestone['status']) => {
    switch (status) {
      case 'completed': 
        return { 
          label: '已归档', 
          color: 'text-emerald-600', 
          bg: 'bg-emerald-50', 
          dot: 'bg-emerald-500', 
          border: 'border-emerald-100',
          icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
        };
      case 'urgent': 
        return { 
          label: '申报预警', 
          color: 'text-rose-600', 
          bg: 'bg-rose-50', 
          dot: 'bg-rose-500 animate-pulse', 
          border: 'border-rose-100',
          icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
        };
      default: 
        return { 
          label: '正常推进', 
          color: 'text-slate-600', 
          bg: 'bg-slate-50', 
          dot: 'bg-slate-400', 
          border: 'border-slate-100',
          icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/></svg>
        };
    }
  };

  const getPhaseTheme = (phase: ProgramPhase) => {
    switch (phase) {
      case ProgramPhase.PREPARATION: return 'from-blue-500 to-blue-600';
      case ProgramPhase.NEGOTIATION: return 'from-cyan-500 to-cyan-600';
      case ProgramPhase.APPLICATION: return 'from-amber-500 to-amber-600';
      case ProgramPhase.APPROVAL: return 'from-emerald-500 to-emerald-600';
      case ProgramPhase.RECRUITMENT: return 'from-indigo-500 to-indigo-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  return (
    <div className="space-y-12 pb-20 max-w-5xl mx-auto animate-fadeIn">
      {groupedMilestones.map((group, gIdx) => (
        <div key={group.phase} className="relative group">
          {/* 阶段标题与视觉导轨 */}
          <div className="flex items-center gap-4 mb-8 sticky top-0 bg-slate-50/80 backdrop-blur-md py-4 z-10 px-2">
            <div className={`h-10 px-6 rounded-2xl bg-gradient-to-r ${getPhaseTheme(group.phase)} text-white flex items-center justify-center font-black text-sm shadow-lg shadow-blue-500/10`}>
              {group.phase}
            </div>
            <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
               <div className={`h-full bg-gradient-to-r ${getPhaseTheme(group.phase)} opacity-20 w-full`}></div>
            </div>
            <div className="text-slate-400 font-bold text-xs uppercase tracking-widest tabular-nums">
              {group.items.length} 条事项
            </div>
          </div>

          <div className="space-y-4 pl-6 border-l-2 border-dashed border-slate-200 ml-5">
            {group.items.map((item) => {
              const config = getStatusConfig(item.status);
              return (
                <div 
                  key={item.id} 
                  className={`relative bg-white rounded-[1.5rem] p-5 shadow-sm border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-100 group/item ${item.status === 'urgent' ? 'border-rose-100' : 'border-transparent'}`}
                >
                  {/* 时间节点小圆点 */}
                  <div className={`absolute -left-[31px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-slate-50 shadow-sm transition-transform duration-300 group-hover/item:scale-125 ${config.dot}`}></div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-blue-600 tabular-nums bg-blue-50 px-2 py-0.5 rounded-lg">{item.date}</span>
                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${config.bg} ${config.color} text-[10px] font-black uppercase tracking-wider border ${config.border}`}>
                          {config.icon}
                          {config.label}
                        </div>
                      </div>
                      
                      <h4 className="text-lg font-black text-slate-900 group-hover/item:text-blue-600 transition-colors leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-2xl">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex flex-row md:flex-col items-center md:items-end gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">责任主体</div>
                        <div className="text-sm font-black text-slate-700 whitespace-nowrap">{item.owner}</div>
                      </div>

                      {/* 极简状态控制组 */}
                      <div className="flex bg-slate-100 p-1 rounded-xl">
                        <button 
                          onClick={() => onUpdateStatus(item.id, 'pending')}
                          title="设为正常"
                          className={`p-2 rounded-lg transition-all ${item.status === 'pending' ? 'bg-white shadow-sm text-slate-700' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        </button>
                        <button 
                          onClick={() => onUpdateStatus(item.id, 'urgent')}
                          title="标记紧急"
                          className={`p-2 rounded-lg transition-all ${item.status === 'urgent' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30' : 'text-slate-400 hover:text-rose-500'}`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                        </button>
                        <button 
                          onClick={() => onUpdateStatus(item.id, 'completed')}
                          title="标记完成"
                          className={`p-2 rounded-lg transition-all ${item.status === 'completed' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'text-slate-400 hover:text-emerald-500'}`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MilestoneTable;
