import json from './data.json';

export async function getPersonsApi() {
  await sleep(1000);
  return json;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
