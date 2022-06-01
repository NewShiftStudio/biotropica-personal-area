import React from 'react';
import classNames from 'classnames';

import s from '../Question.module.scss';

type Props = {
  value: number;
  placeholder: string;
  onChange(val: number): void;
};

export const NumberQuestion = ({ value, placeholder, onChange }: Props) => {
  return (
    <input
      className={classNames(s.textInput, s.without__arrows)}
      type="number"
      value={value.toString()}
      placeholder={placeholder}
      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(Number(e.target.value))
      }
    />
  );
};
