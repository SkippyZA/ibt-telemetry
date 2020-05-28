module.exports = {
  extends:  [ 'plugin:@typescript-eslint/recommended' ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion:  2018,
    sourceType: 'module',
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",               // TODO: Remove
    "@typescript-eslint/explicit-function-return-type": "off", // TODO: Remove
    "@typescript-eslint/indent": [ "error", 2 ],
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        "multiline": {
          "delimiter": "none",
          "requireLast": false
        }
      }
    ],

    "array-bracket-spacing": ["error", "always", { "objectsInArrays": false, "arraysInArrays": false }],
    "object-curly-spacing": ["error", "always"],
    "space-before-function-paren": ["error", "always"],
    "eol-last": ["error", "always"],
    "comma-dangle": ["error", "never"],
  }
}
