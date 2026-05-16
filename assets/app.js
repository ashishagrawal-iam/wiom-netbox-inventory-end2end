// Inventory End-to-End prototype controller

(function() {
  const body = document.body;
  const rail = document.getElementById('rail');
  const stageTitle = document.getElementById('stage-title');
  const stageSub = document.getElementById('stage-sub');
  const sidePanel = document.getElementById('side-panel');
  const toggleGroup = document.getElementById('overlay-toggle');
  const wfStepper = document.getElementById('wf-stepper');
  const phoneFrame = document.querySelector('.phone-frame');

  const sourceLabel = {
    'PR #222':  'PR #222 · order-side journey',
    'DD-state': 'netbox-drilldown-states branch · device states',
    'SDA':      'SD Amendment docs · 14 May 2026'
  };

  let currentWorkflow = null;
  let currentStepIndex = -1;
  let currentScreen = null;
  const backStack = [];  // history for the phone's back-arrow

  function renderAnnotations(screenId, workflowNote) {
    const a = window.ANNOTATIONS[screenId];
    let html = '';
    if (workflowNote) {
      html += '<div class="anno policy" style="border-left-color:var(--wc-state-caution);background:var(--wc-bg-warning);">';
      html += '<span class="pill policy">WORKFLOW STEP</span><br/>';
      html += workflowNote;
      html += '</div>';
    }
    if (a) {
      html += '<h3 style="margin-top:14px;">' + a.title + '</h3>';
      html += '<div class="t-bodySmall text-secondary" style="margin-bottom:14px;">Source · ' + (sourceLabel[a.source] || a.source) + '</div>';
      a.sections.forEach(section => {
        html += '<div class="crumb">' + section.crumb + '</div>';
        section.anchors.forEach(anchor => {
          const cls = anchor.kind || 'unchanged';
          const pill = ({
            added: 'ADDED', removed: 'REMOVED', changed: 'CHANGED',
            policy: 'POLICY', unchanged: 'UNCHANGED'
          })[cls];
          html += '<div class="anno ' + cls + '">';
          html += '<span class="pill ' + cls + '">' + pill + '</span><br/>';
          html += anchor.text;
          html += '</div>';
        });
      });
    } else {
      html += '<div class="anno">No annotation for this screen.</div>';
    }
    html += '<div class="crumb" style="margin-top:24px;">Legend</div>';
    html += '<div style="font-size:12px;line-height:1.7;color:var(--wc-text-secondary);">';
    html += '<span class="pill added">ADDED</span> new content/screen<br/>';
    html += '<span class="pill changed">CHANGED</span> existing element altered<br/>';
    html += '<span class="pill removed">REMOVED</span> deprecated by amendments<br/>';
    html += '<span class="pill policy">POLICY</span> backend invariant CSP feels<br/>';
    html += '<span class="pill" style="background:var(--wc-bg-secondary);color:var(--wc-text-secondary);">UNCHANGED</span> today\'s truth, kept as-is';
    html += '</div>';
    sidePanel.innerHTML = html;
    sidePanel.scrollTop = 0;
  }

  function renderWorkflowStepper() {
    if (!currentWorkflow) { wfStepper.style.display = 'none'; return; }
    const wf = window.WORKFLOWS[currentWorkflow];
    if (!wf) { wfStepper.style.display = 'none'; return; }
    let html = '';
    html += '<div class="wf-title"><span class="wf-id">' + currentWorkflow + '</span>' + wf.title + '</div>';
    html += '<div class="wf-purpose">' + wf.purpose + '</div>';
    html += '<div class="wf-steps">';
    wf.steps.forEach((step, i) => {
      const cls = i === currentStepIndex ? 'active' : (i < currentStepIndex ? 'done' : '');
      html += '<div class="wf-step ' + cls + '" data-step="' + i + '">';
      html += '<span class="num">' + step.num + '</span>';
      html += '<span class="lbl">' + step.label + '</span>';
      html += '</div>';
    });
    html += '</div>';
    wfStepper.innerHTML = html;
    wfStepper.style.display = 'block';

    wfStepper.querySelectorAll('.wf-step').forEach(el => {
      el.addEventListener('click', () => {
        const idx = +el.dataset.step;
        gotoWorkflowStep(currentWorkflow, idx);
      });
    });
  }

  function showScreen(id, opts) {
    opts = opts || {};
    if (currentScreen && currentScreen !== id && !opts.fromBack) backStack.push(currentScreen);
    if (backStack.length > 30) backStack.shift();
    currentScreen = id;

    document.querySelectorAll('.screen').forEach(s => {
      s.classList.toggle('active', s.id === 'screen-' + id);
    });
    // Defensive: explicit remove-then-add. `toggle('active', undefined)` is
    // spec-defined as TOGGLE (not remove), so a falsy-but-non-boolean expression
    // silently flipped sibling items on/off across navigations.
    document.querySelectorAll('#rail .item').forEach(i => i.classList.remove('active'));
    const matchSelector = opts.fromWorkflow
      ? '#rail .item[data-workflow="' + opts.fromWorkflow + '"]'
      : '#rail .item[data-screen="' + id + '"]';
    const matchEl = document.querySelector(matchSelector);
    if (matchEl) matchEl.classList.add('active');

    // briefly pulse the phone frame to acknowledge the navigation
    if (phoneFrame) {
      phoneFrame.classList.remove('tap-hint');
      void phoneFrame.offsetWidth;
      phoneFrame.classList.add('tap-hint');
    }

    const a = window.ANNOTATIONS[id];
    if (a) {
      stageTitle.textContent = a.title;
      stageSub.textContent = a.sub + ' · ' + (sourceLabel[a.source] || a.source);
    } else {
      stageTitle.textContent = id;
      stageSub.textContent = '';
    }
    renderAnnotations(id, opts.workflowNote || null);
  }

  function gotoWorkflowStep(wfId, idx) {
    const wf = window.WORKFLOWS[wfId];
    if (!wf) return;
    body.classList.add('show-amendments');
    toggleGroup.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.mode === 'show'));

    currentWorkflow = wfId;
    currentStepIndex = idx;
    const step = wf.steps[idx];
    showScreen(step.screen, { fromWorkflow: wfId, workflowNote: '<strong>' + wfId + ' · Step ' + step.num + ' · ' + step.label + '</strong><br/>' + step.note });
    renderWorkflowStepper();
    if (history.replaceState) history.replaceState(null, '', '#' + wfId + '-' + idx);
  }

  function clearWorkflow() {
    currentWorkflow = null;
    currentStepIndex = -1;
    wfStepper.style.display = 'none';
    wfStepper.innerHTML = '';
  }

  function maybeAdvanceWorkflow(targetScreen) {
    if (!currentWorkflow) return false;
    const wf = window.WORKFLOWS[currentWorkflow];
    if (!wf) return false;
    // If the next step's screen matches target, advance
    if (currentStepIndex + 1 < wf.steps.length && wf.steps[currentStepIndex + 1].screen === targetScreen) {
      gotoWorkflowStep(currentWorkflow, currentStepIndex + 1);
      return true;
    }
    // Or if any later step matches the target, jump to it
    for (let i = currentStepIndex + 1; i < wf.steps.length; i++) {
      if (wf.steps[i].screen === targetScreen) {
        gotoWorkflowStep(currentWorkflow, i);
        return true;
      }
    }
    return false;
  }

  function navigate(targetScreen) {
    if (!targetScreen) return;
    if (maybeAdvanceWorkflow(targetScreen)) return;
    // If navigation leaves the workflow's known path, clear workflow
    if (currentWorkflow) {
      const wf = window.WORKFLOWS[currentWorkflow];
      const screenInWf = wf && wf.steps.some(s => s.screen === targetScreen);
      if (!screenInWf) clearWorkflow();
    }
    showScreen(targetScreen);
    if (history.replaceState) history.replaceState(null, '', '#' + targetScreen);
  }

  // Phone-screen tap delegate
  document.addEventListener('click', e => {
    // Find nearest element with a tap directive inside the phone
    let el = e.target;
    while (el && el !== document.body) {
      if (el.dataset && (el.dataset.tap || el.dataset.tapPre || el.dataset.tapPost)) {
        // Only intercept if this is inside the phone (not the rail or other UI)
        if (!el.closest('.phone-screen, .phone-frame')) break;

        let dest = el.dataset.tap;
        const isAmended = body.classList.contains('show-amendments');
        if (el.dataset.tapPre || el.dataset.tapPost) {
          dest = isAmended ? el.dataset.tapPost : el.dataset.tapPre;
        }
        if (dest === '__back') {
          const prev = backStack.pop();
          if (prev) {
            currentScreen = null;
            showScreen(prev, { fromBack: true });
            if (history.replaceState) history.replaceState(null, '', '#' + prev);
          }
        } else if (dest) {
          e.preventDefault();
          e.stopPropagation();
          navigate(dest);
        }
        return;
      }
      el = el.parentElement;
    }
  });

  // Rail navigation
  rail.addEventListener('click', e => {
    const item = e.target.closest('.item');
    if (!item) return;
    if (item.dataset.workflow) {
      gotoWorkflowStep(item.dataset.workflow, 0);
      return;
    }
    const id = item.dataset.screen;
    if (id) {
      clearWorkflow();
      backStack.length = 0;
      currentScreen = null;
      showScreen(id);
      if (history.replaceState) history.replaceState(null, '', '#' + id);
    }
  });

  // Amendment overlay toggle
  toggleGroup.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    toggleGroup.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === btn));
    if (btn.dataset.mode === 'show') body.classList.add('show-amendments');
    else body.classList.remove('show-amendments');
  });

  // Keyboard navigation for workflow steps
  document.addEventListener('keydown', e => {
    if (!currentWorkflow) return;
    if (e.target && /INPUT|TEXTAREA/i.test(e.target.tagName)) return;
    const wf = window.WORKFLOWS[currentWorkflow];
    if (e.key === 'ArrowRight' && currentStepIndex < wf.steps.length - 1) {
      gotoWorkflowStep(currentWorkflow, currentStepIndex + 1);
    } else if (e.key === 'ArrowLeft' && currentStepIndex > 0) {
      gotoWorkflowStep(currentWorkflow, currentStepIndex - 1);
    }
  });

  // Init
  const hash = window.location.hash.replace('#', '');
  const wfMatch = hash.match(/^(W\d+)-(\d+)$/);
  if (wfMatch && window.WORKFLOWS[wfMatch[1]]) {
    gotoWorkflowStep(wfMatch[1], parseInt(wfMatch[2], 10));
  } else if (hash && document.getElementById('screen-' + hash)) {
    showScreen(hash);
  } else {
    showScreen('nb-home');
  }
})();
