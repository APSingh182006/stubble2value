<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep farm inputs and calculation state in the shared FarmProvider so comparison, buyers and impact reflect the same farm without requiring persistence.
- Keep illustrative buyer records, reuse options and calculation formulas in the browser-safe stubble module so demo data can be replaced consistently.
- Use separate content routes for calculator, options, buyers and impact, each with its own metadata, to preserve shareable navigation.
- Express application visual roles through the global semantic token system and shared Button variants to keep the cinematic style consistent.
