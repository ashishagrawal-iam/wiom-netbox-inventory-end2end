# NetBox · Inventory End-to-End — Interactive Prototype

A pixel-perfect HTML prototype of the full NetBox asset journey for the Wiom CSP app, layered with the Security Deposit (SD) amendment delta.

## How to open

```bash
open docs/inventory-end2end/index.html
```

No build step. Pure HTML + CSS + JS. Works offline.

## What's in the prototype

**41 screens** across three layers + **12 workflow walkthroughs** from Design Note 3.

### 12 Workflows (Design Note 3 Part A — ordered step-walker)
Use the "Workflows" group at the top of the rail. Click a workflow → a step strip appears above the phone → click any step (or use ←/→ keys) to walk the journey. Each step shows a workflow-scoped note + the screen's general annotations.

| ID | Workflow | Steps |
|---|---|---|
| W1 | SD at Onboarding | 5 |
| W2 | System-Led Provisioning (Growth Intent, states A/B/C/D + Blocked) | 7 |
| W3 | Device Loss — Custody Loss | 5 |
| W4 | Device Loss — Customer Non-Recovery (with ₹250 swing) | 6 |
| W5 | Device Return to Wiom | 5 |
| W6 | Scheduled Reconciliation (quarterly) | 3 |
| W7 | Risk-Triggered Escalation | 4 |
| W8 | Exit Settlement | 2 |
| W9 | Standalone SD Top-Up | 3 |
| W10 | Dispute / Correction | 5 |
| W11 | Legacy CSP Migration (Case A + B) | 2 |
| W12 | Late Recovery (after SLA) | 3 |

### Screens (41 total)

### Order-side journey (12 screens, pre-amendment truth)
Sourced from PR #222 (`Saurav-13th-May-wallet-netbox-cases`):

1. NetBox Home (idle)
2. NetBox Home (order in transit)
3. NetBox Home (delivered, awaiting confirm)
4. Request New sheet
5. Low Balance dialog
6. Add Funds · Input
7. Add Funds · Method (UPI)
8. Add Funds · Processing
9. Add Funds · Success
10. Request Success dialog
11. Delivery Confirm
12. Delivery Confirmed (terminal)

### Device-state drill-down (9 states, pre-amendment truth)
Sourced from `netbox-drilldown-states` branch + 12 device-state mock JSONs:

13. DEPLOYED
14. IDLE (with carry fee)
15. CUSTODIED
16. CUSTOMER_RECOVERY_PENDING
17. RETRIEVAL_PENDING
18. RETURNED
19. DAMAGED
20. LOST
21. WRITTEN_OFF

### New screens proposed by SD amendments (20 screens)
Sourced from `/Users/wiom/Downloads/Net box amendment final/` (8 MDs):

22. SD Onboarding · prompt (W1 step 2)
23. SD Onboarding · success (W1 step 4)
24. Capacity बढ़ाएं · State A (devices needed)
25. Capacity बढ़ाएं · State B (enough devices)
26. Capacity बढ़ाएं · State C (SD top-up inline)
27. Capacity बढ़ाएं · State D (no capacity in area)
28. Capacity बढ़ाएं · Blocked (one-reason)
29. SD Profile
30. SD Profile · Legacy (above minimum, W11 Case A)
31. SD Profile · Legacy (below minimum, W11 Case B)
32. SD Top-Up
33. Wallet · Custody loss card (Surface 3 custody variant)
34. Wallet · Non-recovery card (Surface 3 non-recovery variant)
35. Recovery success · +₹50 reward (W4 step 3a)
36. Wallet · Late recovery card (W12)
37. Settlement Detail (Surface 4)
38. Escalation Notice (W7)
39. Dispute · Form (W10 step 2)
40. Dispute · Under review (W10 steps 3–4)
41. Exit Settlement (W8)

## How to use

- **Left rail** — navigate the journey. Items are grouped by side (order / device states / new). Coloured dots and `→ changed` / `NEW` chips show what the amendments touch.
- **Centre** — phone frame (392×800) rendering the chosen screen with Wiom tokens and Hindi copy as in the live app.
- **Right rail** — annotations for the current screen. Five anchor types:
  - <span style="color:#008043">**ADDED**</span> — new content from amendments
  - <span style="color:#6D17CE">**CHANGED**</span> — existing element altered
  - <span style="color:#D92130">**REMOVED**</span> — deprecated
  - <span style="color:#B85C00">**POLICY**</span> — backend invariant the CSP feels
  - **UNCHANGED** — today's truth, kept as-is
- **Top toggle** — "Show amendments" overlays the pink badges on screens to flag where amendment changes land. "Pre-amendment only" hides them.
- **Workflow stepper** — when you click a workflow in the rail (top group), a step strip appears above the phone. Click any step or use ←/→ keys to walk through the journey. Each step shows a workflow-scoped explanation alongside the screen's general annotations.

## Design system fidelity

All tokens are mirrored from `core/common/.../theme/WiomTokens.kt` v1.0 (light theme, Devanagari headroom +4dp on line-heights, 4dp spacing grid). CSS variables are declared in `assets/tokens.css`. No raw hex anywhere in components.

## Sources

| Source tag | Origin |
| --- | --- |
| `PR #222` | `wiom-tech/wiom-csp-app-apr09` PR #222 — Saurav-13th-May-wallet-netbox-cases |
| `DD-state` | branch `netbox-drilldown-states` |
| `SDA` | `/Users/wiom/Downloads/Net box amendment final/` — 8 docs, 3,012 lines |

## File layout

```
docs/inventory-end2end/
├── index.html              # all 28 screens
├── README.md               # this file
└── assets/
    ├── tokens.css          # Wiom design tokens (CSS custom properties)
    ├── proto.css           # dashboard chrome + screen primitives
    ├── icons.svg.html      # material icon sprite (also inlined in index.html)
    ├── annotations.js      # per-screen annotation data
    └── app.js              # rail navigation + amendment toggle
```

## Status

- [x] Prototype built — 28 screens covering full end-to-end asset journey
- [x] Amendment overlay system (toggle + badges + annotations)
- [x] Wiom design tokens applied
- [ ] Amendment implementations in actual app code — not started; pending review of this prototype

Once the prototype is approved, the amendments graduate to actual UI changes in `feature/netbox/` and `feature/wallet/`, and we raise a PR on `Inventory-End2End` against `development`.
