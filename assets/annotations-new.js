// Annotations for the new Design Note 3 workflow screens.
// Merged into window.ANNOTATIONS at load.

Object.assign(window.ANNOTATIONS, {

  'onboarding-prompt': {
    title: 'SD at Onboarding · Prompt',
    sub: 'UPDATED v8.6 · W1 steps 1+2',
    source: 'SDA',
    sections: [
      { crumb: 'Why this exists',
        anchors: [
          { kind: 'added', text: 'Backend event CSP_REGISTERED fires after onboarding. Next time the CSP opens the app this screen is the blocker — system asks for ₹20,000 (P_SD_ABSOLUTE_MINIMUM). One-time साझेदारी deposit, never per-device. <span class="src">SDA · Workflow 1</span>' }
        ]},
      { crumb: 'Copy rules',
        anchors: [
          { kind: 'policy', text: '<strong>Required spec line:</strong> "Wiom साझेदारी शुरू करने के लिए ₹20,000 सुरक्षा राशि जमा करें · एक बार जमा करनी है". No per-device language anywhere. <span class="src">Note 3 §W1</span>' },
          { kind: 'policy', text: 'Three reassurance bullets explain what happens next — SD safe & returnable, Settlement Cycle pe transparent हिसाब, क्षमता बढ़ाने का अनुरोध unlocked. Framed as <em>साझेदारी onboarding</em>, not a transaction fee.' },
          { kind: 'changed', text: '<strong>v8.6 Hindi-first sweep:</strong> Latin → Devanagari · partnership → <strong>साझेदारी</strong>, devices → <strong>डिवाइस</strong>, Capacity बढ़ाने की request → <strong>क्षमता बढ़ाने का अनुरोध</strong>, "Settlement पर settlement" → "Settlement Cycle पर हिसाब".' }
        ]}
    ]
  },

  'onboarding-success': {
    title: 'SD at Onboarding · Success',
    sub: 'UPDATED v8.6 · W1 step 4',
    source: 'SDA',
    sections: [
      { crumb: 'Why this exists',
        anchors: [
          { kind: 'added', text: 'Confirmation that SECURITY_PAID is recorded in Payment OS. Sets next-step expectation: "अब आप अपनी सेवा क्षमता बढ़ाने का अनुरोध कर सकते हैं" → bridges into F1 State A.' }
        ]},
      { crumb: 'Tone',
        anchors: [
          { kind: 'policy', text: 'Quiet ceremony — Wiom-way doesn\'t over-celebrate financial events. Shield icon (not party emoji), pink balance pill ₹20,000, single forward CTA "क्षमता बढ़ाएं".' },
          { kind: 'changed', text: '<strong>v8.6 Hindi-first sweep:</strong> "अपनी service capacity बढ़ाने के लिए कह सकते हैं" → "अपनी सेवा क्षमता बढ़ाने का अनुरोध कर सकते हैं". CTA "Capacity बढ़ाएं" → "क्षमता बढ़ाएं".' }
        ]}
    ]
  },

  'growth-intent-B': {
    title: 'Capacity · State B (final confirmation)',
    sub: 'Happy-path Step 2 · reframed in Improvement v4',
    source: 'SDA',
    sections: [
      { crumb: 'What this state says now (v4)',
        anchors: [
          { kind: 'changed', text: '<strong>"अंतिम पुष्टि / System आपको ये भेजेगा: 5 नए connections — आपके area में route होंगे।"</strong> Inventory math card shows where the devices come from (7 deployable in hand → 0 to ship). Primary CTA: "हाँ, पुष्टि करें" → order placed → home with tracker. <span class="src">Improvement v4 · 17 May 2026</span>' },
          { kind: 'removed', text: 'Was: "आपके पास पर्याप्त devices हैं। System आपको connections भेजेगा।" with no CTA — superseded because it conflated "no new shipping" with "no consent needed".' }
        ]},
      { crumb: 'Two-step consent rationale',
        anchors: [
          { kind: 'policy', text: 'State A = <em>general intent</em> ("yes I want to grow"). State B = <em>specific acknowledgment</em> ("yes send these 5 connections + use my 7 deployable devices"). Both required because capacity acceptance = exposure acceptance.' },
          { kind: 'policy', text: 'When no shipping is needed (current example), the inventory math card explicitly says so — "नए NetBox shipping की ज़रूरत नहीं" — so the partner understands why the batch can start immediately.' }
        ]},
      { crumb: 'Debug-test path',
        anchors: [
          { kind: 'unchanged', text: 'Setting "Growth Intent state" to B in debug lands you directly on this screen (skipping A) — useful for QA. The screen does both jobs: post-A chain + standalone test entry.' }
        ]}
    ]
  },

  'growth-intent-C': {
    title: 'Capacity · State C (batch + inline top-up)',
    sub: 'UPDATED v8.2 · combined State-B-style batch + State-C top-up',
    source: 'SDA',
    sections: [
      { crumb: 'Why this shape (v8.2)',
        anchors: [
          { kind: 'added', text: '<strong>v8.2: Batch breakdown added inside State C.</strong> Previously F1·B/C jumped from "25 capacity offered" to "₹2,000 top-up" without showing how many connections the ₹2,000 actually buys. Now the screen mirrors State B at the top: "System आपको ये भेजेगा · 5 नए connections" + Devices breakdown (custody 82 / deploy-ready 7), THEN pivots to top-up math. CSP perceives a concrete value exchange, not an abstract toll booth.' }
        ]},
      { crumb: 'Section order',
        anchors: [
          { kind: 'added', text: '1. <strong>Batch hero (v8.2)</strong>: green "अंतिम पुष्टि · 5 नए connections" — same as State B.' },
          { kind: 'changed', text: '2. <strong>Devices card (v8.3 corrected)</strong>: shipping-not-stock math. Custody 82 (all deployed) · Deploy-ready 0 · Wiom से आ रहे +5 · post-top-up custody 87. Tells the right story: SD-low only applies when system has to ship new devices.' },
          { kind: 'changed', text: '3. <strong>Pivot banner (v8.3)</strong>: "5 नए devices custody में आ रहे हैं · इसलिए ₹2,000 top-up ज़रूरी" — explicit causal link from incoming devices to SD movement.' },
          { kind: 'unchanged', text: '4. <strong>Top-up math card</strong>: current ₹20k + needed ₹2k = top-up ₹2k.' },
          { kind: 'unchanged', text: '5. <strong>Reassurance</strong>: "मौजूदा connections और custody पर कोई असर नहीं।"' }
        ]},
      { crumb: 'Why shipping-not-stock (v8.3)',
        anchors: [
          { kind: 'policy', text: '<strong>SD scales with custody, not with connections.</strong> If CSP already had idle deploy-ready devices in custody, the existing SD already covers them — no top-up needed. State C only makes sense when system must SHIP new devices, which raises custody exposure. Using State B\'s 7-deploy-ready math here was a copy-paste bug that broke the causal logic.' }
        ]},
      { crumb: 'CTA semantics',
        anchors: [
          { kind: 'changed', text: '<strong>v8.2: CTA reframed</strong> from "₹2,000 जमा करें" → "हाँ, ₹2,000 जमा करें" + secondary "अभी नहीं". The "हाँ" matches State A\'s acknowledgment pattern, conveying both batch consent and payment in a single tap. Direct to payment method picker per Design Note 3 Must-Do #8 ("Inline SD top-up. Don\'t break flow.").' }
        ]},
      { crumb: 'Spec citation',
        anchors: [
          { kind: 'policy', text: '<strong>Reassurance line is mandatory:</strong> "मौजूदा devices और connections पर कोई असर नहीं।" Prevents panic — top-up is only for new capacity. <span class="src">Note 3 §Must Do #8 + Surface 2 State C + Workflow 2 step 5b</span>' }
        ]}
    ]
  },

  'growth-intent-D': {
    title: 'Capacity · State D (no capacity in area)',
    sub: 'NEW · Growth Intent variant',
    source: 'SDA',
    sections: [
      { crumb: 'What this state says',
        anchors: [
          { kind: 'added', text: '"आपके area में अभी और connections उपलब्ध नहीं" — zone at capacity. CSP waits. System will notify when demand opens. No CTA. <span class="src">Note 3 §Surface 2 · State D</span>' }
        ]},
      { crumb: 'Reinforcement',
        anchors: [
          { kind: 'policy', text: 'Lists "क्या चालू है" so CSP doesn\'t mistake this for a freeze. Existing 82 connections continue normally.' }
        ]}
    ]
  },

  'growth-intent-blocked': {
    title: 'Capacity · Blocked (one-reason)',
    sub: 'NEW · Growth Intent variant',
    source: 'SDA',
    sections: [
      { crumb: 'What this state says',
        anchors: [
          { kind: 'added', text: 'One reason out of five possible constraints: <em>deployment efficiency</em> / SD top-up / enforcement restriction / quality / zone. Highest-priority constraint surfaces; others stay hidden. <span class="src">Note 3 §Workflow 2 + Must Do #7</span>' }
        ]},
      { crumb: 'Why one reason only',
        anchors: [
          { kind: 'policy', text: 'Decision 14: actionability beats completeness. 5 simultaneous constraints overwhelm; 1 actionable reason resolves. Other constraints surface as they become primary blockers.' }
        ]}
    ]
  },

  'loss-card-custody': {
    title: 'Wallet · Custody Loss Card',
    sub: 'NEW · Surface 3 (custody variant)',
    source: 'SDA',
    sections: [
      { crumb: 'Why this exists',
        anchors: [
          { kind: 'added', text: 'Appears in wallet transaction feed when a CSP_CUSTODY_LOST event fires. Shows age-band liability (28-month example = ₹600). Device age <em>is</em> shown — audit transparency. <span class="src">Note 3 §Surface 3 (custody variant)</span>' }
        ]},
      { crumb: 'Differentiated from non-recovery',
        anchors: [
          { kind: 'policy', text: 'Title: <strong>"custody loss"</strong> not "not recovered". Copy: "Device आपकी custody में था — आपकी ज़िम्मेदारी" makes responsibility explicit. Higher amount, full controllability.' },
          { kind: 'policy', text: 'Says <em>"देय"</em> (due) not <em>"काटा"</em> (deducted) — liability recorded, not settled yet. <span class="src">SD-7 + Must Not #3</span>' }
        ]},
      { crumb: 'What NOT to show',
        anchors: [
          { kind: 'removed', text: 'No SD balance change. SD doesn\'t move on loss events — only at reconciliation. <span class="src">Must Not #5</span>' }
        ]}
    ]
  },

  'loss-card-norecovery': {
    title: 'Wallet · Non-Recovery Card',
    sub: 'NEW · Surface 3 (non-recovery variant)',
    source: 'SDA',
    sections: [
      { crumb: 'Why this exists',
        anchors: [
          { kind: 'added', text: 'Appears when NOT_RECOVERED_FROM_CUSTOMER fires after SLA expiry. Flat ₹200, no device age line (age irrelevant for non-recovery). <span class="src">Note 3 §Surface 3 (non-recovery variant)</span>' }
        ]},
      { crumb: 'Tone vs custody',
        anchors: [
          { kind: 'policy', text: 'Copy: "ग्राहक ने NetBox recovery SLA में वापस नहीं किया। <strong>आंशिक देय</strong>." Communicates partial responsibility — customer-driven, not CSP-negligent. Lower amount.' },
          { kind: 'changed', text: 'Border accent: caution (orange) not negative (red). Differentiation cue at a glance.' }
        ]}
    ]
  },

  'recovery-success': {
    title: 'Recovery Success · +₹50 Reward',
    sub: 'NEW · Workflow 4 step 3a',
    source: 'SDA',
    sections: [
      { crumb: 'Why this exists',
        anchors: [
          { kind: 'added', text: 'CSP recovered device within P_RECOVERY_MAX_WINDOW = 30 days. COMP_RECOVERY_PAYOUT_ISSUED fires; ₹50 credited to wallet immediately (real-time, not batched). Device → IDLE. <span class="src">SDA · Workflow 4 step 3a</span>' }
        ]},
      { crumb: 'The ₹250 swing',
        anchors: [
          { kind: 'policy', text: 'Recovery within SLA: +₹50 reward.<br/>Recovery after SLA: ₹0 reward + ₹200 charge stands.<br/>Total swing = ₹250 — the lever that creates SLA urgency without coercion.' }
        ]},
      { crumb: 'No-blame framing',
        anchors: [
          { kind: 'policy', text: 'No mention of what would have happened on failure. Pure positive reinforcement. Wiom-way: reward what worked, don\'t threaten what didn\'t.' }
        ]}
    ]
  },

  'dispute-pending': {
    title: 'Dispute · Under Review',
    sub: 'NEW · Workflow 10 steps 3–4',
    source: 'SDA',
    sections: [
      { crumb: 'Why this exists',
        anchors: [
          { kind: 'added', text: 'After CSP raises a dispute, the liability is tagged DISPUTED_PENDING_REVIEW. Excluded from upcoming reconciliation batch. Liability amount struck-through but not removed (audit trail). <span class="src">Note 3 §Workflow 10</span>' }
        ]},
      { crumb: 'Visible promise',
        anchors: [
          { kind: 'added', text: '"Settlement में शामिल नहीं होगा जब तक समीक्षा पूरी न हो।" Plus a 7-day decision deadline shown as future timeline dot.' }
        ]},
      { crumb: 'Ledger immutability',
        anchors: [
          { kind: 'policy', text: 'If dispute is accepted later, a forward correction entry generates in the next reconciliation. Past settlements are never silently rewritten — additive corrections only. <span class="src">Note 3 §Workflow 10 Correction principle</span>' }
        ]}
    ]
  },

  'legacy-above': {
    title: 'Legacy CSP · Case A (above minimum)',
    sub: 'NEW · Workflow 11 Case A',
    source: 'SDA',
    sections: [
      { crumb: 'Why this exists',
        anchors: [
          { kind: 'added', text: 'Pre-system CSP opens SD surface for the first time after migration. Has ₹25,000 (above the new ₹20,000 minimum). Normal view, full capacity expansion available. <span class="src">Note 3 §Workflow 11 Case A</span>' }
        ]},
      { crumb: 'Explainer sentence',
        anchors: [
          { kind: 'policy', text: 'First-time view must include the custody-risk explainer: "यह सुरक्षा राशि Wiom के devices की custody risk के लिए रखी जाती है। Settlement तय cycle या partnership बंद होने पर होता है।" Sets correct mental model immediately. <span class="src">Note 3 §Surface 1 design rules</span>' }
        ]}
    ]
  },

  'legacy-below': {
    title: 'Legacy CSP · Case B (below minimum)',
    sub: 'NEW · Workflow 11 Case B',
    source: 'SDA',
    sections: [
      { crumb: 'Why this exists',
        anchors: [
          { kind: 'added', text: 'Pre-system CSP has ₹12,000 (below new ₹20,000 floor). Shows shortfall ₹8,000 but does NOT force top-up. Existing ops continue. Only new capacity is gated. <span class="src">Note 3 §Workflow 11 Case B</span>' }
        ]},
      { crumb: 'The anti-panic line',
        anchors: [
          { kind: 'policy', text: '<strong>Critical for migration:</strong> "मौजूदा devices और connections पर कोई असर नहीं। सिर्फ capacity बढ़ाने के लिए top-up चाहिए।" Without this line, CSPs assume their operations are at risk and may exit. <span class="src">Note 3 §Workflow 11 critical</span>' }
        ]},
      { crumb: 'OPENING_SECURITY_BALANCE',
        anchors: [
          { kind: 'policy', text: 'Backend records ₹12,000 as the migrated opening balance — no forced reset. Natural top-up happens when CSP wants to grow. <span class="src">SDA · Decision 11</span>' }
        ]}
    ]
  },

  'late-recovery-card': {
    title: 'Late Recovery Card',
    sub: 'NEW · Workflow 12',
    source: 'SDA',
    sections: [
      { crumb: 'Why this exists',
        anchors: [
          { kind: 'added', text: 'Device was LOST (non-recovery, ₹200 charged) and was later found by CSP or Wiom. ACS: LOST → RETURNED via late path. Exposure closes; charge stands; no reward. <span class="src">Note 3 §Workflow 12</span>' }
        ]},
      { crumb: 'What CSP gets',
        anchors: [
          { kind: 'changed', text: '<strong>Exposure closure only.</strong> ₹200 non-recovery charge stays (SLA had expired). ₹50 payout window already closed. Card explains both lines explicitly so CSP isn\'t surprised.' }
        ]},
      { crumb: 'Custody not redeployable',
        anchors: [
          { kind: 'policy', text: 'Critical rule: CSP cannot directly redeploy a late-recovered device. ACS must explicitly reassign after reconciliation. Prevents custody-truth breakage. <span class="src">Note 3 §Workflow 12 critical rule</span>' }
        ]},
      { crumb: 'Exception',
        anchors: [
          { kind: 'policy', text: 'If charge was custody-loss (₹600 not ₹200) and device is recovered functional, correction entry reverses the charge at next reconciliation. The asset was recovered — the loss never crystallized. <span class="src">Decision 12 exception</span>' }
        ]}
    ]
  }
});
