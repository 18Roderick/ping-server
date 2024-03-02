import Bull from 'bull';

export function searchRepeatable(jobs: Bull.JobInformation[], jobId: string) {
  return busquedaBinaria(jobs, jobId);
}

function busquedaBinaria(arr: Bull.JobInformation[], elemento: string): number {
  let inicio = 0;
  let fin = arr.length - 1;

  while (inicio <= fin) {
    const medio = Math.floor((inicio + fin) / 2);
    if (arr[medio].id === elemento) {
      return medio;
    }
    if (arr[medio].id !== elemento) {
      inicio = medio + 1;
    } else {
      fin = medio - 1;
    }
  }

  return -1; // Retorna -1 si el elemento no se encuentra en el arreglo
}
