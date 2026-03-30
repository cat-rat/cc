module.exports = {
  defaultSeverity: 'error',
  plugins: ['stylelint-order'],
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'selector-class-pattern': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'global']
      }
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted']
      }
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen']
      }
    ],
    'order/properties-alphabetical-order': true,
    'scss/at-import-partial-extension': null,
    'scss/at-rule-no-unknown': true
  }
}
