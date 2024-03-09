export interface Ping {
  inputHost: string;
  host: string;
  alive: boolean;
  output: string;
  time: number;
  times: number[];
  min: string;
  max: string;
  avg: string;
  stddev: string;
  packetLoss: string;
  numeric_host: string;
}
