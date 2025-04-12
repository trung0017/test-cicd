// eslint.config.js
import pluginJs from "@eslint/js";
import globals from "globals";
// Import toàn bộ cấu hình khuyến nghị của React
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  { ignores: ["dist", "node_modules", ".husky", ".vscode"] },

  // --- Cấu hình chung và JS cơ bản ---
  // Áp dụng các quy tắc cơ bản của ESLint trước
  pluginJs.configs.recommended,

  // --- Cấu hình cho React, Hooks, Refresh ---
  {
    // Bắt đầu bằng cách áp dụng toàn bộ cấu hình React khuyến nghị
    // Điều này bao gồm rules, settings, parser features và quan trọng là plugin 'react'
    ...pluginReactConfig,

    // Chỉ định các file áp dụng cấu hình này
    files: ["**/*.{js,jsx}"],

    // Bạn vẫn có thể tùy chỉnh languageOptions nếu cần
    languageOptions: {
      ...pluginReactConfig.languageOptions, // Kế thừa từ config React (nếu có)
      globals: {
        ...globals.browser,
        ...globals.node,
        // ...pluginReactConfig.languageOptions?.globals // Kế thừa globals từ config React (nếu có)
      },
      parserOptions: {
        // Kế thừa hoặc ghi đè nếu cần
        // ...pluginReactConfig.languageOptions?.parserOptions,
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          // ...pluginReactConfig.languageOptions?.parserOptions?.ecmaFeatures,
          jsx: true, // Đảm bảo JSX được bật
        },
      },
    },

    // Ghi đè hoặc bổ sung settings nếu cần
    settings: {
      ...pluginReactConfig.settings, // Kế thừa settings từ config React
      react: {
        version: "detect", // Đảm bảo tự động phát hiện phiên bản React
      },
    },

    // Thêm các plugin khác vào khối cấu hình này
    plugins: {
      // plugin 'react' đã được bao gồm trong pluginReactConfig rồi
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    // Ghi đè hoặc thêm các quy tắc SAU KHI đã áp dụng cấu hình React
    rules: {
      // Kế thừa các quy tắc từ pluginReactConfig (đã được áp dụng bởi dấu ...)
      // Ghi đè hoặc thêm quy tắc từ các plugin khác
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Quy tắc tùy chỉnh của bạn (ghi đè các quy tắc từ pluginReactConfig nếu cần)
      "no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "react/react-in-jsx-scope": "off", // Tắt quy tắc này cho React 17+
      "react/prop-types": "off", // Tắt nếu dùng TS hoặc không cần kiểm tra prop types
      // Bạn có thể tùy chỉnh các quy tắc 'react/...' khác ở đây nếu muốn
      // Ví dụ: 'react/display-name': 'off', // Nếu bạn muốn tắt quy tắc này
    },
  },

  // --- Áp dụng Prettier CUỐI CÙNG ---
  eslintPluginPrettierRecommended,
];
