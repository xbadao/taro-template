export const pagePathCollection = {

  home: { path: "pages/home/index" },
};



export function getConfigData() {
  return {
    corsTargetDevelopment: "https://developexpress.panduolakeji.com",
  };
}

export const apiVersion = {
  version: ""
};

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
