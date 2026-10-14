# Version 1 verification

Checked 14 October 2026 using the installed Chrome browser, with automated interaction and visual review.

## Passed

- JavaScript syntax check.
- 16 routing scenarios: undergraduate, graduate, Filipino other researcher, foreign funding, NGO conservation, government research, certified urgent government collection, multi-region, other region, protected species, coral, toxin/property review, Palawan, commercial purpose, NGO non-conservation research and unresolved applicant/purpose/funding.
- Four additional assertions for protected-status warning, overlapping foreign/government categories, non-wild-source non-exemption and preservation of Palawan review in an MOA case.
- Required-field errors and focus on the first unanswered question.
- Full four-step wizard and results, including undergraduate/graduate fee guidance.
- Checklist persistence after reload and the same answers; isolation after changed answers.
- User-entered markup rendered as plain text rather than executable HTML.
- FAQ search, empty state and restoration of all 20 FAQs.
- Sixty-day deadline crossing a year boundary (31 December 2026 → 1 March 2027).
- All local navigation targets and referenced assets/downloads returned successfully.
- Print media shows the personalized plan and suppresses the surrounding guide/navigation.
- No horizontal overflow at 390px mobile width (homepage/result) or 320px (result).
- Storage-blocked browser still initializes the interactive guide.
- JavaScript-disabled browser retains complete-guide content, downloads and fallback notice.
- No browser JavaScript errors in the tested flow.
- Visual inspection of the desktop homepage, mobile homepage/result and print-media layout.

## Limits

Not a full WCAG certification or a test across every browser/device. Actual printer pagination varies by browser, paper and print settings. A real GitHub Pages deployment has not been performed; all paths are relative and there is no build dependency. External source URLs and email delivery are not guaranteed by local-link checks. No application or email was sent and no payment was made.

The original uploaded samples and earlier applicant conversations were unavailable. Official FAO text was checked, but regional operating instructions and current delegation/permit decisions require BFAR confirmation as detailed in CONTENT-SOURCES.md.
