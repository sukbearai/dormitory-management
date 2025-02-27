/**
 * Whether to generate package preview
 * 是否生成打包报告
 */
export default {};

export function isReportMode(): boolean {
  // eslint-disable-next-line node/prefer-global/process
  return process.env.REPORT === 'true';
}
