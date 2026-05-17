// Per-screen annotation content. Loaded into the right rail.
// Sources:
//   "PR #222"  → wiom-csp-app-apr09 PR #222 (Saurav-13th-May-wallet-netbox-cases)
//   "DD-state" → netbox-drilldown-states branch
//   "SDA"      → /Users/wiom/Downloads/Net box amendment final/  (8 docs)

window.ANNOTATIONS = {

  'changelog': {
    title: 'Amendment Changelog',
    sub: 'Improvement v4 · 17 May 2026',
    source: 'SDA',
    sections: [
      { crumb: 'What this is',
        anchors: [
          { kind: 'added',
            text: 'Live log of amendments + improvements shipped into the prototype + APK. Each entry: tag · date · summary · source · screens touched.' }
        ]},
      { crumb: 'Improvement v4 · F1 State A → B chain',
        anchors: [
          { kind: 'changed',
            text: '<strong>State A is now the general capacity offer; State B is the specific batch confirmation</strong>. Tapping "हाँ, capacity बढ़ाइए" on A chains forward to B (instead of going straight to home). B reframed as "अंतिम पुष्टि / System आपको ये भेजेगा: 5 नए connections" with the inventory-math card explaining where the devices come from. <span class="src">F1 review · 17 May 2026</span>' },
          { kind: 'policy',
            text: 'Two-step consent: <strong>general intent</strong> ("yes I want to grow") + <strong>specific acknowledgment</strong> ("yes send these 5 connections + use my 7 deployable devices"). Aligns with Wiom\'s trust-first + no-surprises pattern.' },
          { kind: 'policy',
            text: 'Debug picker still lets you land on State B directly for QA — the same screen does both jobs (post-A chain + direct test entry).' }
        ]},
      { crumb: 'Improvement v3 · F1 State B consent',
        anchors: [
          { kind: 'changed',
            text: 'Removed "कोई action ज़रूरी नहीं" framing. Partner must explicitly confirm via primary CTA. (Now superseded by v4 which reframes B entirely as the confirmation step.)' }
        ]},
      { crumb: 'Amendment v2 · Payment §Patch 5',
        anchors: [
          { kind: 'changed',
            text: '<strong>Split waterfall by loss_category.</strong><br/>Was: single waterfall (wallet → payouts → SD) for all liabilities.<br/>Now:<br/>• <strong>Custody loss / damage</strong> (full controllability) → wallet first → SD backstop (unchanged)<br/>• <strong>Non-recovery</strong> (partial controllability) → SD adjustment direct, <em>never</em> touches wallet (new) <span class="src">SD_Amendment_3_Payment §Patch 5</span>' },
          { kind: 'policy',
            text: 'Per SD-3 — controllability determines liability. Different controllability now drives different amounts (Compensation), different settlement paths (this patch), and different severity ordering (custody first).' },
          { kind: 'policy',
            text: 'Rationale: ₹200 non-recovery hitting wallet is disproportionate. SD adjustment is "collateral erosion" — visible in summary, not hidden, but no wallet pain. If SD approaches minimum → top-up escalation (never silent overflow).' }
        ]},
      { crumb: 'Screens updated',
        anchors: [
          { kind: 'changed', text: '<strong>F6 · Settlement Detail</strong> — "कहाँ से" card now shows split rows: Wallet ₹400 (custody) + SD ₹200 (non-recovery). Footnote explains the path.' },
          { kind: 'changed', text: '<strong>F2 · Non-recovery card</strong> — footnote changed to "SD से सीधे समायोजित — wallet पर असर नहीं".' },
          { kind: 'changed', text: '<strong>F4 · SD Profile dues</strong> — footnote now reads "Custody/damage → wallet से। Non-recovery → SD से सीधे।".' },
          { kind: 'changed', text: '<strong>F7 · Escalation</strong> — top-up grace path now triggers in two scenarios (non-recovery SD adjustment OR custody wallet-insufficient).' }
        ]}
    ]
  },

  'zone-capacity': {
    title: 'Zone & Capacity · Drilldown',
    sub: 'NEW v6 · 17 May 2026 · between chip and Capacity बढ़ाएं',
    source: 'SDA',
    sections: [
      { crumb: 'Why this exists (v6)',
        anchors: [
          { kind: 'added', text: 'Assurance Strip chips are metric tiles. Like every other chip (connections, earnings, service status), the Zone & Capacity chip opens a <strong>drilldown</strong> first — not a flow action. The drilldown shows context, then has a CTA into Capacity बढ़ाएं. This matches the Dashboard\'s established pattern.' }
        ]},
      { crumb: 'Content',
        anchors: [
          { kind: 'added', text: '<strong>Hero</strong>: "आप अभी 25 और connections ले सकते हैं" + zone-demand context (Sector 8, growing).' },
          { kind: 'added', text: '<strong>Zone status card</strong>: area, demand trend, Wiom partner count.' },
          { kind: 'added', text: '<strong>Current capacity card</strong>: 51 lifetime → 45 active → 25 available headroom. Shows the math so the "25 खुले" chip number is grounded.' },
          { kind: 'added', text: '<strong>"यह क्यों दिख रहा है" card</strong>: reinforces directive 10 — "Wiom infrastructure manage करता है। आप अपनी service capacity बढ़ाने का फैसला लेते हैं, अपने pace पर।"' },
          { kind: 'added', text: '<strong>CTA</strong>: "Capacity बढ़ाइए" → opens State A (general capacity offer) → State B (final batch confirm) → home with order tracker. Same downstream chain as before.' }
        ]},
      { crumb: 'Where it sits in W2',
        anchors: [
          { kind: 'policy', text: 'W2 stepper now: Dashboard chip → <strong>drilldown (this)</strong> → State A → State B → home tracker. Inserts one read-and-confirm step before the action — partner sees context before committing intent.' }
        ]}
    ]
  },

  'dashboard-home': {
    title: 'Dashboard · Home (Assurance Strip)',
    sub: 'NEW v5 · 17 May 2026 · Capacity entry now lives here',
    source: 'SDA',
    sections: [
      { crumb: 'Why this exists (v5)',
        anchors: [
          { kind: 'added', text: '<strong>Directive 1: Growth ≠ NetBox ordering.</strong> Capacity expansion was previously a tile under NetBox quick-actions, which mentally tied it to hardware ownership. Moved to a 4th "Zone & Capacity" chip in the Assurance Strip — alongside connections / service status / earnings — so the CSP asks to grow <em>business capacity</em>, not buy routers. <span class="src">design review · 17 May 2026</span>' }
        ]},
      { crumb: 'What changed',
        anchors: [
          { kind: 'changed', text: 'Assurance Strip now has 4 chips (was 3): कनेक्शन · सेवा स्थिति · कमाई · <strong>Zone & Capacity</strong>. Tapping the new chip opens "Capacity बढ़ाएं" (State A).' },
          { kind: 'removed', text: 'NetBox home quick-action tile "नया ऑर्डर / Capacity बढ़ाएं" — removed. NetBox is operational-only now (custody · returns · recovery · liabilities · settlement · carry fee).' }
        ]},
      { crumb: 'Mental model the CSP should leave with',
        anchors: [
          { kind: 'policy', text: '"Wiom manages infrastructure. I manage customer service capacity. Security amount maintains operational trust. Settlement happens periodically and predictably." (Directive 10 — the architectural soul of the SD amendment.)' }
        ]}
    ]
  },

  /* ============================================================
     ORDER-SIDE
     ============================================================ */

  'nb-home': {
    title: 'NetBox Home',
    sub: 'Surface 1 · NetBoxHomeScreen.kt',
    source: 'PR #222',
    sections: [
      { crumb: 'What this surface does',
        anchors: [
          { kind: 'unchanged',
            text: 'Landing page for all NetBox actions. Shows fleet count, devices needing attention, and entry tiles for Accept Return / नया ऑर्डर / कई वापस करें.' }
        ]},
      { crumb: 'Tokens applied',
        anchors: [
          { kind: 'unchanged',
            text: 'Header <code>brandSecondary</code>, hero card on <code>bgSurface</code> with radius-large, action tiles use info/positive/brand tint icon circles. heroAmount type for fleet count.' }
        ]},
      { crumb: 'Amendments here',
        anchors: [
          { kind: 'changed',
            text: '<strong>"नया ऑर्डर करें" tile renamed → "Capacity बढ़ाएं"</strong> (Grow Capacity). CSP no longer chooses device quantity; system decides. <span class="src">SDA · Design Note 3</span>' },
          { kind: 'policy',
            text: '<strong>P9 — System-led provisioning.</strong> CSP thinks "business growth" not "hardware order". Removing per-device quantity input is the core UI consequence.' },
          { kind: 'changed',
            text: 'Carry-fee strip on hero card now scoped to <em>was_ever_deployed = true</em>. CUSTODIED-never-deployed devices no longer count toward carry fee.' }
        ]}
    ]
  },

  'request-sheet': {
    title: 'Request New Sheet',
    sub: 'RequestNewSheet.kt (modal, half-height)',
    source: 'PR #222',
    sections: [
      { crumb: 'What this surface does',
        anchors: [
          { kind: 'unchanged',
            text: 'Quantity stepper for new NetBox order. Step size 5, min 5, cap shown as inline error. Hindi: "आपको कितने नेट बॉक्स चाहिए?"' }
        ]},
      { crumb: 'Amendments here',
        anchors: [
          { kind: 'removed',
            text: '<strong>Quantity selector removed.</strong> CSP does not choose device count anymore. Decision Note 2 §3: "Per-device deposit framing is rejected — collateral is relationship-level." <span class="src">SDA · Decision 3</span>' },
          { kind: 'changed',
            text: '<strong>Replaced by "Capacity बढ़ाएं" intent screen</strong> — see new screen in the rail. System computes device count from connection capacity available.' },
          { kind: 'added',
            text: 'New copy on the replacement: <em>"आप अभी 25 और connections ले सकते हैं"</em>. Branching states A–D handle: growth-available, enough-devices, SD-topup-needed, no-capacity.' }
        ]}
    ]
  },

  'low-balance': {
    title: 'Low Balance Dialog',
    sub: 'LowBalanceDialog.kt (modal, 312dp)',
    source: 'PR #222',
    sections: [
      { crumb: 'What this surface does',
        anchors: [
          { kind: 'unchanged',
            text: 'Intercepts submission when <code>orderTotalPaise − walletBalancePaise &gt; 0</code>. Shows 3 bill rows: ऑर्डर राशि / वॉलेट बैलेंस / देय राशि. CTA: "₹{X} पे करें".' }
        ]},
      { crumb: 'Tokens applied',
        anchors: [
          { kind: 'unchanged',
            text: 'Icon badge <code>stateNegative</code> on <code>bgNegative</code>. Dialog radius 24dp. Tone = hard block (negative).' }
        ]},
      { crumb: 'Amendments here',
        anchors: [
          { kind: 'changed',
            text: '<strong>"देय राशि" framing softened in the SD model.</strong> Wallet shortfall is real-time top-up (no SD touch). Copy clarification: differentiate <em>wallet top-up</em> from <em>SD top-up</em>. <span class="src">SDA · Payment Amendment</span>' },
          { kind: 'policy',
            text: '<strong>Waterfall (Workflow 6):</strong> Wallet depletes first → future payouts → SD only as last resort. CSP should never see SD on this dialog. SD is collateral, not operating fund.' },
          { kind: 'changed',
            text: 'If SD-Top-Up is the actual ask, route to dedicated SD Top-Up screen — not this Low-Balance dialog. Two distinct entry points.' }
        ]}
    ]
  },

  'add-funds-input': {
    title: 'Add Funds · Input',
    sub: 'AddFundsFlowScreen.kt step=INPUT',
    source: 'PR #222',
    sections: [
      { crumb: 'What this surface does',
        anchors: [{ kind: 'unchanged', text: 'Amount entry for wallet top-up. Quick chips ₹1,000 / ₹2,000 / ₹5,000. Title: "वॉलेट में पैसे डालें" (normal) or "बकाया चुकाइं" (payoff mode).' }]},
      { crumb: 'Amendments here',
        anchors: [
          { kind: 'unchanged', text: 'Wallet top-up flow itself is unchanged — wallet remains operational layer.' },
          { kind: 'added', text: 'New parallel flow: <strong>SD Top-Up</strong> with title "सुरक्षा राशि में top-up" — distinct from wallet. Different entry, different purpose, different amount calculus.' }
        ]}
    ]
  },

  'add-funds-method': {
    title: 'Add Funds · Method',
    sub: 'AddFundsFlowScreen.kt step=METHOD',
    source: 'PR #222',
    sections: [
      { crumb: 'What this surface does',
        anchors: [{ kind: 'unchanged', text: 'UPI brand list (Google Pay, PhonePe, Other UPI) + Wallets section. CTA: "₹{amount} pay करें". Selected radio uses brandPrimary inner.' }]},
      { crumb: 'Amendments here',
        anchors: [{ kind: 'unchanged', text: 'No change to payment-method UI. Same screen reused for SD top-up — only the upstream context differs.' }]}
    ]
  },

  'add-funds-processing': {
    title: 'Add Funds · Processing',
    sub: 'AddFundsFlowScreen.kt step=PROCESSING',
    source: 'PR #222',
    sections: [
      { crumb: 'What this surface does',
        anchors: [{ kind: 'unchanged', text: '2.5s mock dwell. Back-press locked. Footer info chip on dark surface: "भुगतान पूरा होने तक इस स्क्रीन को बंद न करें".' }]},
      { crumb: 'Amendments here', anchors: [{ kind:'unchanged', text:'No change.'}]}
    ]
  },

  'add-funds-success': {
    title: 'Add Funds · Success',
    sub: 'AddFundsFlowScreen.kt step=SUCCESS',
    source: 'PR #222',
    sections: [
      { crumb: 'What this surface does',
        anchors: [{ kind: 'unchanged', text: '96dp positive icon circle, title "पेमेंट हो गया!", pink balance pill with heroAmount, single OK CTA.' }]},
      { crumb: 'Amendments here',
        anchors: [{ kind: 'added', text: 'For SD top-up the title changes to <em>"Top-up हो गया"</em>, balance pill shows new SD balance, and footer notes "Capacity बढ़ाने की व्यवस्था आगे बढ़ेगी".' }]}
    ]
  },

  'request-success': {
    title: 'Request Success Dialog',
    sub: 'RequestSuccessDialog.kt',
    source: 'PR #222',
    sections: [
      { crumb: 'What this surface does',
        anchors: [{ kind: 'unchanged', text: 'Centered modal confirming "{n} नए नेट बॉक्स की रिक्वेस्ट भेज दी गई है". Dismiss-on-CTA-only.' }]},
      { crumb: 'Amendments here',
        anchors: [{ kind: 'changed', text: 'Copy shifts away from device-count language: <em>"Capacity बढ़ाने की व्यवस्था शुरू हुई"</em>. System decides how many devices to send.' }]}
    ]
  },

  'nb-home-tracking': {
    title: 'NetBox Home · Order in Transit',
    sub: 'NetBoxHomeScreen.kt + OrderTrackerCard.kt',
    source: 'PR #222',
    sections: [
      { crumb: 'What this surface does',
        anchors: [{ kind: 'unchanged', text: '4-stage milestone tracker persisted via OrderTrackerPrefs. Stages: आर्डर दिया → कन्फर्म → निकल गया → पहुंच गया. While in-flight, "नया ऑर्डर" tile is disabled (one order at a time).' }]},
      { crumb: 'Tokens applied',
        anchors: [{ kind: 'unchanged', text: 'Header strip <code>bgInfo</code>. Reached stage circles <code>statePositive</code> 24dp with white check. Connector strokes match stage state.' }]},
      { crumb: 'Amendments here',
        anchors: [{ kind: 'changed', text: 'Summary line below milestones renamed: "5 connections की capacity आ रही है" (not "5 नेट बॉक्स का आर्डर"). CSP\'s mental model shifts from hardware to capacity.' }]}
    ]
  },

  'nb-home-delivered': {
    title: 'NetBox Home · Delivered (CTA stage)',
    sub: 'OrderTrackerCard.kt stage=3',
    source: 'PR #222',
    sections: [
      { crumb: 'What this surface does',
        anchors: [{ kind: 'unchanged', text: 'Pink-tint block replaces milestones. Primary CTA "डिलीवरी कन्फर्म करें" routes to DeliveryConfirmScreen. Inline green check + "{n} नेट बॉक्स का आर्डर पहुंच गया".' }]},
      { crumb: 'Amendments here',
        anchors: [
          { kind: 'changed', text: 'No "credit" framing post-delivery. Per SD-4: <em>"Device return is the absence of a liability, not the presence of a credit"</em>. Confirmation is operational, not financial.' },
          { kind: 'policy', text: 'Receiving devices does NOT bump SD or wallet. SD is relationship collateral, sized to <em>exposure</em>. Receipt = exposure increment without per-device math.' }
        ]}
    ]
  },

  'delivery-confirm': {
    title: 'Delivery Confirm',
    sub: 'DeliveryConfirmScreen.kt',
    source: 'PR #222',
    sections: [
      { crumb: 'What this surface does',
        anchors: [{ kind: 'unchanged', text: 'Router-in-box illustration (180dp), title "{n} नेट बॉक्स की डिलीवरी कन्फर्म करें", 3-col device-ID grid (and देखें/कम देखें expand if &gt;6), sticky animated acknowledge row.' }]},
      { crumb: 'Tokens applied',
        anchors: [{ kind: 'unchanged', text: 'Acknowledge row animates <code>brandTint → brandPrimary</code> on tap (200ms, animateColorAsState). On confirm: 200ms delay, then navigate to DeliveryConfirmedScreen.' }]},
      { crumb: 'Amendments here',
        anchors: [{ kind: 'changed', text: 'Confirmation no longer reads as a financial moment. Copy may add: "इन devices की custody आपके पास आ गई — exposure ज़िम्मेदारी शुरू". CSP gets the mental hand-off without "credit" or "deposit" language.' }]}
    ]
  },

  'delivery-confirmed': {
    title: 'Delivery Confirmed (terminal)',
    sub: 'DeliveryConfirmedScreen.kt',
    source: 'PR #222',
    sections: [
      { crumb: 'What this surface does',
        anchors: [{ kind: 'unchanged', text: 'Animated success ring + check (~750ms). Title (2 lines): "ये सभी नेट बॉक्स\\nअब इस्तेमाल के लिए तैयार हैं". Auto-redirect to HOME after 1500ms. Back disabled.' }]},
      { crumb: 'Amendments here', anchors: [{ kind: 'unchanged', text: 'No change — pure operational ack.' }]}
    ]
  },

  /* ============================================================
     DEVICE STATES
     ============================================================ */

  'dev-deployed': {
    title: 'DEPLOYED',
    sub: 'DeviceDetailScreen.kt · banner banner-positive',
    source: 'DD-state',
    sections: [
      { crumb: 'What this surface does',
        anchors: [{ kind: 'unchanged', text: 'Terminal-stable state. No CTAs. Banner: "ग्राहक के पास चल रहा है" + "कनेक्शन चालू — कोई कैरी फ़ी नहीं". Timeline shows full PENDING_CSP_RECEIPT → CUSTODIED → DEPLOYED history.' }]},
      { crumb: 'Amendments here',
        anchors: [
          { kind: 'added', text: 'New ACS pre-state <strong>PENDING_CSP_RECEIPT</strong> visible in timeline (dispatched but not yet received). 7-day timeout reverts to system. <span class="src">SDA · ACS Patch 6</span>' },
          { kind: 'policy', text: 'P10 — Customer churn risk is system risk (not CSP). When customer leaves, device returns to CSP\'s IDLE pool with no CSP liability for the churn itself.' }
        ]}
    ]
  },

  'dev-idle': {
    title: 'IDLE (with carry fee)',
    sub: 'DeviceDetailScreen.kt · banner banner-caution',
    source: 'DD-state',
    sections: [
      { crumb: 'What this surface does',
        anchors: [{ kind: 'unchanged', text: 'Banner: "यह नेट बॉक्स खाली पड़ा है" / "डिप्लॉय करें या वापस करें — कैरी फ़ी लग रही है". Days chip on guidance card. Cost section shows रोज़ का / अब तक. Two CTAs: वापस करें (primary), स्थिति बताएं (tertiary).' }]},
      { crumb: 'Amendments here',
        anchors: [
          { kind: 'changed', text: 'Carry fee applies only when <em>was_ever_deployed = true</em>. CUSTODIED-never-deployed devices use the new recall path (45-day SLA) instead of fee accrual. <span class="src">SDA · Compensation Amendment</span>' },
          { kind: 'policy', text: 'P_RECOVERY_MAX_WINDOW = 30 days. If this device came back IDLE via customer return, recovery payout window already considered separately.' }
        ]}
    ]
  },

  'dev-custodied': {
    title: 'CUSTODIED',
    sub: 'DeviceDetailScreen.kt · banner banner-caution',
    source: 'DD-state',
    sections: [
      { crumb: 'What this surface does',
        anchors: [{ kind: 'unchanged', text: 'Selected for setup. Banner: "सेट-अप के लिए चुना गया". One CTA: "सेटअप में नहीं लगाना" → moves to IDLE with allowedActions [RETURN, REPORT_CONDITION].' }]},
      { crumb: 'Amendments here',
        anchors: [
          { kind: 'changed', text: 'No carry fee accrual here (never deployed). After <strong>45 days</strong> (P_CUSTODIED_RECALL_DAYS) system auto-issues DEVICE_RECALL_INITIATED. Banner adds countdown copy: <em>"यह device कभी deployed नहीं हुआ। 45 दिन में वापस करें या setup करें."</em>' },
          { kind: 'policy', text: 'Custody-only devices are not idle-fee territory — they\'re inventory-rebalancing territory. Different control loop.' }
        ]}
    ]
  },

  'dev-recovery-pending': {
    title: 'CUSTOMER_RECOVERY_PENDING',
    sub: 'DeviceDetailScreen.kt + PickupExecutorSheet.kt',
    source: 'DD-state',
    sections: [
      { crumb: 'What this surface does',
        anchors: [{ kind: 'unchanged', text: 'Banner: "कस्टमर से वापस लाना है" / "रिकवरी टीम असाइन है". Executor section shows assigned person (self / team member). CTA depends: ASSIGN_PICKUP if none, "मैंने डिवाइस ले लिया" if self.' }]},
      { crumb: 'Amendments here',
        anchors: [
          { kind: 'added', text: '<strong>Recovery SLA timer</strong> visible: "Recovery deadline: XX May". <span class="src">SDA · P_RECOVERY_MAX_WINDOW=30d</span>' },
          { kind: 'added', text: '<strong>Recovery payout ₹50</strong> shown explicitly: <em>"समय पर वापस लाएं — ₹50 reward पाइए"</em>. SLA-gated: only if within 30 days.' },
          { kind: 'policy', text: 'Two-outcome state: success → IDLE + ₹50 reward; SLA-expiry → LOST (flat ₹200, not age-band — see LOST screen). The ₹250 swing creates urgency.' }
        ]}
    ]
  },

  'dev-retrieval-pending': {
    title: 'RETRIEVAL_PENDING',
    sub: 'DeviceDetailScreen.kt · banner banner-info',
    source: 'DD-state',
    sections: [
      { crumb: 'What this surface does',
        anchors: [{ kind: 'unchanged', text: 'Banner: "वापस होने की प्रक्रिया में" / "व्योम पिकअप करेगा — 3 दिन में". CTA: "स्थिति बताएं" (for damage/loss before pickup).' }]},
      { crumb: 'Amendments here',
        anchors: [{ kind: 'unchanged', text: 'No direct change — but RETURNED now decouples from condition classification (see RETURNED).' }]}
    ]
  },

  'dev-returned': {
    title: 'RETURNED',
    sub: 'DeviceDetailScreen.kt · terminal success',
    source: 'DD-state',
    sections: [
      { crumb: 'What this surface does',
        anchors: [{ kind: 'unchanged', text: 'Banner: "व्योम को वापस हो गया" / "जमा राशि सेटलमेंट में वापस होगी". Outcome rows: कैरी शुल्क + नेट बॉक्स वापसी क्रेडिट.' }]},
      { crumb: 'Amendments here',
        anchors: [
          { kind: 'removed', text: '<strong>"नेट बॉक्स वापसी क्रेडिट" row removed</strong>. SD-4: return = exposure closure, not credit. No per-device refund. <span class="src">SDA · Principle SD-4</span>' },
          { kind: 'changed', text: 'Sub copy: <em>"NetBox Wiom को लौटाया गया। Exposure कम हुआ।"</em> (Exposure reduced) — replaces "जमा राशि सेटलमेंट में वापस होगी".' },
          { kind: 'changed', text: 'RETURNED now triggers on <strong>Wiom-authorized handover</strong>, not warehouse receipt. Separate CONDITION_CLASSIFIED step decides if a damage liability arises. <span class="src">SDA · ACS Patch 6</span>' }
        ]}
    ]
  },

  'dev-damaged': {
    title: 'DAMAGED',
    sub: 'DeviceDetailScreen.kt · banner banner-negative',
    source: 'DD-state',
    sections: [
      { crumb: 'What this surface does',
        anchors: [{ kind: 'unchanged', text: 'Banner: "खराब बताया गया है". Outcome row: डैमेज क्लेम ₹1,538. CTA: "नेट बॉक्स सही है" (REVERT_CONDITION → RETRIEVAL_PENDING).' }]},
      { crumb: 'Amendments here',
        anchors: [
          { kind: 'changed', text: 'Damage liability uses <strong>age-band residual</strong>: 0–12 mo = 100%, 12–24 mo = 70%, 24–36 mo = 40%, 36+ mo = floor (~₹300). Device age displayed inline. <span class="src">SDA · Compensation §Patch 1</span>' },
          { kind: 'added', text: 'Footer note: <em>"अगले settlement में शामिल होगा"</em>. No immediate wallet/SD touch — settles at periodic reconciliation (90-day cycle).' },
          { kind: 'added', text: '<strong>"विवाद दर्ज करें"</strong> link if CSP disagrees → routes to dispute form. Settlement excludes disputed items.' }
        ]}
    ]
  },

  'dev-lost': {
    title: 'LOST',
    sub: 'DeviceDetailScreen.kt · banner banner-negative',
    source: 'DD-state',
    sections: [
      { crumb: 'What this surface does',
        anchors: [{ kind: 'unchanged', text: 'Banner: "गुम बताया गया है". Outcome row: नुकसान वसूली ₹3,000 (full device value, pre-amendment). CTA: "नेट बॉक्स खोज गया".' }]},
      { crumb: 'Amendments here',
        anchors: [
          { kind: 'changed', text: '<strong>Two paths split:</strong><br/>• <em>CSP_CUSTODY_LOST</em>: age-band residual (e.g. 28 mo → ₹600)<br/>• <em>NOT_RECOVERED_FROM_CUSTOMER</em>: flat ₹200, age-irrelevant <span class="src">SDA · Decision 3</span>' },
          { kind: 'changed', text: 'Headline amount on this screen drops from ₹3,000 to <strong>₹600</strong> (for a 28-month device) or ₹200 (for non-recovery). Device age shown for transparency when custody loss path applies.' },
          { kind: 'policy', text: 'SD-3 — Liability proportional to controllability. What CSP fully controls = full age-band cost. What CSP partially controls = ₹200 flat.' }
        ]}
    ]
  },

  'dev-writtenoff': {
    title: 'WRITTEN_OFF',
    sub: 'DeviceDetailScreen.kt · terminal',
    source: 'DD-state',
    sections: [
      { crumb: 'What this surface does',
        anchors: [{ kind: 'unchanged', text: 'Banner: "राइट-ऑफ़ हो गया" / "कैप पूरा — अब कोई शुल्क नहीं लगेगा". Outcomes: कैरी शुल्क ₹500 + राइट-ऑफ़ ₹5,000. No CTAs.' }]},
      { crumb: 'Amendments here',
        anchors: [{ kind: 'unchanged', text: 'Terminal state; write-off cap unchanged in concept. Amount uses age-band per Compensation §Patch 1 if applicable.' }]}
    ]
  },

  /* ============================================================
     NEW SCREENS — proposed by amendments
     ============================================================ */

  'growth-intent': {
    title: 'Capacity बढ़ाएं · State A (general capacity offer)',
    sub: 'Happy-path Step 1 — confirm intent → chains to State B',
    source: 'SDA',
    sections: [
      { crumb: 'Why this exists',
        anchors: [
          { kind: 'added', text: 'CSP cannot order devices by quantity anymore. They express <strong>intent to serve more customers</strong>; system computes capacity, devices, and SD top-up needs. <span class="src">SDA · Design Note 3 §Workflow 2</span>' }
        ]},
      { crumb: 'Chain (Improvement v4 · 17 May 2026)',
        anchors: [
          { kind: 'changed', text: 'Primary CTA "हाँ, capacity बढ़ाइए" now <strong>chains forward to State B</strong> (specific batch confirmation), not directly to home. Two-step consent: general intent here → specific batch acknowledgment on B.' }
        ]},
      { crumb: 'Branching states',
        anchors: [
          { kind: 'added', text: '<strong>State A — growth + devices needed.</strong> "System आपकी capacity बढ़ाने की व्यवस्था करेगा"' },
          { kind: 'added', text: '<strong>State B — enough devices on hand.</strong> "आपके पास पर्याप्त devices हैं। System आपको connections भेजेगा।"' },
          { kind: 'added', text: '<strong>State C — SD top-up needed.</strong> "Capacity बढ़ाने के लिए ₹Z top-up ज़रूरी है" → inline top-up flow (Workflow 9)' },
          { kind: 'added', text: '<strong>State D — no capacity available.</strong> "आपके area में अभी और connections उपलब्ध नहीं"' }
        ]},
      { crumb: 'Must-nots',
        anchors: [
          { kind: 'removed', text: 'No device quantity selector. No per-device pricing. No tier labels. No "Order NetBox" button. No "₹200 per device" math anywhere.' }
        ]},
      { crumb: 'Tokens',
        anchors: [
          { kind: 'unchanged', text: 'Hero card: gradient on <code>bgBrandTint → brandTint</code>, brandPrimary accents, <code>heroAmount</code> for the "25 और" number, <code>bodyMd</code> for explainer.' }
        ]}
    ]
  },

  'sd-profile': {
    title: 'सुरक्षा राशि (SD Profile)',
    sub: 'NEW · Profile → Security Deposit',
    source: 'SDA',
    sections: [
      { crumb: 'Why this exists',
        anchors: [
          { kind: 'added', text: 'Single source of truth for the CSP\'s SD balance, minimum, outstanding dues, settlement schedule, and the relationship-collateral framing. Lives in Profile (NOT Home per Design Note 3 — open question D1).' }
        ]},
      { crumb: 'Key invariants applied',
        anchors: [
          { kind: 'policy', text: 'SD-1: One number. No per-device breakdown.' },
          { kind: 'policy', text: 'SD-2: Protected minimum (₹20,000). Cushion bar shows headroom above floor.' },
          { kind: 'policy', text: 'SD-6: Deterministic — all amounts visible, no hidden adjustments.' },
          { kind: 'policy', text: 'SD-7: Language reinforces collateral, not deposit-per-device. "साझेदारी की सुरक्षा" framing.' }
        ]},
      { crumb: 'Tokens',
        anchors: [
          { kind: 'unchanged', text: 'Hero card on <code>brandSecondary</code> dark surface (only screen with dark hero). heroAmount type. Cushion bar uses brand-tint stripe.' }
        ]}
    ]
  },

  'sd-topup': {
    title: 'सुरक्षा राशि में top-up',
    sub: 'NEW · separate from wallet top-up',
    source: 'SDA',
    sections: [
      { crumb: 'Why this exists',
        anchors: [
          { kind: 'added', text: 'SD top-up has a different purpose than wallet top-up: it unlocks <strong>new capacity</strong>, not "money to spend". Different framing, different entry, different copy. <span class="src">SDA · Decision 8</span>' }
        ]},
      { crumb: 'Copy guardrails',
        anchors: [
          { kind: 'policy', text: 'Must clarify <em>"मौजूदा devices और connections पर कोई असर नहीं"</em> — top-up is only for new capacity, never to "fix" existing operations.' },
          { kind: 'added', text: 'Required line: <em>"Top-up होने के बाद capacity बढ़ाने की व्यवस्था आगे बढ़ेगी"</em> — sets the next-step expectation.' }
        ]}
    ]
  },

  'settlement-detail': {
    title: 'Settlement Detail',
    sub: 'NEW · periodic reconciliation result (Amendment v2 split-waterfall applied)',
    source: 'SDA',
    sections: [
      { crumb: 'Why this exists',
        anchors: [
          { kind: 'added', text: 'Every 90 days (P_RECON_CYCLE_DAYS) the system reconciles outstanding liabilities. This screen is the CSP\'s itemised receipt. <span class="src">SDA · Payment Amendment</span>' }
        ]},
      { crumb: 'Split waterfall (Amendment v2 · 17 May 2026)',
        anchors: [
          { kind: 'changed', text: '<strong>Source rows now split by loss_category:</strong><br/>• "Wallet से · custody loss/damage" — full-controllability liabilities<br/>• "सुरक्षा राशि से · non-recovery" — partial-controllability, SD direct adjustment<br/>Footnote: "Wallet ने custody loss पकड़ा। Non-recovery सीधे SD से समायोजित — wallet पर असर नहीं।" <span class="src">SD_Amendment_3_Payment §Patch 5</span>' }
        ]},
      { crumb: 'Dispute window',
        anchors: [
          { kind: 'added', text: '7-day post-settlement dispute window (P_RECON_DISPUTE_WINDOW_DAYS). Warning chip and dedicated CTA "विवाद दर्ज करें".' }
        ]}
    ]
  },

  'escalation-notice': {
    title: 'Escalation Notice',
    sub: 'NEW · risk-triggered provisioning freeze',
    source: 'SDA',
    sections: [
      { crumb: 'Why this exists',
        anchors: [
          { kind: 'added', text: 'When unresolved liabilities exceed MAX(₹5,000, MIN(50% of SD, ₹10,000)), system freezes new device provisioning. This screen explains <em>what is and isn\'t affected</em> — connections continue, only new capacity is paused. <span class="src">SDA · Workflow 7</span>' }
        ]},
      { crumb: 'No-blame framing',
        anchors: [
          { kind: 'policy', text: 'Wiom-way: never accusatory. Title is factual ("रोक दिया गया"), not punitive. Two clear paths offered (top-up / early settlement). 15-day grace before any SD touch.' }
        ]}
    ]
  },

  'dispute-form': {
    title: 'विवाद दर्ज करें',
    sub: 'NEW · safety valve on any liability',
    source: 'SDA',
    sections: [
      { crumb: 'Why this exists',
        anchors: [
          { kind: 'added', text: 'CSP can challenge any liability before or after settlement. Disputed items are excluded from the batch — one dispute doesn\'t freeze everything else. <span class="src">SDA · Decision 16</span>' }
        ]},
      { crumb: 'Structured reasons',
        anchors: [
          { kind: 'added', text: 'Radio list, not free-text: <em>Device वापस मिल गया / गलत device ID / Condition की गलत classification / कुछ और</em>. Forces clean ops triage.' }
        ]},
      { crumb: 'Promise',
        anchors: [
          { kind: 'added', text: '7-day resolution window. Decision: <em>"विवाद दर्ज होगा। Settlement से अलग रहेगा।"</em>' }
        ]}
    ]
  },

  'exit-settlement': {
    title: 'Exit Settlement (final reconciliation)',
    sub: 'NEW · only moment SD flows back',
    source: 'SDA',
    sections: [
      { crumb: 'Why this exists',
        anchors: [
          { kind: 'added', text: 'Partnership end is the <strong>only</strong> moment SD money flows back. SD-1: collateral settles at partnership end or scheduled reconciliation. Periodic recon adjusts; exit reconciles. <span class="src">SDA · ESR Amendment</span>' }
        ]},
      { crumb: 'No surprises',
        anchors: [
          { kind: 'policy', text: 'Exit settlement is a reconciliation of known quantities, not a revelation. Every line item on this screen should already be visible in the CSP\'s SD Profile + dues throughout tenure. <span class="src">SDA · Principle: "No surprises at exit"</span>' }
        ]},
      { crumb: 'Tokens',
        anchors: [
          { kind: 'unchanged', text: 'Hero card on brandSecondary dark (final/ceremonial framing). Body uses standard token vocabulary; no special exit theme.' }
        ]}
    ]
  }
};
