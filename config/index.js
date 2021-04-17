// eslint-disable-next-line import/no-commonjs
const path = require("path");

function resolve(dir) {
  return path.resolve(__dirname, "..", dir);
}

const config = {
  projectName: "lzms-taro",
  date: "2019-6-11",
  designWidth: 750,
  deviceRatio: {
    "640": 2.34 / 2,
    "750": 1,
    "828": 1.81 / 2,
  },
  sourceRoot: "src",
  outputRoot: "dist",
  plugins: {
    babel: {
      sourceMap: true,
      presets: [
        [
          "env",
          {
            modules: false,
          },
        ],
      ],
      plugins: [
        "transform-decorators-legacy",
        "transform-class-properties",
        "transform-object-rest-spread",
      ],
    },
    //压缩js
    uglify: {
      enable: true,
      config: {
        warnings: false,
        // 配置项同 https://github.com/mishoo/UglifyJS2#minify-options
        compress: {
          drop_debugger: true,
          drop_console: true,
        },
      },
    },
    //压缩css
    csso: {
      enable: true,
      config: {
        // 配置项同 https://github.com/css/csso#minifysource-options
      },
    },
  },
  defineConstants: {},
  alias: {
    "@": resolve("src"),
  },
  copy: {
    patterns: [{ from: "src/config/sitemap.json", to: "dist/sitemap.json" }],
    options: {},
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: ["last 3 versions", "Android >= 4.1", "ios >= 8"],
          },
        },
        pxtransform: {
          enable: true,
          config: {},
        },
        url: {
          enable: true,
          config: {
            limit: 10240, // 设定转换尺寸上限
          },
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
    },
    compile: {
      compressTemplate: true,
    },
  },
  h5: {
    devServer: {
      host: "localhost",
      port: 8903,
      hot: true,
    },
    publicPath: "/",
    staticDirectory: "static",
    esnextModules: ["taro-ui"],
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: ["last 3 versions", "Android >= 4.1", "ios >= 8"],
          },
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
