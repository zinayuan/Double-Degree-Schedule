
import React, { useState, useMemo } from 'react';
import { Material } from '../types';

interface MaterialsChecklistProps {
  materials: Material[];
  onUpdateStatus: (id: string, status: Material['status']) => void;
}

const MaterialsChecklist: React.FC<MaterialsChecklistProps> = ({ materials, onUpdateStatus }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // 统计数据
  const stats = useMemo(() => {
    const total = materials.length;
    const ready = materials.filter(m => m.status === 'ready').length;
    const polishing = materials.filter(m => m.status === 'polishing').length;
    const missing = materials.filter(m => m.status === 'missing').length;
    const progress = Math.round((ready / total) * 100);
    return { total, ready, polishing, missing, progress };
  }, [materials]);

  // 按分类分组
  const filteredAndGrouped = useMemo(() => {
    const filtered = materials.filter(m => 
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return filtered.reduce((acc, material) => {
      if (!acc[material.category]) acc[material.category] = [];
      acc[material.category].push(material);
      return acc;
    }, {} as Record<string, Material[]>);
  }, [materials, searchTerm]);

  const getStatusStyle = (status: Material['status']) => {
    switch (status) {
      case 'ready': return { label: '已就绪', class: 'bg-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' };
      case 'polishing': return { label: '优化中', class: 'bg-purple-500', bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' };
      default: return { label: '缺失', class: 'bg-rose-500', bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700' };
    }
  };

  const getCategoryIcon = (category: string) => {
    if (category.includes('核心')) return '📄';
    if (category.includes('法务')) return '⚖️';
    if (category.includes('教学')) return '🎓';
    if (category.includes('财务')) return '💰';
    return '📁';
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto pb-20">
      {/* 顶部统计面板 */}
      <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-slate-100 flex flex-col md:flex-row items-center gap-10">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
            <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
              strokeDasharray={364.4} strokeDashoffset={364.4 - (364.4 * stats.progress) / 100}
              className="text-blue-600 transition-all duration-1000 ease-out" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-slate-900">{stats.progress}%</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">就绪度</span>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          <div className="p-4 bg-slate-50 rounded-2xl">
            <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">总所需材料</div>
            <div className="text-2xl font-black text-slate-900">{stats.total}</div>
          </div>
          <div className="p-4 bg-emerald-50 rounded-2xl">
            <div className="text-[10px] font-bold text-emerald-600 uppercase mb-1">已就绪</div>
            <div className="text-2xl font-black text-emerald-700">{stats.ready}</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-2xl">
            <div className="text-[10px] font-bold text-purple-600 uppercase mb-1">优化中</div>
            <div className="text-2xl font-black text-purple-700">{stats.polishing}</div>
          </div>
          <div className="p-4 bg-rose-50 rounded-2xl">
            <div className="text-[10px] font-bold text-rose-600 uppercase mb-1">待办/缺失</div>
            <div className="text-2xl font-black text-rose-700">{stats.missing}</div>
          </div>
        </div>
      </div>

      {/* 搜索过滤 */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>
        <input 
          type="text"
          placeholder="搜索材料名称、分类或关键字..."
          className="w-full bg-white border-2 border-slate-100 rounded-[1.5rem] pl-14 pr-6 py-4 text-sm font-bold focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 分类展示列表 */}
      <div className="space-y-10">
        {Object.entries(filteredAndGrouped).map(([category, items]) => (
          <div key={category} className="space-y-4">
            <div className="flex items-center gap-3 px-2">
              <span className="text-2xl">{getCategoryIcon(category)}</span>
              <h3 className="text-lg font-black text-slate-800 tracking-tight">{category}</h3>
              <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">{items.length}</span>
              <div className="flex-1 h-px bg-slate-100 ml-2"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {items.map((m) => {
                const style = getStatusStyle(m.status);
                return (
                  <div key={m.id} className={`group bg-white p-6 rounded-[2rem] border-2 transition-all duration-300 ${style.border} hover:shadow-xl hover:shadow-slate-200/50`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white ${style.class}`}>
                        {style.label}
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="p-2 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-lg transition-colors" title="查看范本">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                         </button>
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-black text-slate-900 mb-2 leading-tight">{m.name}</h4>
                    <p className="text-sm text-slate-500 mb-6 leading-relaxed font-medium">
                      {m.requirement}
                    </p>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <button 
                        onClick={() => onUpdateStatus(m.id, 'ready')}
                        className={`py-3 rounded-2xl text-[10px] font-black transition-all ${m.status === 'ready' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30' : 'bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600'}`}
                      >
                        标记就绪
                      </button>
                      <button 
                        onClick={() => onUpdateStatus(m.id, 'polishing')}
                        className={`py-3 rounded-2xl text-[10px] font-black transition-all ${m.status === 'polishing' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' : 'bg-slate-50 text-slate-400 hover:bg-purple-50 hover:text-purple-600'}`}
                      >
                        需要修改
                      </button>
                      <button 
                        onClick={() => onUpdateStatus(m.id, 'missing')}
                        className={`py-3 rounded-2xl text-[10px] font-black transition-all ${m.status === 'missing' ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/30' : 'bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-600'}`}
                      >
                        标记缺失
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {Object.keys(filteredAndGrouped).length === 0 && (
          <div className="py-20 text-center bg-white rounded-[3rem] border-4 border-dashed border-slate-100">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-black text-slate-400">未找到相关材料</h3>
            <p className="text-slate-300 font-medium">请尝试更换搜索关键字</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialsChecklist;
