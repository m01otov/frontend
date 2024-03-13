import type { VariantType, OptionsWithExtraProps, SnackbarKey } from 'notistack';

export interface INotification extends OptionsWithExtraProps<VariantType> {
  key: SnackbarKey;
  
  message: string;
}
