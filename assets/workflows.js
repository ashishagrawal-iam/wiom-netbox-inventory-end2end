// 12 workflows from SD_Design_Note_3.md Part A.
// Each workflow is an ordered sequence of step → screen mappings.

window.WORKFLOWS = {

  W1: {
    title: 'SD at Onboarding',
    purpose: 'CSP completes onboarding → pays ₹20,000 → SD active → capacity expansion eligible.',
    steps: [
      { num: 1, label: 'CSP approved', screen: 'onboarding-prompt',
        note: 'CSP_REGISTERED fires. System shows the ₹20,000 (P_SD_ABSOLUTE_MINIMUM) requirement. Framed as one-time, partnership-level — no per-device math.' },
      { num: 2, label: 'See requirement', screen: 'onboarding-prompt',
        note: '"Wiom partnership शुरू करने के लिए ₹20,000 सुरक्षा राशि जमा करें" — single CTA, no tier choice.' },
      { num: 3, label: 'Pay UPI', screen: 'add-funds-method',
        note: 'Reuse existing UPI method screen — SECURITY_PAID is recorded in Payment OS.' },
      { num: 4, label: 'SD active', screen: 'onboarding-success',
        note: 'Confirmation: "सुरक्षा राशि जमा हो गई। अब आप capacity बढ़ाने की request कर सकते हैं।" Balance now ₹20,000.' },
      { num: 5, label: 'Capacity unlocked', screen: 'growth-intent',
        note: 'Capacity expansion eligibility becomes active. CSP can now express growth intent.' }
    ]
  },

  W2: {
    title: 'System-Led Device Provisioning (Growth Intent)',
    purpose: 'CSP wants to serve more customers. System surfaces capacity, CSP confirms in two steps (general intent → specific batch), then system manages provisioning. CSP never picks device count and never feels they\'re buying routers.',
    steps: [
      { num: 1, label: 'Zone & Capacity chip on Home', screen: 'dashboard-home',
        note: 'v5 entry. Assurance Strip 4th chip ("Zone & Capacity · 25 खुले") is the natural entry — Growth ≠ NetBox ordering (directive 1). Tap chip → Capacity बढ़ाएं (State A).' },
      { num: 2, label: 'State A · capacity offer', screen: 'growth-intent',
        note: 'Happy-path Step 1. System surfaces "you can take 25 more connections" and asks for general intent. CSP confirms by tapping "हाँ, capacity बढ़ाइए" → chains forward to State B (specific batch).' },
      { num: 3, label: 'State B · final confirm', screen: 'growth-intent-B',
        note: 'Happy-path Step 2 (Improvement v4 · 17 May). Specific batch confirmation — "System आपको ये भेजेगा: 5 नए connections". Inventory math card shows where the devices come from (7 deployable in hand → 0 to ship). CSP taps "हाँ, पुष्टि करें" → order placed → home with tracker.' },
      { num: 4, label: 'Devices route / ship', screen: 'nb-home-tracking',
        note: 'Order tracker appears at top of NetBox home. Inventory dispatches → ACS creates PENDING_CSP_RECEIPT (when shipping is needed) or routing starts immediately (when devices are already on hand).' },
      { num: 5, label: 'Alt · State C SD top-up', screen: 'growth-intent-C',
        note: 'Alternate path if SD insufficient for the proposed exposure. Inline top-up flow, framed as capacity expansion cost — partner pays ₹2,000 then re-enters State A.' },
      { num: 6, label: 'Alt · State D no capacity', screen: 'growth-intent-D',
        note: 'Alternate path if zone is at capacity. Info-only — CSP waits, system notifies when demand opens. No CTA.' },
      { num: 7, label: 'Alt · Blocked one-reason', screen: 'growth-intent-blocked',
        note: 'Alternate path if a constraint fails (deployment efficiency, enforcement, etc.). System surfaces ONE highest-priority reason — never the 5-constraint formula.' }
    ]
  },

  W3: {
    title: 'Device Loss — Custody Loss',
    purpose: 'Device disappears from CSP\'s possession (office/transport/shelf). Age-band liability.',
    steps: [
      { num: 1, label: 'Device → LOST', screen: 'dev-lost',
        note: 'ACS marks the device LOST with <code>lost_reason=CSP_CUSTODY_LOST</code>. Carries device_commissioned_at + loss_detected_at.' },
      { num: 2, label: 'Age-band computed', screen: 'dev-lost',
        note: 'Compensation OS: 28-month device → 40% × ₹1,500 = ₹600. CSP sees the amount, not the formula.' },
      { num: 3, label: 'Wallet card appears', screen: 'loss-card-custody',
        note: 'Wallet feed card: "NetBox custody loss · ₹600 · Device आपकी custody में था". Shown immediately; SD untouched.' },
      { num: 4, label: 'Awaits reconciliation', screen: 'sd-profile',
        note: 'Liability sits in बकाया देय with next-settlement date. No real-time SD mutation.' },
      { num: 5, label: 'Settled', screen: 'settlement-detail',
        note: 'At reconciliation: wallet first → SD only if wallet insufficient → escalation if SD at minimum.' }
    ]
  },

  W4: {
    title: 'Device Loss — Customer Non-Recovery',
    purpose: 'Customer churns. Device at customer\'s house. 30-day recovery SLA. ₹250 swing.',
    steps: [
      { num: 1, label: 'Customer churn', screen: 'dev-recovery-pending',
        note: 'ACS: DEPLOYED → CUSTOMER_RECOVERY_PENDING. Pickup task created. Recovery SLA timer starts (30 days).' },
      { num: 2, label: 'CSP attempts pickup', screen: 'dev-recovery-pending',
        note: 'CSP can assign self or team. Banner shows recovery deadline visibly.' },
      { num: 3, label: 'Path 3a · recovered in SLA', screen: 'recovery-success',
        note: '+₹50 recovery payout (real-time wallet credit, COMP_RECOVERY_PAYOUT_ISSUED). Device → IDLE. No loss charge.' },
      { num: 4, label: 'Path 3b · SLA expires', screen: 'dev-lost',
        note: 'ACS: CUSTOMER_RECOVERY_PENDING → LOST with lost_reason=NOT_RECOVERED_FROM_CUSTOMER. ₹50 payout window closed permanently.' },
      { num: 5, label: 'Flat ₹200 liability', screen: 'loss-card-norecovery',
        note: 'Compensation OS: flat ₹200 (age-irrelevant). Wallet card shows the difference: partial responsibility, no device-age line.' },
      { num: 6, label: 'Awaits reconciliation', screen: 'sd-profile',
        note: 'Liability sits in बकाया देय. ₹250 swing (₹50 reward vs ₹200 loss) is the urgency lever for timely recovery.' }
    ]
  },

  W5: {
    title: 'Device Return to Wiom',
    purpose: 'CSP returns excess device. Exposure closes on Wiom-authorized handover. Condition classified separately.',
    steps: [
      { num: 1, label: 'Return requested', screen: 'dev-idle',
        note: 'System requests return or CSP initiates (e.g. from IDLE state). DEVICE_RETURN task created.' },
      { num: 2, label: 'CSP declares intent', screen: 'dev-retrieval-pending',
        note: 'State: RETRIEVAL_PENDING. Exposure CONTINUES — declaration is not handover.' },
      { num: 3, label: 'Wiom-authorized handover', screen: 'dev-returned',
        note: 'Field team pickup or logistics receipt. ACS: RETURNED. Exposure closes. No money moves. Device count updates.' },
      { num: 4, label: 'SD screen updates', screen: 'sd-profile',
        note: '"आपके पास devices: 84 | Wiom को लौटाए: 16". No "₹200 returned" or credit framing. SD-4 in action.' },
      { num: 5, label: 'Warehouse classifies', screen: 'dev-damaged',
        note: 'CONDITION_CLASSIFIED happens at warehouse — FUNCTIONAL (clean) or DAMAGED (separate liability generated, not part of return).' }
    ]
  },

  W6: {
    title: 'Scheduled Reconciliation',
    purpose: 'Quarterly settlement (P_RECON_CYCLE_DAYS = 90). Wallet → future payouts → SD waterfall.',
    steps: [
      { num: 1, label: 'Pre-reconciliation', screen: 'sd-profile',
        note: 'CSP sees outstanding dues + next settlement date throughout the quarter. "बकाया देय: ₹600 | अगला settlement: 1 Jul 2026".' },
      { num: 2, label: 'Reconciliation fires', screen: 'settlement-detail',
        note: 'Push notification: "Settlement पूरा हुआ". Itemized waterfall shown — what was owed, where it came from, SD status after.' },
      { num: 3, label: 'Dispute window', screen: 'dispute-form',
        note: '7-day post-settlement dispute window (P_RECON_DISPUTE_WINDOW_DAYS). Disputed items excluded from batch; corrections go to next cycle.' }
    ]
  },

  W7: {
    title: 'Risk-Triggered Escalation',
    purpose: 'Unresolved dues exceed MAX(₹5k, MIN(50%·SD, ₹10k)) → freeze new provisioning, force early reconciliation.',
    steps: [
      { num: 1, label: 'Threshold breached', screen: 'escalation-notice',
        note: 'Push + in-app notice. Existing connections unaffected. Only NEW capacity is frozen — explicit "क्या चालू है / क्या रुका" framing.' },
      { num: 2, label: 'Top-up grace', screen: 'sd-topup',
        note: 'CSP gets 15-day grace (P_TOPUP_GRACE_DAYS) to top up wallet or SD before any SD breach.' },
      { num: 3, label: 'Settlement triggered', screen: 'settlement-detail',
        note: 'Early reconciliation. If wallet covers → freeze lifts. If wallet insufficient → mandatory top-up notice.' },
      { num: 4, label: 'Freeze cleared', screen: 'growth-intent',
        note: 'After settlement, capacity expansion re-enabled. CSP back to normal Growth Intent flow.' }
    ]
  },

  W8: {
    title: 'Exit Settlement',
    purpose: 'CSP exits partnership. Only moment SD money flows back. Reconciliation of known quantities, not a revelation.',
    steps: [
      { num: 1, label: 'Exit triggered', screen: 'exit-settlement',
        note: 'EXIT_TRIGGER_SETTLEMENT fires. Final reconciliation: all dues settled, all exposures closed.' },
      { num: 2, label: 'Net SD released', screen: 'exit-settlement',
        note: 'Net = initial + top-ups − total liabilities → CSP\'s bank account. SD → ₹0. Relationship closed. Only cash-out in entire tenure.' }
    ]
  },

  W9: {
    title: 'Standalone SD Top-Up (No Order)',
    purpose: 'CSP tops up SD without ordering devices — to clear deficiency or respond to escalation.',
    steps: [
      { num: 1, label: 'SD below minimum', screen: 'legacy-below',
        note: 'Profile shows shortfall: "जमा राशि ₹12,000 / ज़रूरी ₹20,000 / कमी ₹8,000". No forced top-up — existing ops continue.' },
      { num: 2, label: 'Tap "Top-up करें"', screen: 'sd-topup',
        note: 'Dedicated top-up screen — separate from wallet top-up. UPI flow. "मौजूदा devices और connections पर कोई असर नहीं" reassurance.' },
      { num: 3, label: 'SD cleared', screen: 'sd-profile',
        note: 'Balance now meets minimum. Escalation cleared if any. Issuance freeze lifted.' }
    ]
  },

  W10: {
    title: 'Dispute / Correction Flow',
    purpose: 'CSP challenges a liability. Disputed items excluded from batch; corrections additive (ledger immutable).',
    steps: [
      { num: 1, label: 'Liability appears', screen: 'loss-card-norecovery',
        note: 'Wallet card with "विवाद दर्ज करें" link. Available pre- or post-settlement (7-day window).' },
      { num: 2, label: 'Tap dispute', screen: 'dispute-form',
        note: 'Structured reason picker (4 options). Free-text supplementary. Sets liability to DISPUTED_PENDING_REVIEW.' },
      { num: 3, label: 'Under review', screen: 'dispute-pending',
        note: 'Liability tagged DISPUTED_PENDING_REVIEW. Excluded from reconciliation batch. "Settlement में शामिल नहीं होगा जब तक समीक्षा पूरी न हो।"' },
      { num: 4, label: 'Ops decides', screen: 'dispute-pending',
        note: 'Within 7 days. Accepted → correction entry generated; Rejected → CSP notified with reason, liability confirmed.' },
      { num: 5, label: 'Correction in next cycle', screen: 'settlement-detail',
        note: 'Accepted disputes appear as forward correction entries in the NEXT settlement. Past settlements are never silently rewritten.' }
    ]
  },

  W11: {
    title: 'Legacy CSP Migration — First SD View',
    purpose: 'Pre-system CSPs see SD surface for the first time. Two cases: above or below the new minimum.',
    steps: [
      { num: 1, label: 'Case A · above ₹20,000', screen: 'legacy-above',
        note: 'CSP has ₹25,000. "✅ सब ठीक है — capacity बढ़ा सकते हैं". Normal flow. Explainer sentence about custody risk.' },
      { num: 2, label: 'Case B · below ₹20,000', screen: 'legacy-below',
        note: 'CSP has ₹12,000. Shows shortfall but DOES NOT force immediate top-up. Critical: "मौजूदा devices और connections पर कोई असर नहीं" prevents panic.' }
    ]
  },

  W12: {
    title: 'Late Recovery (After SLA Expiry)',
    purpose: 'Device marked LOST + ₹200 charged. CSP/Wiom recovers later. Exposure closes; charge stands.',
    steps: [
      { num: 1, label: 'Device was LOST', screen: 'dev-lost',
        note: 'Device was marked LOST (non-recovery, ₹200 charged) on say 1 May. ₹50 payout window expired with SLA.' },
      { num: 2, label: 'Late recovery registered', screen: 'late-recovery-card',
        note: 'CSP or Wiom internal team finds the device after SLA. ACS: LOST → RETURNED via late-recovery path. Wallet card explains: charge stands, no reward, device must be ACS-reassigned before reuse.' },
      { num: 3, label: 'Exposure closes only', screen: 'dev-returned',
        note: 'Device flips to RETURNED state. CSP gets exposure closure — nothing else financially. Custody-loss case exception: if charge was for permanent loss and device is recovered functional, correction at next reconciliation (Decision 12).' }
    ]
  }
};
