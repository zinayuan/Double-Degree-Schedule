
import React, { useState, useEffect } from 'react';
import { Milestone, ProgramPhase, Material } from './types';
import { generateSchedule, getProgramAdvice } from './services/geminiService';
import Dashboard from './components/Dashboard';
import MilestoneTable from './components/MilestoneTable';
import MaterialsChecklist from './components/MaterialsChecklist';
import DataManagement from './components/DataManagement';
import PublishingGuide from './components/PublishingGuide';

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
  {
    id: 'p1-2',
    title: '2. 向学校主管部门初步沟通',
    date: '2026-01-15',
    phase: ProgramPhase.PREPARATION,
    description: '与厦门大学研究生院、国际处沟通政策合规性，明确申报指标与流程要求。',
    status: 'completed',
    owner: '厦门大学 MBA 中心'
  },
  {
    id: 'p1-3',
    title: '3. 寻找并确定外方合作伙伴',
    date: '2026-01-25',
    phase: ProgramPhase.NEGOTIATION,
    description: '对接海外高水平大学（如AACSB认证院校），确认双学位课程模块匹配度及师资投入。',
    status: 'completed',
    owner: '厦门大学 MBA 中心'
  },
  {
    id: 'p1-4',
    title: '4. 谈判与签署合作意向书/协议',
    date: '2026-01-31',
    phase: ProgramPhase.NEGOTIATION,
    description: '【进度警告】原定于1月底完成协议签署，目前因外方法律条款修订暂未回传。需立即推进催促，避免影响后续校内审批。',
    status: 'urgent',
    owner: '厦门大学 MBA 中心'
  },
  {
    id: 'p2-1',
    title: '1. 准备详尽的申报材料',
    date: '2026-02-04',
    phase: ProgramPhase.APPLICATION,
    description: '整理中外双方申报书、培养方案、师资对照表及办学成本核算。',
    status: 'pending',
    owner: '厦门大学 MBA 中心'
  },
  {
    id: 'p2-2',
    title: '2. 提交学院内部审议',
    date: '2026-02-08',
    phase: ProgramPhase.APPLICATION,
    description: '组织管理学院学术委员会评审，通过党政联席会议形成正式推荐意见。',
    status: 'pending',
    owner: '厦门大学 MBA 中心'
  },
  {
    id: 'p2-3',
    title: '3. 提交学校主管部门',
    date: '2026-02-15',
    phase: ProgramPhase.APPLICATION,
    description: '将经学院盖章的全套申报材料提交至校国际处审核。',
    status: 'pending',
    owner: '厦门大学 MBA 中心'
  },
  {
    id: 'p2-4',
    title: '4. 学校层面多部门联合评审',
    date: '2026-02-25',
    phase: ProgramPhase.APPLICATION,
    description: '配合校研院、财务处、国资处、法务室进行合规性联审。',
    status: 'pending',
    owner: '厦门大学 MBA 中心'
  },
  {
    id: 'p2-5',
    title: '5. 报请学校决策机构批准',
    date: '2026-03-05',
    phase: ProgramPhase.APPLICATION,
    description: '列入校长办公会议题，获取最终办学批文并加盖学校公章。',
    status: 'pending',
    owner: '厦门大学 MBA 中心'
  },
  {
    id: 'p3-1',
    title: '1. 提交至福建省级教育厅',
    date: '2026-03-15',
    phase: ProgramPhase.APPROVAL,
    description: '完成省厅系统录入，通过学校行文正式上报福建省教育厅。',
    status: 'pending',
    owner: '厦门大学 MBA 中心'
  },
  {
    id: 'p3-2',
    title: '2. 福建省教育厅审核',
    date: '2026-03-30',
    phase: ProgramPhase.APPROVAL,
    description: '跟踪省厅初审反馈，针对专家意见进行实时材料增补。',
    status: 'pending',
    owner: '厦门大学 MBA 中心'
  },
  {
    id: 'p3-3',
    title: '3. 教育部专家评议与审批',
    date: '2026-04-15',
    phase: ProgramPhase.APPROVAL,
    description: '迎接教育部中外合作办学监管平台专家网评，必要时准备远程答辩。',
    status: 'pending',
    owner: '厦门大学 MBA 中心'
  },
  {
    id: 'p3-4',
    title: '4. 结果公示与批准',
    date: '2026-04-25',
    phase: ProgramPhase.APPROVAL,
    description: '获批中外合作办学许可证，确认项目批准书编号。',
    status: 'pending',
    owner: '厦门大学 MBA 中心'
  },
  {
    id: 'p4-1',
    title: '1. 备案与招生申报',
    date: '2026-04-30',
    phase: ProgramPhase.RECRUITMENT,
    description: '完成学信网学籍电子注册备案，更新研究生招生信息目录。',
    status: 'pending',
    owner: '厦门大学 MBA 中心'
  },
  {
    id: 'p4-2',
    title: '2. 福建省物价局学费审批',
    date: '2026-05-20',
    phase: ProgramPhase.RECRUITMENT,
    description: '根据办学成本提交收费申请，获取省物价局正式批复文件。',
    status: 'pending',
    owner: '厦门大学 MBA 中心'
  },
  {
    id: 'p4-3',
    title: '3. 全面启动招生宣传',
    date: '2026-06-01',
    phase: ProgramPhase.RECRUITMENT,
    description: '发布中外双学位专项招生简章，启动针对文化产业从业者的宣传推介会。',
    status: 'pending',
    owner: '厦门大学 MBA 中心'
  }
];

