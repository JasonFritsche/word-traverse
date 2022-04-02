export interface IToasterMessage {
  messageType: 'error' | 'info' | 'success' | 'warning';
  message: string;
  toastConfig?: {
    tapToDismiss?: boolean;
    easing?: string;
    easeTime?: number;
    timeOut?: number;
    positionClass?: string;
  };
}
