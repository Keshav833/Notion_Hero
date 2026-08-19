# Decisions

## Implementation Strategy

Built the page as a React + TypeScript application using Vite. Kept the implementation lightweight and avoided introducing a component library or unnecessary application dependencies. Local assets from `public/` are used for the hero video, brand logos, founder portraits, feature artwork, and agent icons.

The page is organized into reusable visual sections including sticky navigation, animated hero, brand wall, feature cards, agent prompts, customer proof, CTA, and footer. The hero word effect uses React state with a timed word rotation and CSS transitions. Feature and proof sections use CSS Grid and responsive media queries so the layout adapts across screen sizes.

## Alternative

A more formal component-driven design system could have been introduced for cards, buttons, navigation menus, and responsive sections. This would improve reuse and consistency for a larger product, but would add setup and abstraction overhead for a single-page implementation. The chosen approach favors fast iteration while keeping the code straightforward and easy to understand.

## Time-Limit Trade-Off

Priority was given to the visible homepage structure, local asset usage, responsive behavior, sticky navigation, and build/lint validation. Some interactions remain lightweight anchors rather than full application flows, and several brand marks without local assets are represented typographically.

With more time, I would split the longer JSX sections into more focused components, add automated interaction tests, verify the page across desktop and mobile browsers with screenshots, improve keyboard behavior for dropdowns and the language control, and replace remaining text-based brand marks with verified logo assets.

## AI Usage

AI was used as an implementation assistant for targeted code exploration, JSX/CSS edits, responsive layout suggestions, asset mapping, and build/lint troubleshooting. All generated changes were reviewed against the supplied visual references and adjusted iteratively in the workspace.

AI was not used as a substitute for checking local asset names, browser behavior, or project validation commands. The final implementation and design decisions were reviewed and verified locally.
