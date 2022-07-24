import { FormHandles as UnformFormHandle } from '@unform/core';
import { Form as UnformForm } from '@unform/web';
import styled from 'styled-components';

import { flexStyle } from '../Flex/styles';

export const Form = styled(UnformForm)`
  ${flexStyle};
`;

export type FormHandles = UnformFormHandle;

export { Select } from './Select';
export { SelectMulti } from './SelectMulti';
export { Checkbox } from './Checkbox';
export { ColorPicker } from './ColorPicker';
export { DatePicker } from './DatePicker';
export { Input } from './Input';
export { LanguagePicker } from './LanguagePicker';
export { MaskInput } from './MaskInput';
export { MoneyInput } from './MoneyInput';
export { NumberInput } from './NumberInput';
export { PasswordInput } from './PasswordInput';
export { PhoneInput } from './PhoneInput';
export { Radio } from './Radio';
export { Slider } from './Slider';
export { Switch } from './Switch';
export { TextArea } from './TextArea';
export { TimePicker } from './TimePicker';
export { PercentageInput } from './PercentageInput';
export { PinInput } from './PinInput';
