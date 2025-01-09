module.exports = {
  '*.{js,jsx,ts,tsx}': ['next lint --fix', 'prettier --write'],
  '*.{json,md}': ['prettier --write'],
  '*.{js,ts,jsx,tsx}': 'next lint --fix'
};
