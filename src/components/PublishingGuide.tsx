
import React from 'react';

const PublishingGuide: React.FC = () => {
  const steps = [
    {
      title: "1. 托管代码 (GitHub)",
      desc: "将项目文件夹上传到您的 GitHub 账号（这就像上传到百度网盘，但是专门存代码的地方）。",
      icon: "📁"
    },
    {
      title: "2. 关联 Vercel",
      desc: "打开 Vercel.com，点击 'Add New' -> 'Project'，选中刚才上传的项目。它会自动为您处理剩下的事情。",
      icon: "🚀"
    },
    {
      title: "3. 手机安装",
      desc: "在手机浏览器打开生成的链接，点击‘分享’ -> ‘添加到主屏幕’。大功告成！",
      icon: "📱"
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto pb-20">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-slate-900">发布到手机只需三步</h2>
        <p className="text-slate-500 font-medium text-lg">无需任何代码基础，按照以下图解操作即可</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-all">
            <div className="text-4xl mb-6">{step.icon}</div>
            <h4 className="text-xl font-black text-slate-900 mb-3">{step.title}</h4>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">{step.desc}</p>
            <div className="absolute -bottom-4 -right-4 text-slate-50 text-8xl font-black opacity-10 group-hover:opacity-20 transition-opacity">{i+1}</div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-black">发布后的修改权限</h3>
            <p className="text-slate-400 font-medium leading-relaxed">
              发布完成后，您可以直接在应用内修改状态、新增事项。系统会自动利用<b>浏览器持久化存储</b>记录您的操作。
              <br/><br/>
              如果您需要对系统功能进行底层修改，只需在代码编辑器（或这里）修改并保存，Vercel 会自动更新您的手机 App，无需重新安装。
            </p>
          </div>
          <div className="w-full md:w-64 aspect-square bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center p-6 text-center">
            <div>
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-lg shadow-emerald-500/20">✓</div>
              <div className="text-sm font-black text-slate-300">已启用 PWA 技术<br/>支持离线访问</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishingGuide;
