export function chunkArray<T>(array: T[], size: number): T[][] {
  const chunkedArray: T[][] = [];

  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    chunkedArray.push(chunk);
  }

  return chunkedArray;
}