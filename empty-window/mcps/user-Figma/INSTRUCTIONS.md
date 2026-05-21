The official Figma MCP server. Use this server whenever the user wants to create, generate, edit, implement, or sync any design, UI, screen, component, mockup, or visual — in Figma, FigJam, Figma Make, or Figma Slides — and whenever the user mentions Figma or provides a figma.com URL.

This server bridges code and design in both directions, and supports designing from scratch using existing design systems and codebases.

CAPABILITIES:
- Read designs FROM Figma into code (get_design_context, get_screenshot, get_metadata, get_figjam)
- Write designs INTO Figma from code, intent, or existing components (use_figma, generate_figma_design, create_new_file, upload_assets)
- Bridge code and design via Code Connect (get_code_connect_map, add_code_connect_map, list_code_components, get_code_component_info)
- Create diagrams and FigJam content (generate_diagram, get_figjam)

WHEN TO USE THESE TOOLS:
- The user wants to create, mock up, or generate any UI, screen, component, or design — even if Figma isn't named
- The user wants to implement a design as code (design-to-code)
- The user wants to push a page, view, or component into Figma (code-to-design)
- The user wants to update, sync, or edit an existing Figma file
- The user shares a figma.com URL
- The user wants to build or extend a design system, design tokens, or component library
- The user wants to create a diagram in FigJam

SKILLS (load first when available):
- /figma-use — MANDATORY before calling use_figma
- /figma-generate-design — for translating an app page or layout into Figma
- /figma-generate-library — for building a design system in Figma from code
- /figma-code-connect — for mapping Figma components to codebase components
- /figma-use-figjam — for FigJam-specific use_figma flows
- /figma-generate-diagram — MANDATORY before calling generate_diagram

URL PARSING:
Extract fileKey and nodeId from Figma URLs:
- figma.com/design/:fileKey/:fileName?node-id=:nodeId → convert "-" to ":" in nodeId
- figma.com/design/:fileKey/branch/:branchKey/:fileName → use branchKey as fileKey
- figma.com/make/:makeFileKey/:makeFileName → use makeFileKey
- figma.com/board/:fileKey/:fileName?node-id=:nodeId → FigJam file, use get_figjam
- figma.com/slides/:fileKey/:fileName?node-id=:nodeId → Figma Slides file

DESIGN-TO-CODE WORKFLOW (Figma → code):
1. Call get_design_context with the nodeId and fileKey. This is your primary tool. It returns reference code, a screenshot, and contextual hints.
2. The output is React+Tailwind enriched with hints — it is a REFERENCE, not final code. Adapt it to the target project's stack, components, and conventions.
3. Check the target project for existing components, layout patterns, and tokens that match the design intent. Reuse what the project already has instead of generating new code from scratch.
4. Honor the response's hints by priority:
   - Code Connect snippets → use the mapped codebase component directly
   - Component documentation links → follow them for usage and guidelines
   - Design annotations → follow any designer notes or constraints
   - Design tokens as CSS variables → map to the project's token system
   - Raw hex / absolute positioning → loosely structured; use the screenshot

CODE-TO-DESIGN WORKFLOW (code → Figma):
1. Load the /figma-generate-design skill if available.
2. ALWAYS call search_design_system first to find existing components, variables, and styles to reuse — never generate components from scratch if a design system match exists.
3. For web app pages, use both tools in parallel: generate_figma_design to capture a pixel-perfect screenshot, and use_figma to build the screen from imported design system components. Refine use_figma output against the screenshot, then delete the screenshot reference.
4. For non-web targets (iOS, Android, generic UI), use use_figma with search_design_system.
5. For updating or syncing a Figma page that has already been captured, use use_figma — even if the source code has changed.

FROM-SCRATCH DESIGN WORKFLOW (no source design or code):
1. Load the /figma-generate-design skill if available.
2. Call search_design_system and get_libraries to find existing components, tokens, and styles. Build from these primitives.
3. Use create_new_file if no target file exists, then use_figma to assemble the design from design system components.

DESIGN SYSTEM / LIBRARY WORKFLOW:
- To build or extend a design system in Figma from a codebase, load the /figma-generate-library skill.
- To map Figma components to codebase components, load the /figma-code-connect skill.