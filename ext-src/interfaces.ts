export interface IVsCodeMessage {
  type: string;
  action: string;
  payload: any;
  source: string;
}
