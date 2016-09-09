/**
 * Clover report class.
 * @module clover-report
 */

import XMLWriter from 'xml-writer';

function objectSubkeyValueSum(obj, subkey) {
  return Object.keys(obj).reduce((result, key) => {
    return result + obj[key][subkey];
  }, 0);
}

function omit(keyToOmit, obj) {
  return Object.keys(obj).reduce((result, key) => {
    if (key === keyToOmit) { return result; }
    result[key] = obj[key];
    return result;
  }, {});
}

export default class CloverReport extends XMLWriter {

  constructor({indent, writer, timestamp}) {
    super(indent, writer);
    this.reportTimestamp = Math.floor(Date.now() / 1000);
    this.projectTimestamp = timestamp;
  }

  startReport() {
    return this
      .startDocument('1.0', 'UTF-8')
      .startElement('coverage')
      .writeAttribute('generated', this.reportTimestamp)
      .writeAttribute('clover', '3.2.0');
  }

  endReport() {
    return this
      .endElement()
      .endDocument();
  }

  startProject(name) {
    this
      .startElement('project')
      .writeAttribute('name', name);
    if (this.projectTimestamp) {
      this.writeAttribute('timestamp', this.projectTimestamp);
    }
    return this;
  }

  endProject() {
    return this.endElement();
  }

  writeMetricsAttributes(metrics) {
    const metricsWithoutLines = omit('line', metrics);
    const elements = objectSubkeyValueSum(metricsWithoutLines, 'total');
    const coveredElements = objectSubkeyValueSum(metricsWithoutLines, 'covered');
    return this
      .writeAttribute('statements', metrics.statement.total)
      .writeAttribute('coveredstatements', metrics.statement.covered)
      .writeAttribute('conditionals', metrics.branch.total)
      .writeAttribute('coveredconditionals', metrics.branch.covered)
      .writeAttribute('methods', metrics.function.total)
      .writeAttribute('coveredmethods', metrics.function.covered)
      .writeAttribute('elements', elements)
      .writeAttribute('coveredelements', coveredElements)
      .writeAttribute('loc', metrics.line.total)
      .writeAttribute('ncloc', metrics.line.total - metrics.line.covered);
  }

  addProjectMetrics({metrics, packages, files}) {
    return this
      .startElement('metrics')
      .writeMetricsAttributes(metrics)
      .writeAttribute('complexity', 0)
      .writeAttribute('packages', packages.length)
      .writeAttribute('files', files.length)
      .writeAttribute('classes', files.length)
      .endElement();
  }

  startPackage(name) {
    return this
      .startElement('package')
      .writeAttribute('name', name);
  }

  endPackage() {
    return this.endElement();
  }

  addPackageMetrics(metrics) {
    return this
      .startElement('metrics')
      .writeMetricsAttributes(metrics)
      .endElement();
  }

  startFile({name, path}) {
    return this
      .startElement('file')
      .writeAttribute('name', name)
      .writeAttribute('path', path);
  }

  endFile() {
    return this.endElement();
  }

  addFileMetrics(metrics) {
    return this
      .startElement('metrics')
      .writeMetricsAttributes(metrics)
      .endElement();
  }

  addLine({line, count}) {
    return this
      .startElement('line')
      .writeAttribute('num', line)
      .writeAttribute('count', count)
      .writeAttribute('type', 'stmt') // TODO: can there be many types?
      .endElement();
  }

}
