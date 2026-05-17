// 12 workflows from SD_Design_Note_3.md Part A.
// Each workflow is an ordered sequence of step → screen mappings.

window.WORKFLOWS = {

  W1: {
    title: 'W1 · SD at Onboarding',
    purpose: 'CSP completes onboarding → sees the one-time ₹20,000 सुरक्षा राशि requirement → pays via UPI → SD active → क्षमता बढ़ाएं unlocked. Single linear flow, no branches. Framed as partnership-level, never per-device.',
    steps: [
      { num: 1, label: 'स्वीकृति → SD दिखती है', screen: 'onboarding-prompt',
        note: 'Backend event CSP_REGISTERED fires after onboarding. Next time CSP opens the app, this screen is the blocker — hero shows ₹20,000 (P_SD_ABSOLUTE_MINIMUM) as a one-time partnership amount. v8.6 copy: "Wiom साझेदारी शुरू करने के लिए ₹20,000 · एक बार जमा करनी है". The "हर डिवाइस पर नहीं, पूरी साझेदारी पर एक बार" rationale prevents per-device escrow framing.' },
      { num: 2, label: '"क्या होगा" समझें', screen: 'onboarding-prompt',
        note: 'Same screen — CSP reads the 3 reassurance bullets: SD safe & returnable, Settlement Cycle pe transparent हिसाब, क्षमता बढ़ाने का अनुरोध unlocked. No tier choice, single CTA. v8.6 swept Latin → Devanagari (साझेदारी, डिवाइस, क्षमता, अनुरोध).' },
      { num: 3, label: 'UPI से जमा करें', screen: 'add-funds-method',
        note: 'Tap CTA "₹20,000 UPI से जमा करें" → standard UPI method picker (shared screen). Backend records SECURITY_PAID event in Payment OS.' },
      { num: 4, label: 'SD active', screen: 'onboarding-success',
        note: 'Big checkmark + spec confirmation line "सुरक्षा राशि जमा हो गई · अब आप अपनी सेवा क्षमता बढ़ाने का अनुरोध कर सकते हैं" + balance card ₹20,000. Status: active.' },
      { num: 5, label: 'क्षमता बढ़ाएं unlocked', screen: 'growth-intent',
        note: 'CTA "क्षमता बढ़ाएं" routes to growth-intent (F1 State A) — CSP is now eligible for the full F1 family of flows. Bridge from W1 → F1.' }
    ]
  },

  // v8 (17 May 2026) — F1 split into FIVE end-to-end walkable flows.
  // Each flow starts at dashboard-home and walks a single linear chain.
  // `tapRemap` lets a step override the in-phone CTA's hardcoded target so
  // the same screen behaves differently depending on which flow is active
  // (e.g. State A's "हाँ" goes to State B in F1A but to State C in F1B/F1C).

  F1A: {
    title: 'F1·A · Happy case (SD funded, devices ready)',
    purpose: 'CSP triggered on Assurance Strip → opens drilldown → sees 25-capacity opportunity → acknowledges intent → system confirms 5 new connections → CSP confirms → inventory starts provisioning. SD is already funded; no top-up needed.',
    steps: [
      { num: 1, label: 'Trigger on Dashboard', screen: 'dashboard-home',
        note: 'Entry: Assurance Strip 4th chip ("Zone & Capacity · 25 खुले") on Dashboard home. CSP taps the chip → opens नया काम drilldown.' },
      { num: 2, label: 'नया काम · opportunity card', screen: 'zone-capacity',
        note: 'Drilldown opens. Inside, the pink opportunity card surfaces "आपके area में मौका · 25 connections". CSP taps the card → opens Capacity बढ़ाएं (State A).' },
      { num: 3, label: 'State A · capacity offer', screen: 'growth-intent',
        note: 'System asks general intent: "आप अभी 25 और connections ले सकते हैं". CSP taps "हाँ, capacity बढ़ाइए" → chains to State B.' },
      { num: 4, label: 'State B · 5-connection confirm', screen: 'growth-intent-B',
        note: 'Specific batch confirmation. System says: "5 नए connections भेजेगा — आपकी custody में 7 devices deploy के लिए तैयार हैं, system इन्हें route करेगा". CSP taps "हाँ, पुष्टि करें".' },
      { num: 5, label: 'Provisioning in progress', screen: 'nb-home-tracking',
        note: 'Order tracker appears on NetBox home. Inventory dispatch begins. Devices already on-hand → routing starts immediately, no shipping needed.' }
    ]
  },

  // v8.1 fix · State C IS the inline top-up screen per Design Note 3
  // Must-Do #8 ("Inline SD top-up in growth intent flow"). Removed the
  // redundant sd-topup intermediate step from F1·B and F1·C. sd-topup
  // is now reserved for W9 (standalone top-up from SD Profile).

  F1B: {
    title: 'F1·B · SD top-up needed · wallet covers',
    purpose: 'Same opportunity but SD short of exposure required for new capacity. CSP routed to State C inline top-up. Wallet has enough balance to fund the ₹2,000 directly — no UPI re-fill needed. Single top-up confirmation, then provisioning continues.',
    steps: [
      { num: 1, label: 'Trigger on Dashboard', screen: 'dashboard-home',
        note: 'Entry: Zone & Capacity chip on Dashboard. Identical entry to F1·A — the divergence happens at State A based on SD balance.' },
      { num: 2, label: 'नया काम · opportunity card', screen: 'zone-capacity',
        note: 'Drilldown surfaces the same opportunity card. The fact that SD is insufficient is not pre-disclosed at drilldown — drilldown represents demand, SD check happens at State A.' },
      { num: 3, label: 'State A · capacity offer', screen: 'growth-intent',
        tapRemap: { 'growth-intent-B': 'growth-intent-C' },
        note: 'System surfaces "25 connections available". CSP taps "हाँ, capacity बढ़ाइए" — but since SD < required exposure for new capacity, system routes to State C instead of State B. (Tap remap: same button, different next screen depending on SD state.)' },
      { num: 4, label: 'State C · batch + inline top-up', screen: 'growth-intent-C',
        tapRemap: { 'add-funds-method': 'add-funds-success' },
        note: 'State C is the COMBINED batch-confirm + inline top-up surface per Design Note 3 (Surface 2 spec + Must-Do #8 "Inline SD top-up. Don\'t break flow."). v8.2 added the State-B-style batch hero ("System आपको ये भेजेगा · 5 नए connections") + Devices breakdown (custody 82, deploy-ready 7) so CSP sees the concrete outcome before the cost. Then the top-up math (₹20k current + ₹2k needed = ₹2k top-up). CSP taps "हाँ, ₹2,000 जमा करें". Wallet has enough → pulls from wallet → straight to success. (Tap remap skips the UPI method screen.)' },
      { num: 5, label: 'Top-up success', screen: 'add-funds-success',
        note: '₹2,000 moved from wallet to SD. SD now ₹22,000 — meets new exposure threshold. Capacity provisioning was already intended at State A → continues automatically. CSP taps "ठीक है" → NetBox home with order tracker live.' },
      { num: 6, label: 'Provisioning in progress', screen: 'nb-home-tracking',
        note: 'Order tracker visible. Single linear flow: intent → exposure check → inline top-up → provisioning. Mental model: "I funded the capacity, system is sending the devices."' }
    ]
  },

  F1C: {
    title: 'F1·C · Wallet low · UPI re-fill required',
    purpose: 'SD top-up needed AND wallet doesn\'t have enough to cover ₹2,000. CSP redirected from State C inline top-up to UPI to add money — money lands in wallet, auto-flows to SD top-up, provisioning continues. Single UPI transaction, no double-pay.',
    steps: [
      { num: 1, label: 'Trigger on Dashboard', screen: 'dashboard-home',
        note: 'Same entry: Zone & Capacity chip. Divergence from F1·B happens at State C when wallet check fails.' },
      { num: 2, label: 'नया काम · opportunity card', screen: 'zone-capacity',
        note: 'Drilldown opportunity card. Same as F1·A and F1·B.' },
      { num: 3, label: 'State A · capacity offer', screen: 'growth-intent',
        tapRemap: { 'growth-intent-B': 'growth-intent-C' },
        note: 'SD insufficient → routes to State C (same remap as F1·B).' },
      { num: 4, label: 'State C · batch + inline top-up', screen: 'growth-intent-C',
        tapRemap: { 'add-funds-method': 'add-funds-input' },
        note: 'State C combined batch-confirm + inline top-up (v8.2). CSP sees "5 नए connections" + Devices breakdown + ₹2,000 top-up math. Taps "हाँ, ₹2,000 जमा करें". Wallet balance < ₹2,000 → system redirects to UPI amount entry. (Tap remap: instead of pulling from wallet, opens UPI input.)' },
      { num: 5, label: 'UPI · amount entry', screen: 'add-funds-input',
        note: 'CSP enters amount (defaults to ₹2,000 top-up amount). Wiom framing: money is added to wallet, then auto-flows to SD top-up. Single UPI transaction, no double-pay.' },
      { num: 6, label: 'UPI · method picker', screen: 'add-funds-method',
        note: 'UPI method confirmation. Standard UPI flow.' },
      { num: 7, label: 'Processing', screen: 'add-funds-processing',
        note: 'UPI processing — money lands in wallet, then auto-transfers to SD. CSP sees one combined confirmation, not two.' },
      { num: 8, label: 'Success → provisioning', screen: 'add-funds-success',
        note: 'Money added → SD topped up to ₹22,000 → capacity provisioning continues. CSP taps "ठीक है" → NetBox home with order tracker.' },
      { num: 9, label: 'Provisioning in progress', screen: 'nb-home-tracking',
        note: 'Order tracker live. Single combined journey: UPI → wallet → SD → capacity provisioning. CSP perceives one decision (fund capacity), not three transactions.' }
    ]
  },

  F1D: {
    title: 'F1·D · No capacity in area · system waits',
    purpose: 'CSP opens drilldown but system has no demand to allocate in this area. Drilldown shows a "अभी इंतज़ार" status card. CSP can tap it for details. Info-only — no action available.',
    steps: [
      { num: 1, label: 'Trigger on Dashboard', screen: 'dashboard-home',
        tapRemap: { 'zone-capacity': 'drilldown-no-capacity' },
        note: 'CSP taps Zone & Capacity chip. System has no demand in area right now → drilldown opens in NO-CAPACITY variant. (Tap remap: same chip, different drilldown based on system state.)' },
      { num: 2, label: 'नया काम · no capacity card', screen: 'drilldown-no-capacity',
        note: 'Drilldown shows "अभी इंतज़ार · आपके area में अभी और connections उपलब्ध नहीं" as the status card. CSP taps the card → opens State D for full info.' },
      { num: 3, label: 'State D · waiting info', screen: 'growth-intent-D',
        note: 'Info-only screen. "ज़रूरत होने पर system आपको बताएगा। मौजूदा connections पर कोई असर नहीं।" No CTA. CSP returns to Dashboard when ready.' }
    ]
  },

  F1E: {
    title: 'F1·E · Blocked · deploy existing first',
    purpose: 'CSP has demand opportunity BUT a precondition isn\'t met (e.g., 7 devices CUSTODIED but not deployed). Drilldown surfaces the BLOCKED status card with the one-reason rule. CSP taps to see the full blocked screen with the unblock action.',
    steps: [
      { num: 1, label: 'Trigger on Dashboard', screen: 'dashboard-home',
        tapRemap: { 'zone-capacity': 'drilldown-blocked' },
        note: 'CSP taps Zone & Capacity chip. System detected demand BUT a blocker exists → drilldown opens in BLOCKED variant. (Tap remap: same chip, blocked drilldown based on system state.)' },
      { num: 2, label: 'नया काम · blocked card', screen: 'drilldown-blocked',
        note: 'Drilldown shows the caution-tinted card: "अभी capacity नहीं बढ़ा सकते · 7 devices CUSTODIED हैं जो customer के पास नहीं लगाए". One reason only — Wiom\'s rule of surfacing the highest-priority blocker. CSP taps → State Blocked.' },
      { num: 3, label: 'State Blocked · one reason', screen: 'growth-intent-blocked',
        note: 'Full blocked screen with the "क्यों" explanation card + "7 devices · deploy होने बाकी · देखें" linkable card. CSP can navigate to fix the blocker. Once deployed, F1·A/B/C unlocks.' }
    ]
  },

  // v9.0 · W3 expanded with pre-steps. Spec Workflow 3 Step 1 begins with
  // "CSP or system reports device missing" — but the prototype had no
  // declaration UI. Now the walk covers the full arc: CSP finds device
  // missing in their inventory → declares loss with liability disclosure
  // → device flips to LOST → wallet card → settlement.
  W3: {
    title: 'W3 · Custody Loss (with declaration pre-step)',
    purpose: 'Device disappears from CSP\'s possession (office/transport/shelf). CSP declares the loss in the app via an explicit liability-disclosure form. ACS then marks LOST with lost_reason=CSP_CUSTODY_LOST; age-band liability recorded; settled at next reconciliation.',
    steps: [
      { num: 1, label: 'Device in custody · नहीं मिल रहा', screen: 'dev-custodied',
        note: 'v9.0 pre-step. CSP opens the device record (NB-00123) — was CUSTODIED on shelf, now can\'t locate. Three CTAs visible: सेटअप में नहीं लगाना · वापस करें · "मुझे यह डिवाइस नहीं मिल रहा" (red link). Real-life triggers: office theft, transport loss, shelf audit mismatch, lost during installation.' },
      { num: 2, label: 'गुम दर्ज करें · liability disclosure', screen: 'report-loss-sheet',
        note: 'v9.0 pre-step. Form captures कहाँ last seen + कब noticed + optional photo. Critical red disclosure card shows the computed age-band liability up-front (₹600 for a 28-month device · 40% slab), the settlement-cycle date, and the late-recovery clause (Decision 12: charge stands even if found later). Trust line offers 7-day dispute window if CSP regrets the declaration. Primary CTA explicitly states the amount: "हाँ, गुम दर्ज करें · ₹600 liability जुड़ेगी".' },
      { num: 3, label: 'Device → LOST', screen: 'dev-lost',
        note: 'CSP confirmed → ACS marks the device LOST with <code>lost_reason=CSP_CUSTODY_LOST</code>. Carries device_commissioned_at + loss_detected_at. Liability sits as recoverable due (not deducted in real-time per SD-5).' },
      { num: 4, label: 'Wallet card appears', screen: 'loss-card-custody',
        note: 'Wallet feed card: "NetBox custody loss · ₹600 · Device आपकी custody में था". Shown immediately; SD untouched.' },
      { num: 5, label: 'Awaits reconciliation', screen: 'sd-profile',
        note: 'Liability sits in बकाया देय with next-settlement date. No real-time SD mutation.' },
      { num: 6, label: 'Settled', screen: 'settlement-detail',
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
