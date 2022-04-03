import { IDestination } from './Destination';

export enum Status {
  'Private' = 'Private',
  'Public' = 'Public',
}

export interface ITrip {
  title: string;
  createdAt: Date;
  desc: string;
  _id: string;
  days: IDays[];
  status: Status;
  longitude: number;
  latidude: number;
  destination: IDestination;
}

export interface IDays {
  _id: string;
  number: number;
  title: string;
  description: string;
  destination: IDestination;
}
