const globals = require("globals");
const eslint = require("@eslint/js");
const stylistic = require("@stylistic/eslint-plugin");

module.export = [
	{languageOptions: {globals: globals.node}},
	eslint.configs.recommended,
	stylistic.configs.customize({
		indent: "tab",
		quotes: "double",
		semi: true,
		jsx: false,
		arrowParens: true,
		braceStyle: "1tbs",
		blockSpacing: false,
	}),
	{
		rules: {
			"linebreak-style": [
				"error",
				"unix",
			],
			"@stylistic/object-curly-spacing": [
				"error",
				"never",
			],
			"@stylistic/operator-linebreak": ["error", "after"],
			"@stylistic/comma-dangle": ["error", {
				functions: "never",
				arrays: "always-multiline",
				objects: "always-multiline",
				imports: "always-multiline",
				exports: "always-multiline",
				enums: "always-multiline",
				generics: "always-multiline",
				tuples: "always-multiline",
			}],
			"max-len": [
				"error",
				{
					code: 120,
					ignoreUrls: true,
					ignoreRegExpLiterals: true,
				},
			],
			"no-implicit-coercion": [
				2,
				{allow: ["!!"]},
			],
		},
	},
];
