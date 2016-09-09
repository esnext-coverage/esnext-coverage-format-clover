/**
 * Summarizes files' metrics.
 * @module summarize-files
 */

export default function summarize(files) {
  return files.reduce((result, {metrics}) => {
    Object.keys(metrics).forEach(tagName => {
      const {covered, total} = metrics[tagName];
      if (result[tagName]) {
        result[tagName].covered += covered;
        result[tagName].total += total;
      } else {
        result[tagName] = {covered, total};
      }
    });
    return result;
  }, {});
}
