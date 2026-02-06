
import { GoogleGenAI, Type } from "@google/genai";
import { Milestone } from "../types";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "" });

export const generateSchedule = async (programDescription: string): Promise<Milestone[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `基于以下合作办学项目背景，生成一个详细的项目推进日程表。返回一个JSON数组，包含里程碑事件。
    项目背景: ${programDescription}
    
    JSON结构要求:
    - id: 字符串
    - title: 任务/里程碑名称
    - date: YYYY-MM-DD 格式
    - phase: 必须是 ["前期筹备", "磋商洽谈", "申报审核", "获批授牌", "招生录取", "运行教学"] 之一
    - description: 简短描述
    - status: "pending"
    - owner: 建议负责人 (如: 国际办, 教务处, 外方负责人)`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            date: { type: Type.STRING },
            phase: { type: Type.STRING },
            description: { type: Type.STRING },
            status: { type: Type.STRING },
            owner: { type: Type.STRING }
          },
          required: ["id", "title", "date", "phase", "description", "status", "owner"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return [];
  }
};

export const getProgramAdvice = async (milestones: Milestone[]): Promise<string> => {
  const content = JSON.stringify(milestones);
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `作为资深合作办学专家，请分析以下日程安排，给出3条专业建议：\n${content}`,
    config: {
      systemInstruction: "你是一个专门从事中外合作办学（Cooperative Education）的咨询专家。你的回答应该专业、客观且具有实操性。"
    }
  });
  return response.text || "暂无建议。";
};
