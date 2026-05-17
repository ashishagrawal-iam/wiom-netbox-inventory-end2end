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

  // Mobile drawer / bottom-sheet toggles
  const mobileRailBtn = document.getElementById('mobile-rail-btn');
  const mobileSideBtn = document.getElementById('mobile-side-btn');
  const mobileSideClose = document.getElementById('mobile-side-close');
  const mobileScrim = document.getElementById('mobile-scrim');

  function closeMobileOverlays() {
    body.classList.remove('rail-open', 'side-open');
  }
  if (mobileRailBtn) mobileRailBtn.addEventListener('click', () => {
    body.classList.remove('side-open');
    body.classList.toggle('rail-open');
  });
  if (mobileSideBtn) mobileSideBtn.addEventListener('click', () => {
    body.classList.remove('rail-open');
    body.classList.add('side-open');
  });
  if (mobileSideClose) mobileSideClose.addEventListener('click', closeMobileOverlays);
  if (mobileScrim) mobileScrim.addEventListener('click', closeMobileOverlays);

  // Esc closes any open mobile overlay
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMobileOverlays();
  });

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

  // v8.4 · Zone & Capacity chip on dashboard-home morphs per active flow.
  // Three states matching the three drilldown variants. Default = opportunity.
  const CHIP_STATES = {
    opportunity: {
      bg: 'var(--wc-bg-brand-tint)', stroke: 'var(--wc-brand-stroke)',
      iconColor: 'var(--wc-brand-primary)', icon: '#i-trending-up',
      labelColor: 'var(--wc-brand-primary)',
      value: '25 खुले', valueColor: 'var(--wc-text-primary)',
      cta: 'देखें ›', ctaColor: 'var(--wc-brand-primary)'
    },
    'no-capacity': {
      bg: 'var(--wc-bg-subtle)', stroke: 'var(--wc-stroke-primary)',
      iconColor: 'var(--wc-text-secondary)', icon: '#i-clock',
      labelColor: 'var(--wc-text-secondary)',
      value: 'अभी इंतज़ार', valueColor: 'var(--wc-text-primary)',
      cta: 'देखें ›', ctaColor: 'var(--wc-text-secondary)'
    },
    blocked: {
      bg: 'var(--wc-bg-caution)', stroke: 'var(--wc-state-caution)',
      iconColor: 'var(--wc-state-caution)', icon: '#i-stop',
      labelColor: 'var(--wc-state-caution)',
      value: 'रुका हुआ', valueColor: 'var(--wc-text-primary)',
      cta: '1 वजह · देखें ›', ctaColor: 'var(--wc-state-caution)'
    }
  };

  function setZoneChipState(state) {
    const chip = document.getElementById('zone-capacity-chip');
    if (!chip) return;
    const cfg = CHIP_STATES[state] || CHIP_STATES.opportunity;
    chip.dataset.chipState = state;
    chip.style.background = cfg.bg;
    chip.style.borderColor = cfg.stroke;
    const iconEl = document.getElementById('zone-chip-icon');
    if (iconEl) {
      iconEl.style.color = cfg.iconColor;
      const useEl = iconEl.querySelector('use');
      if (useEl) useEl.setAttribute('href', cfg.icon);
    }
    const labelEl = document.getElementById('zone-chip-label');
    if (labelEl) labelEl.style.color = cfg.labelColor;
    const valueEl = document.getElementById('zone-chip-value');
    if (valueEl) { valueEl.textContent = cfg.value; valueEl.style.color = cfg.valueColor; }
    const ctaEl = document.getElementById('zone-chip-cta');
    if (ctaEl) { ctaEl.textContent = cfg.cta; ctaEl.style.color = cfg.ctaColor; }
  }

  function chipStateForFlow(wfId) {
    if (wfId === 'F1D') return 'no-capacity';
    if (wfId === 'F1E') return 'blocked';
    return 'opportunity';
  }

  // v8.7 · Shared payment screens (add-funds-method/input/success) morph per
  // active workflow. Originally hardcoded ₹2,000 + wallet-top-up framing
  // from F1·C — which leaked into W1 (₹20,000 SD onboarding) and other flows.
  // Each context defines copy + amount for the destination of the payment.
  const PAYMENT_CONTEXTS = {
    'sd-onboarding': { // W1 — one-time partnership SD
      method:  { title: 'सुरक्षा राशि जमा करें', label: 'Wiom साझेदारी की सुरक्षा राशि', amount: '₹20,000', sub: 'सीधे आपकी सुरक्षा राशि में जाएगी', cta: '₹20,000 जमा करें' },
      input:   { title: 'सुरक्षा राशि जमा करें', hint: 'राशि', amount: '20,000', cta: '₹20,000 जमा करें' },
      success: { subtitle: '₹20,000 सुरक्षा राशि में जमा हो गए', balLabel: 'वर्तमान सुरक्षा राशि', balAmount: '₹20,000' }
    },
    'sd-topup': { // F1·B / F1·C / W7 / W9 — top-up to existing SD
      method:  { title: 'सुरक्षा राशि में top-up', label: 'सुरक्षा राशि में जमा', amount: '₹2,000', sub: 'आपकी सुरक्षा राशि में जाएगा', cta: '₹2,000 जमा करें' },
      input:   { title: 'सुरक्षा राशि में जोड़ें', hint: 'राशि', amount: '2,000', cta: '₹2,000 जमा करें' },
      success: { subtitle: '₹2,000 सुरक्षा राशि में जमा हो गए', balLabel: 'वर्तमान सुरक्षा राशि', balAmount: '₹22,000' }
    },
    'wallet-topup': { // default / legacy wallet refill
      method:  { title: 'भुगतान विधि', label: 'वॉलेट में पैसे डालें', amount: '₹2,000', sub: 'अपने वॉलेट में जोड़ा जाएगा', cta: '₹2,000 जमा करें' },
      input:   { title: 'वॉलेट में पैसे डालें', hint: 'अपनी राशि लिखें', amount: '2,000', cta: 'पैसे जोड़ें' },
      success: { subtitle: '₹2,000 वॉलेट में जुड़ गया', balLabel: 'नया वॉलेट बैलेंस', balAmount: '₹3,800' }
    }
  };

  function paymentContextForFlow(wfId) {
    if (wfId === 'W1') return 'sd-onboarding';
    if (wfId === 'F1B' || wfId === 'F1C' || wfId === 'W7' || wfId === 'W9') return 'sd-topup';
    return 'wallet-topup';
  }

  // v8.8 · Screen-level tap remaps (works across sticky workflow drift).
  // Keyed by [workflow][fromScreen][originalTapTarget] → remappedTarget.
  // This complements the step-level tapRemap inside workflow definitions —
  // SCREEN_TAP_REMAP fires whenever the workflow is active, regardless of
  // which step is currently highlighted, so drifted in-phone tap chains
  // route correctly to the workflow's intended destination.
  const SCREEN_TAP_REMAP = {
    'W1': {
      // After UPI processing animation, W1 wants its dedicated SD-active
      // surface (with capacity-unlock CTA), not the generic add-funds-success.
      'add-funds-processing': { 'add-funds-success': 'onboarding-success' }
    },
    'W7': {
      // After top-up clears the escalation, W7 lands on settlement-detail
      // (early reconciliation triggered) — not the wallet tracker.
      'add-funds-success': { 'nb-home-tracking': 'settlement-detail' }
    },
    'W9': {
      // Standalone top-up goes back to SD profile to show the new balance.
      'add-funds-success': { 'nb-home-tracking': 'sd-profile' }
    }
  };

  // v8.7 · Per-workflow content overrides for shared screens that get visited
  // from multiple workflows with different state semantics. Same shape as
  // PAYMENT_CONTEXTS but keyed by [workflowId][screenId][fieldId]. Default
  // (workflow not present here) leaves the HTML's static copy untouched.
  const WORKFLOW_CONTENT = {
    'W3': { // Custody loss · lost_reason = CSP_CUSTODY_LOST · age-band ₹600
      // v9.0 · W3 pre-step morph on dev-custodied: reframes the banner so the
      // CSP understands they're here to investigate a missing device, not to
      // routinely manage a CUSTODIED stock item.
      'dev-custodied': {
        'dc-banner-title': 'नहीं मिल रहा?',
        'dc-banner-sub': 'अगर NB-00123 आपकी inventory में नहीं है, "मुझे यह डिवाइस नहीं मिल रहा" दबाएं'
      },
      // v9.2 spec-compliance · removed age-band/slab strings from dl-meta-*.
      // Primary view now shows computed amount + settlement timing only.
      // Formula breakdown lives behind the "विवरण देखें" drill-down (Must-Not-Do #12).
      'dev-lost': {
        'dl-banner-title': 'गुम बताया गया है',
        'dl-banner-sub': 'Custody loss · अगले Settlement Cycle में समायोजित',
        'dl-body': 'Device आपकी custody में था — आपकी ज़िम्मेदारी। अगले Settlement Cycle में शामिल किया जाएगा।',
        'dl-amount-label': 'Custody loss देय',
        'dl-amount': '−₹600',
        'dl-meta-label': 'यह राशि',
        'dl-meta-value': 'अगले Settlement Cycle में wallet से समायोजित',
        'dl-formula': 'राशि कैसे तय हुई · विवरण देखें ›',
        'dl-cta': 'डिवाइस मिल गया · वापस करूंगा',
        'dl-cta-hint': '₹600 की liability बनी रहेगी · सिर्फ exposure बंद होगा (late recovery)'
      }
    },
    'W4': { // Customer Non-Recovery · ₹200 flat · partial responsibility
      'dev-lost': {
        'dl-banner-title': 'ग्राहक से वापस नहीं आया',
        'dl-banner-sub': 'Recovery SLA खत्म · आंशिक देय',
        'dl-body': '30 दिन की recovery SLA खत्म हो गई और customer ने NetBox वापस नहीं किया। आंशिक ज़िम्मेदारी।',
        'dl-amount-label': 'Non-recovery देय',
        'dl-amount': '−₹200',
        'dl-meta-label': 'यह राशि',
        'dl-meta-value': 'अगले Settlement Cycle में SD से सीधे समायोजित',
        'dl-formula': 'राशि कैसे तय हुई · विवरण देखें ›',
        'dl-cta': 'Customer ने वापस किया · आगे Wiom को दूंगा',
        'dl-cta-hint': '₹200 की liability बनी रहेगी · ₹50 reward window expire हो चुका'
      }
    },
    'W12': { // Late Recovery · prior LOST · charge stands
      'dev-lost': {
        'dl-banner-title': 'पहले LOST मार्क हुआ था',
        'dl-banner-sub': '₹200 पहले ही दर्ज · late recovery context',
        'dl-body': 'यह device पहले LOST mark हुआ था और ₹200 charge हो चुका है। अब late में मिल गया — exposure बंद होगा पर charge बना रहेगा।',
        'dl-amount-label': 'पहले से दर्ज (बना रहेगा)',
        'dl-amount': '−₹200',
        'dl-meta-label': 'स्थिति',
        'dl-meta-value': 'पहले LOST · अब late recovery (Decision 12)',
        'dl-formula': 'राशि कैसे तय हुई · विवरण देखें ›',
        'dl-cta': 'डिवाइस मिल गया · वापस करूंगा',
        'dl-cta-hint': 'पहले की ₹200 liability नहीं हटेगी'
      },
      'dev-returned': {
        'dr-banner-title': 'Late recovery · वापस आ गया',
        'dr-banner-sub': 'Exposure बंद · पहले की ₹200 charge बनी रहेगी',
        'dr-card-title': 'क्या हुआ',
        'dr-card-body': 'पहले LOST mark था · अब recovery हुई। Exposure तो बंद हो गया, लेकिन ₹200 की liability पहले ही दर्ज है।',
        'dr-finance-title': 'अब क्या होगा',
        'dr-row1-label': 'पहले की liability',
        'dr-row1-value': '−₹200 (बना रहेगा)',
        'dr-row2-label': 'Late recovery reward',
        'dr-row2-value': 'कोई नहीं · window खत्म',
        'dr-footer': 'Decision 12: late recovery exposure बंद करती है, पर पहले की charge नहीं हटाती। ₹50 reward सिर्फ SLA window में।'
      }
    },
    'W5': { // Clean return — no liability
      'dev-returned': {
        'dr-banner-title': 'Wiom को वापस हो गया',
        'dr-banner-sub': 'Exposure कम हुआ — साझेदारी सुरक्षा यथावत',
        'dr-card-title': 'क्या हुआ',
        'dr-card-body': 'NetBox Wiom को लौटाया गया। आपकी custody exposure −1 हुई। कोई liability नहीं।',
        'dr-finance-title': 'अब क्या होगा',
        'dr-row1-label': 'कैरी शुल्क',
        'dr-row1-value': '₹60',
        'dr-row2-label': 'Condition जाँच',
        'dr-row2-value': 'Wiom warehouse में',
        'dr-footer': 'कोई पैसा वापस नहीं आता — return = exposure closure (SD-4)। केवल exit settlement पर SD bank में जाती है।'
      }
    },
    'W7': { // Risk-triggered escalation → sd-topup as the unblock action
      'sd-topup': {
        'sdt-context-title': 'Escalation हटाने के लिए top-up ज़रूरी',
        'sdt-context-sub': 'बकाया देय threshold से ऊपर — नई capacity अभी रुकी हुई'
      }
    },

    // v9.4 · Device-state sub-variants. CUSTODIED (3) and IDLE (4) variants
    // morph the same dev-custodied / dev-idle screens to show different sub-
    // states: fresh / mid / recall-imminent / recall-in-progress. CUSTODIED
    // is always carry-fee-exempt (Decision 9). IDLE accumulates carry fee
    // until system-recall freezes it at the threshold.
    'DSC1': { // CUSTODIED · day 7 · fresh
      'dev-custodied': {
        'dc-banner-title': 'सेट-अप के लिए चुना गया',
        'dc-banner-sub': 'कभी deploy नहीं हुआ · 45 दिन में setup या return करें',
        'dc-recall-label': 'Recall की संभावना',
        'dc-recall-value': '38 दिन बाकी',
        'dc-recall-body': '45 दिन बाद system auto-recall करेगा — कोई carry fee नहीं लगेगा, exposure हटेगी।',
        'dc-action-body': 'सेटअप पूरा करें और customer के पास लगाएं। यह device "कभी deployed नहीं" category में है, इसलिए carry fee नहीं लग रही।',
        'dc-cta-primary': 'Wiom को वापस करना है'
      }
    },
    'DSC2': { // CUSTODIED · day 42 · recall imminent
      'dev-custodied': {
        'dc-banner-title': 'जल्द decision लें',
        'dc-banner-sub': '3 दिन में system auto-recall शुरू कर देगा',
        'dc-recall-label': 'Recall की संभावना',
        'dc-recall-value': '3 दिन बाकी',
        'dc-recall-body': '45 दिन के बाद Wiom अपने आप device वापस ले लेगा। अब भी देरी नहीं — customer के पास लगा सकते हैं।',
        'dc-action-body': 'अगर deploy नहीं कर पा रहे, अभी "Wiom को वापस करना है" दबाएं — recall से पहले clean return बेहतर है।',
        'dc-cta-primary': 'Wiom को वापस करना है'
      }
    },
    'DSC3': { // CUSTODIED · day 47 · recall in progress (system took over)
      'dev-custodied': {
        'dc-banner-title': 'Wiom team device वापस ले रही है',
        'dc-banner-sub': 'System auto-recall शुरू हो गया · आपकी action ज़रूरी नहीं',
        'dc-recall-label': 'Auto-recall status',
        'dc-recall-value': 'चालू है',
        'dc-recall-body': '45 दिन के बाद system ने recall initiate कर दिया। Wiom team पहुँचेगी। कोई carry fee नहीं, कोई liability नहीं — बस handover का इंतज़ार।',
        'dc-action-body': 'Wiom team पहुँचने तक device सुरक्षित रखें। Handover पर exposure बंद हो जाएगी।',
        'dc-cta-primary': 'Wiom team के लिए details देखें'
      }
    },
    'DSI0': { // IDLE · within grace period (parameter value hidden from CSP)
      // v9.7 spec-compliance: removed P_CARRY_FEE_IDLE_DAYS = 7 param leak
      // (Must-Not-Do #10), replaced "Customer churn" + "redeploy" + "IDLE"
      // with Hindi-first phrasing. CSP sees outcome, not codes/state names.
      'dev-idle': {
        'di-banner-title': 'यह नेट बॉक्स अभी-अभी वापस आया है',
        'di-banner-sub': 'थोड़ा समय है · carry fee अभी शुरू नहीं हुई',
        'di-days-pill': '4 दिन बाकी',
        'di-action-body': 'ग्राहक के जाने के बाद आपको थोड़ा समय मिलता है किसी और ग्राहक के पास लगाने का। अगले 4 दिन में लग गया तो कोई carry fee नहीं — उसके बाद रोज़ ₹5 जुड़ने लगेगा।',
        'di-fee-title': 'कैरी फ़ी',
        'di-fee-daily-label': 'अभी',
        'di-fee-daily': '₹0',
        'di-fee-total-label': 'अब तक',
        'di-fee-total': '₹0',
        'di-fee-footnote': '4 दिन बाद रोज़ ₹5 carry fee समायोजित होनी शुरू होगी (अगर तब भी खाली पड़ा हो)'
      }
    },
    'DSI1': { // IDLE · day 1 · just started
      'dev-idle': {
        'di-banner-title': 'यह नेट बॉक्स अभी customer के पास नहीं है',
        'di-banner-sub': 'आज carry fee शुरू हुई · जल्दी redeploy करें',
        'di-days-pill': '1 दिन',
        'di-action-body': 'Customer churn हुआ है। तुरंत किसी नए customer के पास लगाएं — हर दिन ₹5 carry fee समायोजित होती है।',
        'di-fee-title': 'कैरी फ़ी',
        'di-fee-daily': '₹5',
        'di-fee-total': '₹5',
        'di-fee-footnote': 'आज से ₹5 carry fee समायोजित होनी शुरू हुई'
      }
    },
    'DSI2': { // IDLE · day 22 · mid (current default)
      'dev-idle': {
        'di-banner-title': 'यह नेट बॉक्स खाली पड़ा है',
        'di-banner-sub': 'डिप्लॉय करें या Wiom को वापस करें — कैरी फ़ी लग रही है',
        'di-days-pill': '22 दिन',
        'di-action-body': 'इसे जल्दी ग्राहक के पास लगाएं या Wiom को वापस करें। जब तक खाली है, रोज़ कैरी फ़ी लग रही है।',
        'di-fee-title': 'कैरी फ़ी',
        'di-fee-daily': '₹5',
        'di-fee-total': '₹110',
        'di-fee-footnote': 'रोज़ ₹5 carry fee समायोजित हो रहा है'
      }
    },
    'DSI3': { // IDLE · day 40 · recall imminent
      'dev-idle': {
        'di-banner-title': 'जल्द decision लें · recall पास है',
        'di-banner-sub': '5 दिन में system auto-recall · carry fee तब रुक जाएगी',
        'di-days-pill': '40 दिन',
        'di-action-body': 'अब भी देरी नहीं — customer के पास लगा सकते हैं या Wiom को वापस कर सकते हैं। 45 दिन के बाद system अपने आप recall शुरू कर देगा।',
        'di-fee-title': 'कैरी फ़ी',
        'di-fee-daily': '₹5',
        'di-fee-total': '₹200',
        'di-fee-footnote': '5 दिन में ₹25 और जुड़ जाएगा — फिर system recall पर रुक जाएगी'
      }
    },
    'DSI4': { // IDLE · day 47 · recall in progress (carry fee frozen)
      'dev-idle': {
        'di-banner-title': 'Wiom team device वापस ले रही है',
        'di-banner-sub': 'Auto-recall चालू है · carry fee अब और नहीं जुड़ेगी',
        'di-days-pill': 'Recall चालू',
        'di-action-body': '45 दिन के बाद system ने recall initiate कर दिया। Wiom team पहुँचेगी। Carry fee अब रुक गई है — पिछली accumulation settle होगी।',
        'di-fee-title': 'कैरी फ़ी (frozen)',
        'di-fee-daily': '₹0 · रुक गई',
        'di-fee-total': '₹225 (अंतिम)',
        'di-fee-footnote': 'Recall trigger होने पर carry fee accumulation रुक गई'
      }
    }
  };

  // Snapshot original textContent of any element we may mutate, so we can
  // restore the default copy when no workflow override is active.
  const ORIGINAL_CONTENT = {};
  function snapshotOriginal(id) {
    if (ORIGINAL_CONTENT[id] != null) return;
    const el = document.getElementById(id);
    if (el) ORIGINAL_CONTENT[id] = el.textContent;
  }

  function applyWorkflowContent(screenId) {
    // Collect every id that ANY workflow may override on this screen, so we
    // can restore defaults for ids the current workflow doesn't touch.
    const idsForScreen = new Set();
    Object.values(WORKFLOW_CONTENT).forEach(wf => {
      if (wf[screenId]) Object.keys(wf[screenId]).forEach(id => idsForScreen.add(id));
    });
    idsForScreen.forEach(snapshotOriginal);

    const wfMap = currentWorkflow ? WORKFLOW_CONTENT[currentWorkflow] : null;
    const overrides = (wfMap && wfMap[screenId]) || {};

    idsForScreen.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.textContent = (id in overrides) ? overrides[id] : (ORIGINAL_CONTENT[id] || el.textContent);
    });

    // sd-topup: show escalation banner only when W7 supplied context content.
    const sdtBanner = document.getElementById('sdt-context-banner');
    if (sdtBanner) {
      sdtBanner.style.display = (screenId === 'sd-topup' && overrides['sdt-context-title']) ? '' : 'none';
    }
  }

  function setPaymentContext(flow) {
    const ctx = PAYMENT_CONTEXTS[flow] || PAYMENT_CONTEXTS['wallet-topup'];
    // add-funds-method
    const set = (id, val) => { const el = document.getElementById(id); if (el && val != null) el.textContent = val; };
    set('afm-title', ctx.method.title);
    set('afm-hero-label', ctx.method.label);
    set('afm-hero-amount', ctx.method.amount);
    set('afm-hero-sub', ctx.method.sub);
    set('afm-cta', ctx.method.cta);
    // add-funds-input
    set('afi-title', ctx.input.title);
    set('afi-hint', ctx.input.hint);
    set('afi-amount', ctx.input.amount);
    set('afi-cta', ctx.input.cta);
    // add-funds-success
    set('afs-subtitle', ctx.success.subtitle);
    set('afs-balance-label', ctx.success.balLabel);
    set('afs-balance-amount', ctx.success.balAmount);
  }

  function showScreen(id, opts) {
    opts = opts || {};
    if (currentScreen && currentScreen !== id && !opts.fromBack) backStack.push(currentScreen);
    if (backStack.length > 30) backStack.shift();
    currentScreen = id;
    setZoneChipState(chipStateForFlow(currentWorkflow));
    setPaymentContext(paymentContextForFlow(currentWorkflow));
    applyWorkflowContent(id);

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
    setZoneChipState('opportunity');
    setPaymentContext('wallet-topup');
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
    // v8 · workflow-aware step-level tap remap. The same in-phone CTA can
    // route differently depending on which flow is active (e.g. State A's
    // "हाँ" → State B in F1·A but → State C in F1·B/C). Per-step tapRemap on
    // the workflow definition overrides the hardcoded data-tap target.
    if (currentWorkflow) {
      const wf = window.WORKFLOWS[currentWorkflow];
      const currentStep = wf && wf.steps[currentStepIndex];
      if (currentStep && currentStep.tapRemap && currentStep.tapRemap[targetScreen]) {
        targetScreen = currentStep.tapRemap[targetScreen];
      }
      // v8.8 · screen-level tap remap (survives sticky-workflow drift).
      const wfScreenMap = SCREEN_TAP_REMAP[currentWorkflow];
      const screenMap = wfScreenMap && currentScreen && wfScreenMap[currentScreen];
      if (screenMap && screenMap[targetScreen]) {
        targetScreen = screenMap[targetScreen];
      }
    }
    if (maybeAdvanceWorkflow(targetScreen)) return;
    // v8.8 · STICKY workflow on out-of-path tap. Previously we cleared the
    // workflow when a tap landed on a screen not in the step list — which
    // destroyed the content-morph mid-flow (W1 → add-funds-method tapped CTA →
    // add-funds-processing not in W1 → cleared → next success screen reverted
    // to wallet copy). Now the workflow stays sticky so the morph remains
    // applied. Stepper highlight may briefly desync until next on-path tap,
    // which is a fair trade for content correctness. Workflow is only cleared
    // by an explicit rail-item click or another workflow entry.
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
      closeMobileOverlays();
      return;
    }
    const id = item.dataset.screen;
    if (id) {
      clearWorkflow();
      backStack.length = 0;
      currentScreen = null;
      showScreen(id);
      if (history.replaceState) history.replaceState(null, '', '#' + id);
      closeMobileOverlays();
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
  const wfMatch = hash.match(/^(W\d+|F\d+[A-Z]|DS[CI]\d+)-(\d+)$/);
  if (wfMatch && window.WORKFLOWS[wfMatch[1]]) {
    gotoWorkflowStep(wfMatch[1], parseInt(wfMatch[2], 10));
  } else if (hash && document.getElementById('screen-' + hash)) {
    showScreen(hash);
  } else {
    showScreen('nb-home');
  }
})();
