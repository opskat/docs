import type { LoadContext, Plugin } from "@docusaurus/types";

export default function tailwindPlugin(_context: LoadContext): Plugin {
  return {
    name: "tailwind-postcss",
    configurePostCss(postcssOptions) {
      postcssOptions.plugins.push(require("@tailwindcss/postcss"));
      return postcssOptions;
    },
  };
}
