# Gratuitous Permit Guide — BFAR Region IV-A

Easy-to-read edition. Short explanations, a word guide, simpler results and a high school project option. Teacher help is suggested, not imposed as a legal requirement.

Version 2 · prepared 14 October 2026. A mobile-first static applicant guide with a four-step wizard, conditional checklists, searchable FAQs, downloadable preparation aids and printable results. No framework, build process, account, database or paid dependency.

## Open locally

Extract the ZIP, then open `index.html` in a modern browser. For more consistent browser-local storage behavior, serve this folder with any static web server. If Python is installed, run `python -m http.server 8000` inside this folder, then open `http://localhost:8000`. No installation is required by the site itself.

## Publish on GitHub Pages

1. Sign in to GitHub and create a new **public repository**, for example `bfar-4a-permit-guide`. A public repository is the straightforward free Pages option. Add a README when creating the repository if you want an initial `main` branch.
2. Extract the ZIP. Upload the **contents** of the site folder using **Add file → Upload files**. Keep `index.html`, `styles.css`, `script.js`, `data.js` and `.nojekyll` at the repository root, with the `assets` and `downloads` folders beside them. Do not upload only the ZIP or place everything inside an extra enclosing folder. If the file picker hides `.nojekyll`, create that empty file using **Add file → Create new file**.
3. Commit the uploaded files to `main`.
4. Open repository **Settings → Pages**.
5. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
6. Choose **main** and **/(root)**, then **Save**.
7. Wait for GitHub’s Pages deployment to finish. Check the repository’s **Actions** tab if it fails. Pages settings will show the actual published URL, typically `https://YOUR-USERNAME.github.io/bfar-4a-permit-guide/`.
8. Open that URL on desktop and phone. Try both homepage entry points, complete a wizard, check downloads and print a result.
9. To update, edit/upload the changed files on `main` and commit. GitHub republishes the configured source. Keep filenames and letter case consistent.

The site uses relative asset/download paths, so it works at both a domain root and a GitHub project subpath. No custom domain, GitHub Actions configuration, API key or environment variable is needed. This package has not been uploaded to a GitHub account or published.

Official reference: [Configuring a publishing source for GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Files

- `index.html`: complete readable guide, wizard form, FAQs and source notes.
- `styles.css`: responsive design, keyboard focus styles, sticky mobile navigation and print layout.
- `script.js`: routing, form validation, result generation, local checklist state, FAQ search and 60-day calculation.
- `data.js`: Section 22 pathway requirements; also preserves the FAQ content as structured data.
- `assets/mark.svg`: original decorative wave mark; not an official BFAR seal.
- `downloads/`: official FAO PDF and newly drafted aids.
- `CONTENT-SOURCES.md`: provenance, unresolved source gaps and update notes.
- `QA.md`: completed checks and limits.
- `.nojekyll`: serves the files directly on GitHub Pages.

## Source and template limitations

The referenced chat was readable, but it exposed no attachments and no older applicant conversations. The original uploaded GP samples were therefore **not copied**. The package includes an official FAO 233 PDF downloaded from BFAR and the following newly drafted substitutes, visibly labeled as such:

- Application request letter: editable `.txt`.
- Affidavit of Undertaking: preparation worksheet only, **not an executable or approved affidavit**. Obtain the current BFAR wording before signing/notarization.
- Regional Annex A work-plan worksheet: printable `.html`; copy its table into an editor if desired. This differs from the species-list Annex A of FAO 233.
- Inventory: editable `.csv`, with accidental collection, weight in grams and collector fields.
- Sampling report: editable `.txt`.
- Dean, adviser and institution-head endorsement examples: `.txt`.
- LGU and protected-area prior-clearance request examples: `.txt`; these are not issued clearances or FPIC certificates.

Text files open in any text editor and can be copied into Word. Replace bracketed placeholders; obtain signatures/certifications and approved formats required by the applicable route. To add the original samples later, review them for personal information and permission to publish, place the suitable files in `downloads`, update the download links/labels in `index.html`, and update the source-availability notes. Result download links are generated from the homepage download cards automatically.

## Content decisions

- Original FAO Sections 22.1–22.3: Central Office baseline; 22.4–22.6: concerned Regional Office, with the 22.6 MOA exception. Section 22.9: multi-region research → Central Office.
- The 2024 Citizen’s Charter describes some processing assignments differently. Current delegation and receiving units are flagged for office confirmation rather than assumed to amend FAO 233.
- Threatened/protected/CITES status triggers special review, not an automatic Central Office claim.
- Coral referral to Central Office–FRLD–AWRS is identified as supplied regional operational guidance.
- Foreign nationality, affiliation or funding points to 22.2 and flags overlapping project types. Government funding alone does not establish 22.5.
- Commercial/bioprospecting, unknown categories, Palawan and non-wild sources require additional review. The guide does not claim exemption.
- The supplied practical fee totals, payment sequence, contacts, 60-day inventory rule and Annex A advice are labeled regional guidance and are not represented as independently confirmed current BFAR instructions.
- Results to BFAR **and NFRDI** under §22.10 are included separately from the regional Records/FRMS email workflow.

## Privacy and accessibility

Only checkmarks are stored, under an opaque hash of the answer set, in the visitor’s `localStorage`. Scientific names, locations and form answers are not saved or sent. Re-entering the same answers in the same browser restores that checklist; changing answers produces a different checklist. “Clear this checklist” removes that result’s saved checks. Browser site-data controls can remove all saved checklists. The page works without storage; JavaScript-disabled visitors can read the complete guide and download files. No analytics, remote fonts, cookies, trackers or application-upload endpoint are included. GitHub hosting may keep its own standard access logs.

Semantic form labels, fieldsets, keyboard focus, error feedback, skip navigation, reduced-motion support and live status messages are provided. Browser print / Save as PDF includes the result’s requirements, submission, payment, download references and post-collection obligations. Saved PDF links to local downloads may depend on the original site location; keep the website URL or package available.

## Maintaining the guide

Update regional guidance only after the office confirms it. Record the source/date in `CONTENT-SOURCES.md` and on the source panel. Pathway requirements appear in both `data.js` (results) and `index.html` (browse guide); update both together. FAQ text is static in `index.html`; the matching structured copy is in `data.js`. Keep the version and source labels accurate. After any routing edit, recheck standard students, foreign funding, 22.1, 22.3, 22.4, 22.5, multi-region, coral, protected status, MOA, Palawan and unknown answers.
