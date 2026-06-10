#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { validateWorkUnitStatus } from './lib/work-unit-machine.mjs';

const root = process.cwd();
const args = process.argv.slice(2);
const errors = [];

function relative(file) {
  return path.relative(root, file).replaceAll(path.sep, '/');
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    errors.push(`${relative(file)}: invalid JSON: ${error.message}`);
    return null;
  }
}

function statusFilesUnder(baseDir) {
  if (!fs.existsSync(baseDir)) return [];
  const out = [];
  const stack = [baseDir];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const absolute = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(absolute);
      } else if (entry.isFile() && entry.name === 'status.json') {
        out.push(absolute);
      }
    }
  }
  return out.sort();
}

function topLevelWorkUnitStatusFiles() {
  const baseDir = path.join(root, 'docs/plans/work-units');
  if (!fs.existsSync(baseDir)) return [];
  return fs.readdirSync(baseDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(baseDir, entry.name, 'status.json'))
    .filter((file) => fs.existsSync(file))
    .sort();
}

function expectedWorkUnitId(file) {
  return path.basename(path.dirname(file));
}

function validateFile(file) {
  const status = readJson(file);
  if (!status) return false;
  const fileErrors = validateWorkUnitStatus(status, {
    source: relative(file),
    expectedWorkUnitId: expectedWorkUnitId(file),
  });
  errors.push(...fileErrors);
  return fileErrors.length === 0;
}

function runSelfTest() {
  const validFiles = statusFilesUnder(path.join(root, 'evals/work-units/fixtures/valid'));
  const invalidFiles = statusFilesUnder(path.join(root, 'evals/work-units/fixtures/invalid'));

  if (validFiles.length === 0) {
    errors.push('self-test must include at least one valid work-unit fixture');
  }
  if (invalidFiles.length < 8) {
    errors.push('self-test must include invalid fixtures for schema, id, role, reviewer, gatekeeper, events, and evidence boundaries');
  }

  for (const file of validFiles) {
    validateFile(file);
  }

  for (const file of invalidFiles) {
    const status = readJson(file);
    if (!status) continue;
    const fileErrors = validateWorkUnitStatus(status, {
      source: relative(file),
      expectedWorkUnitId: expectedWorkUnitId(file),
    });
    if (fileErrors.length === 0) {
      errors.push(`${relative(file)}: invalid fixture unexpectedly passed`);
    }
  }
}

if (args.includes('--self-test')) {
  runSelfTest();
} else {
  const explicitFiles = args.filter((arg) => !arg.startsWith('-'));
  const files = explicitFiles.length
    ? explicitFiles.map((file) => path.resolve(root, file))
    : topLevelWorkUnitStatusFiles();

  for (const file of files) {
    validateFile(file);
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}

console.log(args.includes('--self-test')
  ? 'Validated work-unit status fixtures.'
  : 'Validated work-unit status artifacts.');