const INITIAL_MATERIALS: Material[] = [
  { id: 'm1', name: '中外合作办学项目申请表', category: '申报核心', status: 'polishing', requirement: '由中外合作办学监管平台导出，需根据最新政策指引修订办学宗旨及规模描述。' },
  { id: 'm2', name: '合作办学协议(中英文)', category: '申报核心', status: 'polishing', requirement: '需包含学费比例、证书发放、退出机制等核心条款。' },
  { id: 'm3', name: '外方办学许可证及资质', category: '法务证明', status: 'polishing', requirement: '外方大学在所属国受政府认可的证明，须经领事认证。' },
  { id: 'm4', name: '外方教学质量评估报告', category: '质量保障', status: 'polishing', requirement: '由外方所在国专业评估机构出具，需近三年数据。' },
  { id: 'm5', name: '中外师资名册及意向书', category: '教学资源', status: 'polishing', requirement: '需附教授简历及外方院长签字的授课承诺函。' },
  { id: 'm6', name: 'MBA人才培养方案', category: '教学资源', status: 'polishing', requirement: '核心课程中外比例必须符合教育部规定(中方核心课>1/3)。' },
  { id: 'm7', name: '项目可行性论证报告', category: '战略规划', status: 'polishing', requirement: '重点论证文化产业MBA的市场独特性及公益性。' },
  { id: 'm8', name: '办学资产及审计报告', category: '财务风控', status: 'polishing', requirement: '中方大学的年度财务审计结论及校舍投入证明。' },
  { id: 'm9', name: '学分互认协议表', category: '教学资源', status: 'polishing', requirement: '详细列出两校课程对等分值转换规则。' },
  { id: 'm10', name: '外方授权委托书', category: '法务证明', status: 'polishing', requirement: '授权厦大MBA中心处理申报全过程的法律文件。' }
];

