import path from 'node:path';
import fs from 'node:fs/promises';

const pathDailySummary = path.resolve(__dirname, '../../../scripts/dailySumary.sql');

export const dailySummary = () => {
  return fs.readFile(pathDailySummary, { encoding: 'utf8' });
};
