/** Рівень критичності інциденту (1 = низький, 5 = критичний). */
export type IncidentSeverity = 1 | 2 | 3 | 4 | 5;

export type Incident = {
  id: string;
  title: string;
  severity: IncidentSeverity;
};

export type HandleResult = {
  handledBy: string;
  message: string;
};
