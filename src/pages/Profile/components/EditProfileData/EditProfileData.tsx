import React, { useRef } from 'react';
import classNames from 'classnames';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { Loader } from '../../../../shared/Form/Loader/Loader';
import {
  UpdateUserData,
  User,
} from '../../../../store/ducks/user/contracts/state';
import {
  onPhoneInput,
  onPhoneKeyDown,
  onPhonePaste,
} from '../../../../utils/phoneValidator';
import s from './EditProfileData.module.scss';
import { validationSchema } from './validationSchema';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MaskedInput from 'react-maskedinput';
import { Input } from '../../../../shared/Form/Input/Input';
import { DatePickerCustom } from '../../../../shared/Form/DatePicker/DatePickerCustom';
import { Button } from '../../../../shared/Form/Button/Button';
import {
  ISelect,
  SelectCustom,
} from '../../../../shared/Form/Select/SelectCustom';
import { FormsSvgSelector } from '../../../../assets/icons/forms/FormsSvgSelector';
import ru from 'date-fns/locale/ru';
import { useMobile } from '../../../../hooks/useMobile';

registerLocale('ru', ru);

interface Props {
  user: User | undefined;
  loader: boolean;
  image: string | ArrayBuffer | null;
  options: ISelect<string>[];
  onAvatarLoaded: (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => void;
  onSubmit: (values: UpdateUserData) => void;
}

export const EditProfileData = ({
  user,
  loader,
  image,
  options,
  onAvatarLoaded,
  onSubmit,
}: Props) => {
  function isDisabled(isValid: boolean, dirty: boolean) {
    return (!isValid && !dirty) || loader;
  }

  const isMobile = useMobile();
  console.log(isMobile);
  return (
    <div className={s.edit__password}>
      <Formik
        initialValues={{
          profile_photo: user?.profile_photo || null,
          lastname: user?.lastname || '',
          name: user?.name || '',
          email: user?.email || '',
          gender: [
            {
              value: user?.gender?.[0].value || '',
              label: user?.gender?.[0].label || '',
            },
          ],
          patronymic: user?.patronymic || '',
          phone: user?.phone || '',
          dob: user?.dob,
          id: user?.id,
        }}
        validateOnBlur
        onSubmit={(values: UpdateUserData) => onSubmit(values)}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          handleSubmit,
          dirty,
          setFieldValue,
        }) => (
          <form
            name="user_data"
            onSubmit={(e) => e.preventDefault()}
            className={s.form}
          >
            <div
              style={{
                backgroundImage: `url(${image})`,
              }}
              className={classNames({
                [s.image__loader__wrapper]: true,
                [s.error__image__wrapper]:
                  touched.profile_photo && errors.profile_photo,
              })}
            >
              <input
                type="file"
                name="profile_photo"
                accept=".png, .jpg, .jpeg, .gif"
                onChange={(e) => {
                  onAvatarLoaded(e, setFieldValue);
                }}
              />
              <FormsSvgSelector id="camera" />
              <span>Изменить</span>
            </div>

            <div className={s.text__inputs__wrapper}>
              <div className={s.small__input__wrapper}>
                <div className={s.input__wrapper}>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Фамилия"
                    name="lastname"
                    value={values.lastname}
                    type="text"
                    options={{ touched, errors }}
                  />
                </div>

                <div className={s.input__wrapper}>
                  <Input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Имя"
                    name="name"
                    value={values.name}
                    type="text"
                    options={{ touched, errors }}
                  />
                </div>
              </div>

              <div className={s.input__wrapper}>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  type="email"
                  options={{ touched, errors }}
                />
              </div>

              <div className={s.input__wrapper}>
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Отчество"
                  name="patronymic"
                  value={values.patronymic}
                  type="text"
                  options={{ touched, errors }}
                />
              </div>

              <div className={s.input__wrapper}>
                <DatePickerCustom
                  onChange={(date: Date) => setFieldValue('dob', date)}
                  onSelect={(date: Date) => setFieldValue('dob', date)}
                  onBlur={handleBlur}
                  name="dob"
                  locale={ru}
                  withPortal={isMobile}
                  selected={(values?.dob && new Date(values?.dob)) || null}
                  showYearDropdown
                  scrollableYearDropdown
                  maxDate={new Date()}
                  dateFormat={'P'}
                  options={{
                    touched,
                    errors,
                    label: 'Дата рождения',
                    yearDropdownItemNumber: 150,
                    customInput: (
                      <MaskedInput mask="11.11.1111" placeholder="dd.mm.yyyy" />
                    ),
                  }}
                />
              </div>

              <div className={s.input__wrapper}>
                <Input
                  onChange={handleChange}
                  onKeyDown={onPhoneKeyDown}
                  onInput={onPhoneInput}
                  onPaste={onPhonePaste}
                  onBlur={handleBlur}
                  placeholder="Телефон"
                  name="phone"
                  value={values.phone}
                  type="phone"
                  options={{ touched, errors }}
                />
              </div>

              <div className={s.input__wrapper}>
                <SelectCustom
                  onChange={(e: any) => {
                    setFieldValue('gender', [e]);
                  }}
                  placeholder="Выберите пол..."
                  onBlur={handleBlur}
                  name="gender"
                  value={(values.gender?.[0].label && values.gender) || null}
                  options={options}
                  settings={{ touched, errors }}
                />
              </div>
            </div>

            <div className={s.button__wrapper}>
              <Button
                disabled={isDisabled(isValid, dirty)}
                type="submit"
                onClick={() => handleSubmit()}
                options={{
                  content: loader ? <Loader /> : 'Сохранить',
                  setDisabledStyle: isDisabled(isValid, dirty),
                }}
              />

              <Link to="/profile">
                <Button
                  options={{
                    classes: { discard: true },
                    content: 'Отмена',
                  }}
                />
              </Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
