/* ============================================================
 * battle.js — 回合制战斗
 * ============================================================ */

const Battle = (function () {
  let root, els, B = null;
  let tapResolve = null, typing = null;

  /* ---------------- DOM 构建 ---------------- */
  function build() {
    root = document.getElementById('battle');
    root.innerHTML = `
      <div class="bfield" id="bfield">
        <div class="bslot foe">
          <div class="binfo" id="foeInfo">
            <div class="bname"><span class="nm"></span><span class="lv"></span></div>
            <div class="hpwrap"><div class="hpbar"><i></i></div></div>
            <div class="stbadge"></div>
          </div>
          <div class="bsprite-wrap"><canvas class="bsprite" id="foeSprite" width="120" height="120"></canvas>
            <div class="bplat"></div></div>
        </div>
        <div class="bslot mine">
          <div class="bsprite-wrap"><canvas class="bsprite" id="mySprite" width="120" height="120"></canvas>
            <div class="bplat"></div></div>
          <div class="binfo" id="myInfo">
            <div class="bname"><span class="nm"></span><span class="lv"></span></div>
            <div class="hpwrap"><div class="hpbar"><i></i></div></div>
            <div class="hpnum"></div>
            <div class="expbar"><i></i></div>
            <div class="stbadge"></div>
          </div>
        </div>
        <div class="ballfly" id="ballFly"></div>
        <div class="fx" id="bfx"></div>
      </div>
      <div class="bbottom">
        <div class="msgbox" id="bmsg"></div>
        <div class="bmenu" id="bmenu"></div>
      </div>`;
    els = {
      field: root.querySelector('#bfield'),
      foeInfo: root.querySelector('#foeInfo'), myInfo: root.querySelector('#myInfo'),
      foeSprite: root.querySelector('#foeSprite'), mySprite: root.querySelector('#mySprite'),
      msg: root.querySelector('#bmsg'), menu: root.querySelector('#bmenu'),
      ball: root.querySelector('#ballFly'), fx: root.querySelector('#bfx'),
    };
    els.msg.addEventListener('click', () => { if (tapResolve) { const r = tapResolve; tapResolve = null; r(); } });
    root.addEventListener('click', (e) => {
      if (e.target.closest('.bmenu')) return;
      if (tapResolve) { const r = tapResolve; tapResolve = null; r(); }
    });
  }

  /* ---------------- 基础工具 ---------------- */
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  function waitTap(timeout) {
    return new Promise((res) => {
      let done = false;
      tapResolve = () => { if (done) return; done = true; clearTimeout(t); res(); };
      const t = setTimeout(() => { if (done) return; done = true; tapResolve = null; res(); }, timeout);
    });
  }
  // 打字机文本
  async function say(text, hold) {
    els.msg.textContent = '';
    let skipped = false;
    const skip = () => { skipped = true; };
    tapResolve = skip;
    for (let i = 0; i < text.length; i++) {
      els.msg.textContent = text.slice(0, i + 1);
      if (skipped) { els.msg.textContent = text; break; }
      await wait(16);
    }
    tapResolve = null;
    await waitTap(hold === undefined ? 780 : hold);
  }
  function menu(items) {
    // items: [{label, sub, cls, disabled, value}]
    return new Promise((res) => {
      els.menu.innerHTML = '';
      items.forEach((it) => {
        const b = document.createElement('button');
        b.className = 'bbtn ' + (it.cls || '');
        b.innerHTML = it.label + (it.sub ? `<small>${it.sub}</small>` : '');
        if (it.disabled) b.disabled = true;
        b.onclick = () => { Sound.play('select'); els.menu.innerHTML = ''; res(it.value); };
        els.menu.appendChild(b);
      });
    });
  }
  function clearMenu() { els.menu.innerHTML = ''; }

  /* ---------------- 显示更新 ---------------- */
  const STATUS_NAME = { par: '麻', psn: '毒', brn: '烧', slp: '睡' };
  function drawSprite(canvas, mon, flip) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const c = SPR.monCanvas('m' + mon.sid, SPECIES[mon.sid].art, 3);
    ctx.save();
    if (flip) { ctx.translate(canvas.width, 0); ctx.scale(-1, 1); }
    ctx.drawImage(c, 0, 0);
    ctx.restore();
  }
  function refreshInfo(side) {
    const mon = side === 'foe' ? B.foeMon : B.myMon;
    const box = side === 'foe' ? els.foeInfo : els.myInfo;
    box.querySelector('.nm').textContent = monName(mon);
    box.querySelector('.lv').textContent = 'Lv' + mon.lv;
    const ratio = clamp(mon.hp / maxHP(mon), 0, 1);
    const bar = box.querySelector('.hpbar i');
    bar.style.width = (ratio * 100).toFixed(1) + '%';
    bar.className = ratio > 0.5 ? 'ok' : ratio > 0.2 ? 'warn' : 'bad';
    const st = box.querySelector('.stbadge');
    st.textContent = mon.status ? STATUS_NAME[mon.status] : '';
    st.className = 'stbadge' + (mon.status ? ' s-' + mon.status : '');
    if (side === 'me') {
      box.querySelector('.hpnum').textContent = Math.max(0, mon.hp) + '/' + maxHP(mon);
      box.querySelector('.expbar i').style.width = (expProgress(mon) * 100).toFixed(1) + '%';
    }
  }
  async function animHP(side, from, to) {
    const mon = side === 'foe' ? B.foeMon : B.myMon;
    const steps = 14;
    for (let i = 1; i <= steps; i++) {
      mon.hp = Math.round(from + (to - from) * (i / steps));
      refreshInfo(side);
      await wait(22);
    }
    mon.hp = to; refreshInfo(side);
  }
  function fx(cls, el) {
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
    setTimeout(() => el.classList.remove(cls), 700);
  }
  function flashField(color) {
    els.fx.style.background = color;
    els.fx.style.opacity = '0.55';
    setTimeout(() => { els.fx.style.opacity = '0'; }, 130);
  }

  /* ---------------- 战斗计算 ---------------- */
  function stageMul(s) { return s >= 0 ? (2 + s) / 2 : 2 / (2 - s); }
  function effOf(move, def) {
    let e = 1;
    SPECIES[def.sid].types.forEach((t) => { e *= typeEff(move.type, t); });
    return e;
  }
  function calcDamage(att, def, move, aSt, dSt) {
    let A = atkOf(att) * stageMul(aSt.atk);
    let D = defOf(def) * stageMul(dSt.def);
    if (att.status === 'brn') A *= 0.7;
    const crit = chance(move.hiCrit ? 12 : 6.25);
    if (crit) { A = atkOf(att); D = defOf(def); } // 暴击无视能力变化
    let d = Math.floor(Math.floor((Math.floor((2 * att.lv) / 5 + 2) * move.power * A) / D) / 50) + 2;
    const stab = SPECIES[att.sid].types.includes(move.type) ? 1.5 : 1;
    const eff = effOf(move, def);
    d = Math.floor(d * stab * eff * (crit ? 1.8 : 1) * (0.85 + Math.random() * 0.15));
    if (eff === 0) d = 0; else d = Math.max(1, d);
    return { dmg: d, eff: eff, crit: crit };
  }
  function speedOf(mon, st) {
    let s = spdOf(mon) * stageMul(st.spd);
    if (mon.status === 'par') s *= 0.5;
    return s;
  }
  function immuneTo(mon, status) {
    const t = SPECIES[mon.sid].types;
    if (status === 'brn' && t.includes('fire')) return true;
    if (status === 'par' && t.includes('electric')) return true;
    if (status === 'psn' && t.includes('grass')) return true;
    return false;
  }

  /* ---------------- 行动执行 ---------------- */
  const STAT_CN = { atk: '攻击', def: '防御', spd: '速度' };

  async function useMove(side, moveSlot) {
    const isMe = side === 'me';
    const att = isMe ? B.myMon : B.foeMon;
    const def = isMe ? B.foeMon : B.myMon;
    const aSt = isMe ? B.st.me : B.st.foe;
    const dSt = isMe ? B.st.foe : B.st.me;
    const move = MOVES[moveSlot.key];
    const attEl = isMe ? els.mySprite : els.foeSprite;
    const defEl = isMe ? els.foeSprite : els.mySprite;
    const defSide = isMe ? 'foe' : 'me';

    // 异常导致无法行动
    if (att.status === 'slp') {
      if (att.slp > 0) {
        att.slp--;
        await say(monName(att) + ' 睡得正香…');
        return;
      }
      att.status = null; refreshInfo(isMe ? 'me' : 'foe');
      await say(monName(att) + ' 醒过来了！');
    }
    if (att.status === 'par' && chance(25)) {
      await say(monName(att) + ' 全身麻痹，无法动弹！');
      return;
    }

    moveSlot.pp = Math.max(0, moveSlot.pp - 1);
    await say(monName(att) + ' 使用了 ' + move.name + '！', 420);
    fx('lunge' + (isMe ? '-r' : '-l'), attEl);

    // 命中判定
    const acc = move.acc || 100;
    if (!move.sure && acc < 999 && !chance(acc)) {
      await say('但是没有命中…');
      return;
    }

    if (move.cat === 'status') {
      await applyEffect(move.eff, side, move);
      return;
    }

    const r = calcDamage(att, def, move, aSt, dSt);
    if (r.eff === 0) {
      await say('对 ' + monName(def) + ' 没有效果…');
      return;
    }
    flashField(TYPES[move.type].color);
    Sound.play(r.eff > 1 ? 'superHit' : r.eff < 1 ? 'weakHit' : 'hit');
    fx('hit', defEl);
    const before = def.hp;
    const after = Math.max(0, def.hp - r.dmg);
    await animHP(defSide, before, after);
    if (r.crit) await say('会心一击！', 480);
    if (r.eff > 1) await say('效果拔群！', 480);
    else if (r.eff < 1) await say('效果不太理想…', 480);

    // 吸血
    if (move.eff && move.eff.drain && att.hp > 0) {
      const heal = Math.max(1, Math.floor((before - after) * move.eff.drain));
      const nh = Math.min(maxHP(att), att.hp + heal);
      await animHP(isMe ? 'me' : 'foe', att.hp, nh);
      await say(monName(att) + ' 吸取了体力！', 480);
    }
    // 附带效果
    if (def.hp > 0 && move.eff && (move.eff.status || move.eff.stat)) {
      if (chance(move.eff.chance === undefined ? 100 : move.eff.chance)) {
        await applyEffect(move.eff, side, move);
      }
    }
  }

  async function applyEffect(eff, side, move) {
    if (!eff) return;
    const isMe = side === 'me';
    const self = isMe ? B.myMon : B.foeMon;
    const other = isMe ? B.foeMon : B.myMon;

    if (eff.heal) {
      const mx = maxHP(self);
      if (self.hp >= mx) { await say('但是没有变化…'); return; }
      const nh = Math.min(mx, self.hp + Math.floor(mx * eff.heal));
      await animHP(isMe ? 'me' : 'foe', self.hp, nh);
      await say(monName(self) + ' 回复了体力！');
      return;
    }
    if (eff.status) {
      const tgt = other;
      const tgtSide = isMe ? 'foe' : 'me';
      if (tgt.status) { await say(monName(tgt) + ' 已经处于异常状态了。'); return; }
      if (immuneTo(tgt, eff.status)) { await say('对 ' + monName(tgt) + ' 没有效果…'); return; }
      tgt.status = eff.status;
      if (eff.status === 'slp') tgt.slp = 1 + rnd(3);
      refreshInfo(tgtSide);
      const txt = { par: ' 麻痹了！', psn: ' 中毒了！', brn: ' 被灼伤了！', slp: ' 睡着了！' };
      await say(monName(tgt) + txt[eff.status]);
      return;
    }
    if (eff.stat) {
      const toSelf = eff.target === 'self';
      const st = toSelf ? (isMe ? B.st.me : B.st.foe) : (isMe ? B.st.foe : B.st.me);
      const tgt = toSelf ? self : other;
      const before = st[eff.stat];
      st[eff.stat] = clamp(before + eff.stage, -6, 6);
      if (st[eff.stat] === before) {
        await say(monName(tgt) + ' 的' + STAT_CN[eff.stat] + '不能再' + (eff.stage > 0 ? '提高' : '降低') + '了！');
        return;
      }
      const word = eff.stage > 0 ? (eff.stage >= 2 ? '大幅提高' : '提高') : (eff.stage <= -2 ? '大幅降低' : '降低');
      await say(monName(tgt) + ' 的' + STAT_CN[eff.stat] + word + '了！');
    }
  }

  // 回合结束的中毒/灼伤伤害
  async function endTurnStatus(side) {
    const mon = side === 'me' ? B.myMon : B.foeMon;
    if (mon.hp <= 0) return;
    if (mon.status === 'psn' || mon.status === 'brn') {
      const dmg = Math.max(1, Math.floor(maxHP(mon) / 8));
      flashField(mon.status === 'psn' ? '#9a5ac0' : '#e07030');
      await animHP(side, mon.hp, Math.max(0, mon.hp - dmg));
      await say(monName(mon) + (mon.status === 'psn' ? ' 受到了毒的伤害！' : ' 受到了灼伤的伤害！'), 480);
    }
  }

  /* ---------------- 敌方 AI ---------------- */
  function foeChoose() {
    const usable = B.foeMon.moves.filter((m) => m.pp > 0);
    if (!usable.length) return null;
    if (chance(20)) return usable[rnd(usable.length)];
    let best = null, bestScore = -1;
    usable.forEach((slot) => {
      const mv = MOVES[slot.key];
      let score;
      if (mv.cat === 'status') {
        score = B.foeMon.hp / maxHP(B.foeMon) > 0.6 ? 22 + rnd(12) : 6;
        if (mv.eff && mv.eff.heal && B.foeMon.hp / maxHP(B.foeMon) < 0.4) score = 70;
        if (mv.eff && mv.eff.status && B.myMon.status) score = 2;
      } else {
        const eff = effOf(mv, B.myMon);
        const stab = SPECIES[B.foeMon.sid].types.includes(mv.type) ? 1.5 : 1;
        score = mv.power * eff * stab * (mv.acc >= 999 ? 1 : mv.acc / 100) / 3;
      }
      score += rnd(6);
      if (score > bestScore) { bestScore = score; best = slot; }
    });
    return best;
  }

  /* ---------------- 濒死 / 换人 ---------------- */
  async function faintSprite(side) {
    Sound.play('faint');
    const el = side === 'me' ? els.mySprite : els.foeSprite;
    el.classList.add('fainted');
    await wait(520);
  }
  async function sendOut(side, mon) {
    const el = side === 'me' ? els.mySprite : els.foeSprite;
    el.classList.remove('fainted');
    drawSprite(el, mon, side === 'me');
    refreshInfo(side);
    fx('enter', el);
    await wait(240);
  }

  // mode: 'switch' 换人（不能选出战中/濒死） | 'item' 用道具（都能选）
  async function choosePartyMember(force, mode) {
    const forItem = mode === 'item';
    const items = G.party.map((m, i) => ({
      label: monName(m) + ' <b>Lv' + m.lv + '</b>' + (m === B.myMon ? ' <small style="display:inline">（出战中）</small>' : ''),
      sub: 'HP ' + Math.max(0, m.hp) + '/' + maxHP(m) + (m.status ? ' [' + STATUS_NAME[m.status] + ']' : ''),
      cls: 'wide' + (isFainted(m) && !forItem ? ' dim' : '') + (m === B.myMon ? ' cur' : ''),
      disabled: forItem ? false : (isFainted(m) || m === B.myMon),
      value: i,
    }));
    if (!force) items.push({ label: '返回', cls: 'wide back', value: -1 });
    return await menu(items);
  }

  /* ---------------- 经验与升级 ---------------- */
  async function gainExp(mon, amount, isActive) {
    if (isFainted(mon)) return;
    const amt = isActive ? amount : Math.floor(amount / 3);
    if (amt <= 0) return;
    mon.exp += amt;
    if (isActive) await say(monName(mon) + ' 获得了 ' + amt + ' 点经验值！', 500);
    while (mon.lv < 100 && mon.exp >= expForLv(mon.lv + 1)) {
      const oldMax = maxHP(mon);
      mon.lv++;
      mon.hp += maxHP(mon) - oldMax;
      if (mon === B.myMon) refreshInfo('me');
      Sound.play('levelup');
      await say(monName(mon) + ' 升到了 Lv' + mon.lv + '！', 700);
      const news = newMovesOnLevel(mon, mon.lv);
      for (const key of news) await tryLearn(mon, key);
    }
    if (mon === B.myMon) refreshInfo('me');
  }
  async function tryLearn(mon, key) {
    if (mon.moves.some((m) => m.key === key)) return;
    const mv = MOVES[key];
    if (mon.moves.length < 4) {
      mon.moves.push({ key: key, pp: mv.pp, max: mv.pp });
      await say(monName(mon) + ' 学会了 ' + mv.name + '！');
      return;
    }
    await say(monName(mon) + ' 想学会 ' + mv.name + '，但技能已满！', 700);
    await say('要忘记哪个技能？', 300);
    const items = mon.moves.map((m, i) => ({
      label: MOVES[m.key].name,
      sub: TYPES[MOVES[m.key].type].name + ' · 威力' + (MOVES[m.key].power || '—'),
      cls: 'wide t-' + MOVES[m.key].type, value: i,
    }));
    items.push({ label: '放弃学习 ' + mv.name, cls: 'wide back', value: -1 });
    const pick = await menu(items);
    if (pick === -1) { await say(monName(mon) + ' 没有学会 ' + mv.name + '。'); return; }
    const old = MOVES[mon.moves[pick].key].name;
    mon.moves[pick] = { key: key, pp: mv.pp, max: mv.pp };
    await say(monName(mon) + ' 忘记了 ' + old + '，学会了 ' + mv.name + '！');
  }

  /* ---------------- 捕捉 ---------------- */
  async function throwBall(key) {
    const item = ITEMS[key];
    useItemCount(key);
    clearMenu();
    await say(G.name + ' 投出了 ' + item.name + '！', 300);
    // 飞行动画
    const b = els.ball;
    const kind = key === 'greatball' ? 'great' : key === 'ultraball' ? 'ultra' : 'normal';
    b.innerHTML = '';
    const bc = SPR.ballCanvas(kind, 3);
    const img = document.createElement('canvas');
    img.width = bc.width; img.height = bc.height;
    img.getContext('2d').drawImage(bc, 0, 0);
    b.appendChild(img);
    b.classList.add('fly');
    Sound.play('ball');
    await wait(620);
    b.classList.remove('fly');
    els.foeSprite.classList.add('sucked');
    await wait(320);

    const res = catchAttempt(B.foeMon, item.rate);
    b.classList.add('rest');
    for (let i = 0; i < Math.min(3, res.shakes); i++) {
      b.classList.add('shake'); Sound.play('shake'); await wait(420); b.classList.remove('shake'); await wait(120);
    }
    if (res.caught) {
      b.classList.add('caught');
      Sound.play('catch');
      await say('太好了！成功收服了 ' + monName(B.foeMon) + '！', 900);
      dexCaught(B.foeMon.sid);
      const mon = B.foeMon;
      mon.hp = Math.max(1, mon.hp);
      const where = addToParty(mon);
      if (where === 'box') await say('队伍已满，' + monName(mon) + ' 被送往了保管箱。');
      else await say(monName(mon) + ' 加入了队伍！');
      B.result = 'caught';
      B.over = true;
      return true;
    }
    els.foeSprite.classList.remove('sucked');
    b.classList.remove('rest');
    b.innerHTML = '';
    const t = ['可惜！差一点就抓到了！', '啊！它挣脱出来了！', '真遗憾，就差一点点…'];
    await say(res.shakes >= 2 ? t[0] : t[1 + rnd(2)] || t[1]);
    return false;
  }

  /* ---------------- 玩家回合选择 ---------------- */
  async function chooseAction() {
    while (true) {
      els.msg.textContent = '要让 ' + monName(B.myMon) + ' 做什么？';
      const top = await menu([
        { label: '战斗', cls: 'main c1', value: 'fight' },
        { label: '背包', cls: 'main c2', value: 'bag' },
        { label: '伙伴', cls: 'main c3', value: 'party' },
        { label: B.isWild ? '逃跑' : '认输', cls: 'main c4', value: 'run' },
      ]);
      if (top === 'fight') {
        const items = B.myMon.moves.map((m, i) => {
          const mv = MOVES[m.key];
          return {
            label: mv.name, sub: TYPES[mv.type].name + ' · ' + (mv.power || '变化') + ' · PP ' + m.pp + '/' + m.max,
            cls: 't-' + mv.type + (m.pp <= 0 ? ' dim' : ''), disabled: m.pp <= 0, value: i,
          };
        });
        while (items.length < 4) items.push({ label: '—', cls: 'empty', disabled: true, value: -2 });
        items.push({ label: '返回', cls: 'wide back', value: -1 });
        const pick = await menu(items);
        if (pick === -1 || pick === -2) continue;
        return { type: 'move', slot: B.myMon.moves[pick] };
      }
      if (top === 'bag') {
        const list = bagList();
        if (!list.length) { await say('背包里什么都没有…'); continue; }
        const items = list.map((it) => ({
          label: it.item.name + ' <b>×' + it.n + '</b>', sub: it.item.desc, cls: 'wide', value: it.key,
        }));
        items.push({ label: '返回', cls: 'wide back', value: -1 });
        const pick = await menu(items);
        if (pick === -1) continue;
        const it = ITEMS[pick];
        if (it.kind === 'ball') {
          if (!B.isWild) { await say('不能对别人的怪兽使用精灵球！'); continue; }
          return { type: 'ball', key: pick };
        }
        if (it.kind === 'heal' || it.kind === 'cure' || it.kind === 'revive') {
          const idx = await choosePartyMember(false, 'item');
          if (idx === -1) continue;
          const target = G.party[idx];
          if (it.kind === 'heal') {
            if (isFainted(target)) { await say('对濒死的伙伴没有效果。'); continue; }
            if (target.hp >= maxHP(target)) { await say('HP 已经全满了。'); continue; }
          }
          if (it.kind === 'cure' && !target.status) { await say('没有需要治疗的状态。'); continue; }
          if (it.kind === 'revive' && !isFainted(target)) { await say('只能对濒死的伙伴使用。'); continue; }
          return { type: 'item', key: pick, target: idx };
        }
      }
      if (top === 'party') {
        const idx = await choosePartyMember(false);
        if (idx === -1) continue;
        return { type: 'switch', idx: idx };
      }
      if (top === 'run') {
        if (!B.isWild) {
          await say('不能从训练家对战中逃走！');
          continue;
        }
        return { type: 'run' };
      }
    }
  }

  /* ---------------- 玩家行动执行（非技能） ---------------- */
  async function doPlayerNonMove(act) {
    if (act.type === 'ball') return await throwBall(act.key);
    if (act.type === 'item') {
      const it = ITEMS[act.key];
      const target = G.party[act.target];
      useItemCount(act.key);
      clearMenu();
      if (it.kind === 'heal') {
        const nh = Math.min(maxHP(target), target.hp + it.amount);
        const gained = nh - target.hp;
        if (target === B.myMon) await animHP('me', target.hp, nh); else target.hp = nh;
        await say(target === B.myMon ? monName(target) + ' 回复了 ' + gained + ' 点 HP！' : monName(target) + ' 回复了体力。');
      } else if (it.kind === 'cure') {
        target.status = null; target.slp = 0;
        if (target === B.myMon) refreshInfo('me');
        await say(monName(target) + ' 的状态恢复正常了！');
      } else if (it.kind === 'revive') {
        target.hp = Math.floor(maxHP(target) / 2); target.status = null;
        await say(monName(target) + ' 复活了！');
      }
      return false;
    }
    if (act.type === 'switch') {
      clearMenu();
      await say('回来吧，' + monName(B.myMon) + '！', 420);
      B.myIdx = act.idx;
      B.myMon = G.party[act.idx];
      B.st.me = { atk: 0, def: 0, spd: 0 };
      await sendOut('me', B.myMon);
      await say('上吧，' + monName(B.myMon) + '！', 500);
      return false;
    }
    if (act.type === 'run') {
      clearMenu();
      const odds = clamp(30 + (spdOf(B.myMon) / Math.max(1, spdOf(B.foeMon))) * 40 + B.runTries * 20, 15, 95);
      B.runTries++;
      if (chance(odds)) {
        await say('顺利逃走了！', 600);
        B.result = 'run'; B.over = true;
        return true;
      }
      await say('没能逃掉！');
      return false;
    }
    return false;
  }

  /* ---------------- 敌方濒死处理 ---------------- */
  async function onFoeFaint() {
    await say(monName(B.foeMon) + ' 倒下了！', 500);
    await faintSprite('foe');
    const exp = expReward(B.foeMon, !B.isWild);
    await gainExp(B.myMon, exp, true);
    for (const m of G.party) if (m !== B.myMon) await gainExp(m, exp, false);

    if (B.isWild) { B.result = 'win'; B.over = true; return; }
    B.foeIdx++;
    if (B.foeIdx >= B.foeParty.length) { B.result = 'win'; B.over = true; return; }
    B.foeMon = B.foeParty[B.foeIdx];
    B.st.foe = { atk: 0, def: 0, spd: 0 };
    await say(B.trainer.name + ' 派出了 ' + monName(B.foeMon) + '！', 500);
    await sendOut('foe', B.foeMon);
  }

  async function onMyFaint() {
    await say(monName(B.myMon) + ' 倒下了！', 500);
    await faintSprite('me');
    if (!partyAlive()) { B.result = 'lose'; B.over = true; return; }
    await say('要派出哪只伙伴？', 250);
    const idx = await choosePartyMember(true);
    B.myIdx = idx;
    B.myMon = G.party[idx];
    B.st.me = { atk: 0, def: 0, spd: 0 };
    await sendOut('me', B.myMon);
    await say('上吧，' + monName(B.myMon) + '！', 450);
  }

  /* ---------------- 主流程 ---------------- */
  async function start(opts) {
    if (!root) build();
    const myIdx = firstAbleIndex();
    B = {
      isWild: !!opts.wild,
      trainer: opts.trainer || null,
      foeParty: opts.wild ? [opts.wild] : opts.trainer.team.map((t) => makeMon(t[0], t[1], { ot: opts.trainer.name })),
      foeIdx: 0,
      myIdx: myIdx,
      st: { me: { atk: 0, def: 0, spd: 0 }, foe: { atk: 0, def: 0, spd: 0 } },
      over: false, result: null, runTries: 0,
    };
    B.foeMon = B.foeParty[0];
    B.myMon = G.party[myIdx];

    root.classList.remove('hidden');
    root.classList.add('battle-in');
    els.field.className = 'bfield ' + (opts.bg || 'bg-grass');
    els.mySprite.classList.remove('fainted');
    els.foeSprite.classList.remove('fainted', 'sucked');
    els.ball.className = 'ballfly'; els.ball.innerHTML = '';
    drawSprite(els.foeSprite, B.foeMon, false);
    drawSprite(els.mySprite, B.myMon, true);
    refreshInfo('foe'); refreshInfo('me');
    await wait(360);
    root.classList.remove('battle-in');

    if (B.isWild) {
      dexSeen(B.foeMon.sid);
      await say('野生的 ' + monName(B.foeMon) + ' 出现了！', 600);
    } else {
      await say(B.trainer.name + ' 想要和你对战！', 600);
      await say(B.trainer.name + ' 派出了 ' + monName(B.foeMon) + '！', 500);
    }
    B.foeParty.forEach((m) => dexSeen(m.sid));
    await say('上吧，' + monName(B.myMon) + '！', 500);

    /* 回合循环 */
    while (!B.over) {
      const act = await chooseAction();
      clearMenu();

      // 非技能行动优先执行
      if (act.type !== 'move') {
        const ended = await doPlayerNonMove(act);
        if (ended || B.over) break;
        // 敌方仍可行动
        const fslot = foeChoose();
        if (fslot) await useMove('foe', fslot);
        else await say(monName(B.foeMon) + ' 没有可用的技能，陷入了苦战…');
        if (B.myMon.hp <= 0) { await onMyFaint(); if (B.over) break; }
        await endTurnStatus('me'); await endTurnStatus('foe');
        if (B.myMon.hp <= 0) { await onMyFaint(); if (B.over) break; }
        if (B.foeMon.hp <= 0) { await onFoeFaint(); if (B.over) break; }
        continue;
      }

      const fslot = foeChoose();
      const myMove = MOVES[act.slot.key];
      const foeMove = fslot ? MOVES[fslot.key] : null;
      const myPri = myMove.pri || 0, foePri = foeMove ? (foeMove.pri || 0) : -9;
      let meFirst;
      if (myPri !== foePri) meFirst = myPri > foePri;
      else {
        const s1 = speedOf(B.myMon, B.st.me), s2 = speedOf(B.foeMon, B.st.foe);
        meFirst = s1 === s2 ? chance(50) : s1 > s2;
      }

      const order = meFirst ? ['me', 'foe'] : ['foe', 'me'];
      for (const side of order) {
        if (B.over) break;
        if (side === 'me') {
          if (B.myMon.hp <= 0) continue;
          await useMove('me', act.slot);
          if (B.foeMon.hp <= 0) { await onFoeFaint(); break; }
        } else {
          if (B.foeMon.hp <= 0) continue;
          if (fslot) await useMove('foe', fslot);
          if (B.myMon.hp <= 0) { await onMyFaint(); break; }
        }
      }
      if (B.over) break;
      await endTurnStatus('me');
      if (B.myMon.hp <= 0) { await onMyFaint(); if (B.over) break; }
      await endTurnStatus('foe');
      if (B.foeMon.hp <= 0) { await onFoeFaint(); if (B.over) break; }
    }

    /* 结算 */
    clearMenu();
    if (B.result === 'win' && !B.isWild) {
      await say(B.trainer.name + ' 被打败了！', 600);
      if (B.trainer.winText) await say(B.trainer.winText);
      if (B.trainer.money) { Sound.play('money'); G.money += B.trainer.money; await say('得到了 ' + B.trainer.money + ' 元奖金！'); }
    }
    if (B.result === 'lose') {
      await say('你的怪兽全部失去了战斗能力…', 700);
      if (B.trainer && B.trainer.loseText) await say(B.trainer.loseText);
    }

    // 进化检查
    const evolved = [];
    for (const m of G.party) {
      const s = SPECIES[m.sid];
      if (s.evo && m.lv >= s.evo.lv && !isFainted(m)) evolved.push(m);
    }
    for (const m of evolved) await doEvolve(m);

    root.classList.add('hidden');
    const out = B.result;
    B = null;
    return out;
  }

  async function doEvolve(mon) {
    const to = SPECIES[mon.sid].evo.to;
    els.menu.innerHTML = '';
    els.field.className = 'bfield bg-evo';
    els.foeInfo.style.visibility = 'hidden'; els.myInfo.style.visibility = 'hidden';
    els.foeSprite.style.visibility = 'hidden';
    els.mySprite.classList.remove('fainted');
    els.mySprite.style.visibility = 'visible';
    drawSprite(els.mySprite, mon, false);
    els.mySprite.classList.add('evolving');
    await say('咦…？' + monName(mon) + ' 的样子…', 700);
    for (let i = 0; i < 6; i++) {
      drawSprite(els.mySprite, { sid: i % 2 ? to : mon.sid }, false);
      await wait(160 + i * 40);
    }
    const oldName = monName(mon);
    mon.sid = to;
    if (mon.nick === null) { /* 昵称跟随物种 */ }
    drawSprite(els.mySprite, mon, false);
    els.mySprite.classList.remove('evolving');
    fx('enter', els.mySprite);
    dexCaught(to);
    Sound.play('catch');
    await say('恭喜！' + oldName + ' 进化成了 ' + monName(mon) + '！', 1100);
    // 进化后可能立刻学会新技能
    const learn = SPECIES[to].learn.filter((l) => l[0] <= mon.lv).map((l) => l[1]);
    for (const k of learn.slice(-2)) await tryLearn(mon, k);
    els.foeInfo.style.visibility = ''; els.myInfo.style.visibility = '';
    els.foeSprite.style.visibility = '';
  }

  return { start: start };
})();
