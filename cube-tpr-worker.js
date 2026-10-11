// 四阶求解放后台线程：TPR 第一次要建十几秒的表，放主线程界面会卡死
import { init, solve } from './cube-tpr.js';
let ready = false;
onmessage = e => {
  const { id, fc } = e.data;
  try {
    if (!ready) { init(); ready = true; }
    postMessage({ id, sol: fc ? solve(fc) : '' });
  } catch (err) { postMessage({ id, err: String(err) }); }
};
