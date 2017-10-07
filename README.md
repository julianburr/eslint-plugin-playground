# Get started

```bash
# Clone repo
git clone git@github.com:julianburr/eslint-plugin-playground.git

# Install dependencies of eslint plugin + create yarn link
cd eslint-plugin-playground
yarn
yarn link

# Install dependencies of example app + link the plugin to app
cd example
yarn
yarn link eslint-plugin-ensure-catch

# Run eslint on example/index.js
yarn lint

# Run eslint with fixer
yarn lint --fix

# 🎉
```
