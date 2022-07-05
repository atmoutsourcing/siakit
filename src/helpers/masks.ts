export const masks = {
  imei: '999999999999999',
  simcard: '99999999999999999999',
  zipcode: '99999-999',
  cpf: '999.999.999-99',
  cnpj: '99.999.999/9999-99',
  pis: '999.99999.99-9',
  code: '9999',
  phone: '(99) 99999-9999',
  hour: '99:99',
  minutes: '999:99',
  month: '99',
  year: '9999',
  trackNumber: 'AA999999999AA',
  monthAndYear: '99/9999',
};

export type MaskType = keyof typeof masks;
