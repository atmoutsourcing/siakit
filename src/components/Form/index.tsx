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
export { Color } from './Color';
export { DatePicker } from './DatePicker';
export { Input } from './Input';
export { Language } from './Language';
export { Mask } from './Mask';
export { Money } from './Money';
export { InputNumber } from './InputNumber';
export { Password } from './Password';
export { Phone } from './Phone';
export { Radio } from './Radio';
export { Slider } from './Slider';
export { Switch } from './Switch';
export { TextArea } from './TextArea';
export { TimePicker } from './TimePicker';
export { PercentageInput } from './PercentageInput';
export { Pin } from './Pin';