const App: React.FC = () => {
  // 从本地存储初始化数据
  const [milestones, setMilestones] = useState<Milestone[]>(() => {
    try {
      const saved = localStorage.getItem('xmu_mba_milestones');
      return saved ? JSON.parse(saved) : INITIAL_MILESTONES;
    } catch (error) {
      console.error('Failed to load milestones from localStorage:', error);
      return INITIAL_MILESTONES;
    }
  });
  
  const [materials, setMaterials] = useState<Material[]>(() => {
    try {
      const saved = localStorage.getItem('xmu_mba_materials');
      return saved ? JSON.parse(saved) : INITIAL_MATERIALS;
    } catch (error) {
      console.error('Failed to load materials from localStorage:', error);
      return INITIAL_MATERIALS;
    }
  });

  const [activeTab, setActiveTab] = useState<'dashboard' | 'list' | 'materials' | 'publish' | 'sync'>('dashboard');
  const [isGenerating, setIsGenerating] = useState(false);
  const [programDesc, setProgramDesc] = useState('');
  const [advice, setAdvice] = useState<string | null>(null);
  const [isAdviceLoading, setIsAdviceLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Milestone>>({
    title: '', date: '', phase: ProgramPhase.PREPARATION, description: '', status: 'pending', owner: '厦门大学 MBA 中心'
  });

  // 每次数据变动都保存到本地存储
  useEffect(() => {
    try {
      localStorage.setItem('xmu_mba_milestones', JSON.stringify(milestones));
      localStorage.setItem('xmu_mba_materials', JSON.stringify(materials));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }, [milestones, materials]);

  const handleGenerate = async () => {
    if (!programDesc.trim()) return;
    setIsGenerating(true);
    try {
      const newMilestones = await generateSchedule(programDesc);
      if (newMilestones.length > 0) {
        const itemsWithDefaultOwner = newMilestones.map(m => ({ ...m, owner: '厦门大学 MBA 中心' }));
        setMilestones([...milestones, ...itemsWithDefaultOwner]);
        setProgramDesc('');
      }
    } catch (error) { console.error(error); } finally { setIsGenerating(false); }
  };

  const handleGetAdvice = async () => {
    setIsAdviceLoading(true);
    try {
      const result = await getProgramAdvice(milestones);
      setAdvice(result);
    } catch (error) { console.error(error); } finally { setIsAdviceLoading(false); }
  };

  const handleAddMilestone = () => {
    if (!formData.title || !formData.date) return;
    const newItem: Milestone = {
      id: Date.now().toString(),
      title: formData.title || '',
      date: formData.date || '',
      phase: formData.phase as ProgramPhase || ProgramPhase.PREPARATION,
      description: formData.description || '',
      status: formData.status as Milestone['status'] || 'pending',
      owner: formData.owner || '厦门大学 MBA 中心'
    };
    setMilestones([...milestones, newItem]);
    setIsModalOpen(false);
  };

  const updateMilestoneStatus = (id: string, status: Milestone['status']) => {
    setMilestones(prev => prev.map(m => m.id === id ? { ...m, status } : m));
  };

  const updateMaterialStatus = (id: string, status: Material['status']) => {
    setMaterials(prev => prev.map(m => m.id === id ? { ...m, status } : m));
  };

  const handleImportData = (data: { milestones: Milestone[], materials: Material[] }) => {
    setMilestones(data.milestones);
    setMaterials(data.materials);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      <aside className="w-full md:w-72 bg-slate-900 text-slate-300 p-6 flex flex-col z-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg border border-blue-400/30">X</div>
          <div>
            <h1 className="text-white font-bold leading-none tracking-tight">XMU-MBA</h1>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Center Admin</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-4">项目看板</p>
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/20' : 'hover:bg-slate-800 hover:text-white'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
            <span className="font-medium text-sm">数字化看板</span>
          </button>
          <button onClick={() => setActiveTab('list')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'list' ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/20' : 'hover:bg-slate-800 hover:text-white'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            <span className="font-medium text-sm">颗粒化进程表</span>
          </button>
          <button onClick={() => setActiveTab('materials')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'materials' ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/20' : 'hover:bg-slate-800 hover:text-white'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            <span className="font-medium text-sm">必备材料清单</span>
          </button>
          
          <div className="pt-6">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-4">系统设置</p>
            <button onClick={() => setActiveTab('sync')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'sync' ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/20' : 'hover:bg-slate-800 hover:text-white'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
              <span className="font-medium text-sm">数据备份/同步</span>
            </button>
            <button onClick={() => setActiveTab('publish')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'publish' ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/20' : 'hover:bg-slate-800 hover:text-white'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
              <span className="font-medium text-sm">发布到手机引导</span>
            </button>
          </div>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
            <h4 className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>AI 智能任务细化</h4>
            <textarea value={programDesc} onChange={(e) => setProgramDesc(e.target.value)} placeholder="例如：细化财务处报审的具体环节..." className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-[11px] focus:ring-1 focus:ring-blue-500 outline-none mb-2 placeholder-slate-700 transition-all" rows={3}/>
            <button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-slate-100 hover:bg-white text-slate-900 text-xs py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50">
              {isGenerating ? <span className="w-3 h-3 border-2 border-slate-400 border-t-slate-900 rounded-full animate-spin"></span> : 'AI 辅助补充'}
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-10 overflow-y-auto bg-slate-50 relative">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-tighter">Official Project</span>
              <span className="text-slate-400 text-xs font-medium">/ 厦门大学管理学院</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">文化产业 MBA 双学位申报</h2>
          </div>
          <div className="flex gap-3">
            <button onClick={handleGetAdvice} disabled={isAdviceLoading} className="px-6 py-3 bg-white border-2 border-slate-100 rounded-2xl text-sm font-bold hover:bg-slate-50 hover:border-slate-200 transition-all flex items-center gap-2 shadow-sm">
               {isAdviceLoading ? '专家研判中...' : '💡 申报专家研判'}
            </button>
            <button onClick={() => setIsModalOpen(true)} className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 shadow-2xl transition-all flex items-center gap-2 active:scale-95">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>手动录入
            </button>
          </div>
        </header>

        {advice && (
          <div className="mb-10 p-7 bg-indigo-900 rounded-[2rem] shadow-3xl text-white relative overflow-hidden animate-fadeIn border border-white/10">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none"><svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg></div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-2xl font-black flex items-center gap-4"><span className="flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl text-xl">🤖</span>AI 战略风险预警</h3>
                <button onClick={() => setAdvice(null)} className="text-white/40 hover:text-white p-2 transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg></button>
              </div>
              <div className="text-indigo-50 leading-relaxed whitespace-pre-wrap font-medium text-lg">{advice}</div>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && <Dashboard milestones={milestones} materials={materials} />}
        {activeTab === 'list' && <MilestoneTable milestones={milestones} onUpdateStatus={updateMilestoneStatus} />}
        {activeTab === 'materials' && <MaterialsChecklist materials={materials} onUpdateStatus={updateMaterialStatus} />}
        {activeTab === 'publish' && <PublishingGuide />}
        {activeTab === 'sync' && <DataManagement milestones={milestones} materials={materials} onImport={handleImportData} />}
      </main>

      {/* Manual Item Modal (remains same as before) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-xl transition-opacity" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white rounded-[2.5rem] shadow-4xl w-full max-w-2xl z-10 overflow-hidden animate-fadeIn transform transition-all border border-slate-100">
            <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 className="text-2xl font-black text-slate-900">手动新增申报事项</h3>
                <p className="text-sm text-slate-500 font-medium">由“厦门大学 MBA 中心”统筹录入</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="bg-white p-3 rounded-2xl shadow-sm text-slate-400 hover:text-slate-900 transition-all hover:rotate-90">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="p-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">事项名称</label>
                  <input type="text" placeholder="如：专家现场考察接待" className="w-full bg-slate-100/50 border-2 border-transparent rounded-2xl px-5 py-4 text-sm font-bold focus:bg-white focus:border-blue-500 outline-none transition-all shadow-inner" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}/>
                </div>
                <div className="space-y-2.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">计划日期</label>
                  <input type="date" className="w-full bg-slate-100/
50 border-2 border-transparent rounded-2xl px-5 py-4 text-sm font-bold focus:bg-white focus:border-blue-500 outline-none transition-all shadow-inner" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})}/>
                </div>
              </div>
              <div className="space-y-2.5">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">所属阶段</label>
                <select className="w-full bg-slate-100/50 border-2 border-transparent rounded-2xl px-5 py-4 text-sm font-bold focus:bg-white focus:border-blue-500 outline-none transition-all shadow-inner" value={formData.phase} onChange={(e) => setFormData({...formData, phase: e.target.value as ProgramPhase})}>
                  <option value={ProgramPhase.PREPARATION}>前期筹备</option>
                  <option value={ProgramPhase.NEGOTIATION}>磋商洽谈</option>
                  <option value={ProgramPhase.APPLICATION}>申报审核</option>
                  <option value={ProgramPhase.APPROVAL}>获批授牌</option>
                  <option value={ProgramPhase.RECRUITMENT}>招生录取</option>
                  <option value={ProgramPhase.OPERATION}>运行教学</option>
                </select>
              </div>
              <div className="space-y-2.5">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">详细说明</label>
                <textarea placeholder="描述该事项的关键目标、交付物或注意事项..." className="w-full bg-slate-100/50 border-2 border-transparent rounded-2xl px-5 py-4 text-sm font-bold focus:bg-white focus:border-blue-500 outline-none transition-all shadow-inner resize-none" rows={4} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}/>
              </div>
              <div className="space-y-2.5">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">责任人</label>
                <input type="text" placeholder="如：厦门大学 MBA 中心" className="w-full bg-slate-100/50 border-2 border-transparent rounded-2xl px-5 py-4 text-sm font-bold focus:bg-white focus:border-blue-500 outline-none transition-all shadow-inner" value={formData.owner} onChange={(e) => setFormData({...formData, owner: e.target.value})}/>
              </div>
              <button onClick={handleAddMilestone} className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-base hover:from-blue-700 hover:to-indigo-700 transition-all shadow-2xl active:scale-95">
                ✅ 确认添加
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
