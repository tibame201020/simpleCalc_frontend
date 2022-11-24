export interface Record {
  id: number;
  category: string;
  recordTime: number;
  item: string;
  price: number;
  unit: string;
  count: number;
  ps: string;
}

export interface RecordForm {
  filterKey: string;
  category: string;
  startTime: number;
  endTime: number;
  item: string;
}
