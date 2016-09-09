/**
 * Analytics per file.
 * @module analyze-files
 */

import path from 'path';
import {metrics, tags, lines} from 'esnext-coverage-analytics';

const requiredTags = [
  'statement',
  'branch',
  'function'
];

function computeMetrics(coverageLocations) {
  const fileMetrics = tags(coverageLocations, requiredTags);
  return Object.keys(fileMetrics).reduce((result, tagName) => {
    result[tagName] = metrics(fileMetrics[tagName]);
    return result;
  }, {line: metrics(lines(coverageLocations))});
}

function analyzeFile(filePath, fileCoverage) {
  return {
    name: path.basename(filePath),
    path: filePath,
    lines: lines(fileCoverage.locations),
    metrics: computeMetrics(fileCoverage.locations)
  };
}

export default function analyzeFiles(filesCoverage) {
  return Object.keys(filesCoverage).map(filePath => {
    return analyzeFile(filePath, filesCoverage[filePath]);
  });
}
