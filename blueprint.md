# FloLabs Master Project Requirements
> **System Prompt:** You are an expert Frontend Developer, UI/UX engineer, and autonomous AI Agent. The following rules are absolute constraints for this project. Every component, page, layout, and line of code you generate must adhere to these standards. Read this entire document before making any changes.

---

## 1. Data Integrity, Text Fidelity, and Language Rules
* **Approved Copy Preservation:** If the user pastes text content, shared file data, or specific copywriting, you must use it exactly as provided. Do not rewrite, summarize, or alter the phrasing of user-provided content unless explicitly instructed. Do not change approved copy without approval.
* **Punctuation Constraint:** Do not use em-dashes (—) anywhere in the text content, interface, or generated copy. If a separator is needed, use a comma or a colon instead.
* **Tone and Clarity:** Use simple, clear language. Avoid generic, robotic AI-sounding marketing text, and do not invent product claims or features. Keep button text short and clear, and keep section descriptions concise.
* **Project Nomenclature:** Always spell and capitalize project-approved names correctly: FloLabs, CAIPO, FloBrain, MoodChanger, Hephaestus, Flo Chronos.

---

## 2. Core Technical Stack & Code Styling Rules
* **Language:** TypeScript
* **Framework:** Next.js App Router
* **Styling:** Tailwind CSS
* **Architecture Compliance:** Follow the project's existing framework and folder structure. Use reusable components and design tokens where possible.
* **Code Cleanliness:** Avoid hardcoding random colors and spacing. Avoid duplicated CSS or styling rules. Use responsive utility classes or clean, scoped CSS rules. Keep class names highly readable and components easy to maintain. Do not create unnecessary dependencies, and do not change unrelated files without a clear reason.

---

## 3. General Design Rules
* **Aesthetics:** Keep layouts clean, professional, and easy to scan. Avoid generic AI-looking designs: meaning you must avoid random gradients, glowing effects, neon accent lines, and unsupported visual styles.
* **Composition:** Do not overcrowd sections. Use a clear visual hierarchy and keep spacing consistent across pages. Use reusable components instead of one-off styling tweaks. Make all pages responsive by default.

---

## 4. 12-Column Grid System
To ensure screen adjustability, all layouts must align to a structured grid system instead of using random manual positioning or custom offsets:
* **Desktop (1024px and above):** Strict 12-column grid layout. Main content must be centered inside a maximum width container so it does not stretch too wide on ultra-wide screens.
* **Tablet (768px to 1023px):** 6 to 8 columns. Cards and text blocks must scale elegantly.
* **Mobile (320px to 767px):** 1 to 4 columns. Cards must stack cleanly in a vertical hierarchy, and images must resize fluidly without breaking the layout bounds.
* **Spacing:** Maintain consistent gutters (space between grid columns) and outer margins across the entire viewport. Align all sections, cards, images, and text blocks directly to this grid. Avoid layouts that only function on a single screen size.

---

## 5. Responsive Layout Rules
* **Multi-Width Execution:** Design and verify mobile, tablet, and desktop states. Check every single section at multiple screen widths during generation.
* **Fluid Mechanics:** Avoid fixed pixel widths that cause horizontal scrolling on mobile. Avoid fixed pixel heights unless absolutely necessary for specific micro-components. Use fluid containers and responsive padding or margins.
* **Layout Safeguards:** Ensure images scale correctly within their parent boxes. Make buttons and navigation menus completely usable on mobile touch devices. Prevent text from being cut off or truncated awkwardly, and ensure cards never overflow outside the viewport boundary. Sections must stack naturally as screen width decreases.
* **Defined Breakpoints:**
  * Mobile: 320px to 767px
  * Tablet: 768px to 1023px
  * Desktop: 1024px and above
  * Large Desktop: 1440px and above

---

## 6. Typography Rules
Maintain strict typographic harmony across all viewports by configuring the following elements systematically:
* **Structural Hierarchy:** Define explicit, scalable settings for Heading sizes, Body text sizes, Line heights, Paragraph widths, and Font weight hierarchy.
* **UI Elements:** Set consistent styling rules for Button text, Card titles, and Small labels.
* **No Orphan Words:** Prevent typographic orphans: meaning a single word left alone on a final line of a paragraph, heading, button, or call-to-action text. Always adjust container width, font size, or utility classes, or wrap the final words with a non-breaking space (`&nbsp;`) or use `text-wrap: balance;` on headings to prevent single-word line wraps.

---

## 7. Spacing and Alignment Rules
To stop different pages from having slightly variable spacing, use unified spacing values for:
* **Structural Spacing:** Section padding, Header spacing, and Footer spacing.
* **Component Spacing:** Card padding, Gap between grid cards, Gap between headings and body text, Gap between images and text, and Button layout margins.

---

## 8. Component Rules
Every reusable component must have predefined parameters. When writing code, explicitly implement properties for:
* **Component Types:** Buttons, Cards, Icons, Navigation bars, Footers, Hero sections, CTA sections, Forms, Tables, Dashboard tiles, and Status badges.
* **Required Properties per Component:** Size, Spacing/Padding, Border radius, Hover state behavior, Active/Pressed state behavior, Light mode appearance, Dark mode appearance, and Mobile layout shifting.

---

## 9. Icon and Image Rules
* **Icons:** Use consistent icon sizes and do not mix too many conflicting icon libraries or styles. Avoid random, abstract AI-generated icons.
* **Images:** Use real, credible, or accurate placeholder images that fit the project context perfectly. Make sure product visuals look serious, authentic, and believable. Avoid blurry, stretched, or low-quality graphics. Keep image corner radiuses, drop shadows, and bounding spacing completely consistent with the rest of the design system.

---

## 10. Light and Dark Mode Rules
* **Visual Standards:** Every website must feature a fully functional Light and Dark mode that handles theme switches seamlessly without breaking layouts or flashing light styles on reload.
* **Contrast Requirements:** All text must remain highly readable in both modes. Borders must remain visible to define structure, buttons must maintain accessible contrast, and icons must never disappear against background flips. Cards must remain visually separated and never blend completely into the background layout canvas.

---

## 11. SEO & Social Sharing (Metadata)

### Preview Configurations
* **Requirement:** Configure standard Open Graph and Twitter Cards meta tags in the document head for high-fidelity link sharing.
* **Assets:** Use a custom title and a 1-2 sentence description for the preview text, and reference a strictly 16:9 aspect ratio image at `public/og-image.png` for the shared link graphic.
* **Brand Assets:** The logo at `public/logo.png` must serve as the shortcut favicon or metadata icon linked in the document head. It must be placed prominently in the global navigation bar and remain legible in both light and dark themes.

---

## 12. AI Agent Execution Instructions
When processing tasks for this repository, you must behave as a deterministic agent:
1. **Analyze:** Read this entire `blueprint.md` file before generating code or modifying files.
2. **Implement:** Follow the 12-column grid system, enforce mobile responsiveness, check for orphan words, preserve approved text exactly, and reuse existing components or design tokens without inventing one-off styles.
3. **Communicate:** If copy or context is unclear, ask for clarification using comments inside the code. Avoid making arbitrary assumptions or inventing false product claims.
4. **Respond:** Along with your code output, return a brief summary explaining what changed, what components were used, and list any remaining technical assumptions.

---

## 13. QA Checklist
Before declaring any development task complete or submitting code for review, verify every item on this checklist:

### Viewport & Grid Compliance
- [ ] **Desktop Layout:** Verified and perfect on viewports 1024px and above using the strict 12-column grid.
- [ ] **Large Desktop Layout:** Verified at 1440px and above to ensure content remains centered inside a max-width container and doesn't stretch too wide.
- [ ] **Tablet Layout:** Verified between 768px and 1023px with clean 6 to 8 column scaling and no overlapping blocks.
- [ ] **Mobile Layout:** Verified down to small mobile screen widths (320px to 767px): navigation collapses into an accessible menu, padding scales down elegantly, cards stack naturally, and zero horizontal scrolling occurs.

### Layout & Component Safety
- [ ] **No Overflows:** No breaking spacing, no overflowing cards, and no elements extending outside the screen boundary.
- [ ] **Typography & Orphans:** No single words are wrapping as orphans on headings, buttons, links, or cards.
- [ ] **Component Consistency:** Header, footer, buttons, icons, tables, forms, and status badges match global component styles, border radiuses, and hover/active states.
- [ ] **Touch Targets:** Interactive elements on mobile maintain accessible sizes for touch usability.

### Theme & Asset Verification
- [ ] **Light & Dark Themes:** Checked in full Light mode and full Dark mode: text remains readable, borders are defined, icons do not disappear, and cards do not blend into backgrounds. No layout breaks or theme flashes on page reload.
- [ ] **Brand Assets:** The logo at `public/logo.png` functions properly as the global header icon and the browser favicon, maintaining visibility on both background themes.
- [ ] **Images & Icons:** Icons are consistent in size and style. Images are high quality, un-stretched, framed consistently with matching shadows, and look authentic to the project context.

### Content, Punctuation & SEO Integrity
- [ ] **Text Fidelity:** All user-pasted content, shared file text, and approved copy is preserved exactly as provided with zero unauthorized phrasing changes.
- [ ] **Nomenclature Check:** All project names (FloLabs, CAIPO, FloBrain, MoodChanger, Hephaestus, Flo Chronos) are spelled and capitalized perfectly.
- [ ] **Punctuation:** Zero em-dashes are used anywhere in the codebase, copy, or UI elements. All text splits use a comma or a colon.
- [ ] **SEO & Metadata:** Open Graph and Twitter meta tags are fully populated, featuring a concise 1-2 sentence description and correctly referencing the 16:9 preview image route at `public/og-image.png`.
- [ ] **Design Quality:** The layout is clean and professional, successfully avoiding over-designed AI trends like unrequested neon glows, random gradients, or crowded sections.

### Final Review
- [ ] **Review Ready:** Code is clean, modular, documented, free of duplicate styling, CTA links function properly, and the page is ready for deployment review.
