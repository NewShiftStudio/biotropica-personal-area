import React, {
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { Goal as IGoal } from '../../../store/ducks/goal/contracts/state';
import { Goal } from '../components/Goal/Goal';

import s from './Goals.module.scss';
import SwiperCore, { Navigation } from 'swiper/core';
import { GlobalSvgSelector } from '../../../assets/icons/global/GlobalSvgSelector';
import { useSelector } from 'react-redux';
import { selectGoalsData } from '../../../store/ducks/goals/selectors';
SwiperCore.use([Navigation]);

interface Props {
  active: number;
}

const ButtonAddGoal = memo(() => {
  return (
    <Link to={'/goals/add'} className={s.btn__create__goal}>
      Создать новую цель
    </Link>
  );
});

export const Header = ({ active }: Props) => {
  const goals: IGoal[] = useSelector(selectGoalsData) || [];
  const sortGoals = [...goals].sort((a: IGoal, b: IGoal): any => {
    return Date.parse(b.createdAt) - Date.parse(a.createdAt);
  });

  return (
    <div className={s.goals__header}>
      <div className={s.goals__container}>
        <Swiper
          watchOverflow={true}
          navigation={{
            prevEl: '.left',
            nextEl: '.right',
          }}
          spaceBetween={20}
          slidesPerView={goals.length <= 3 ? goals.length : 3}
        >
          {sortGoals.map((goal: IGoal) => (
            <SwiperSlide key={goal.id}>
              <Goal active={active} goal={goal} />
            </SwiperSlide>
          ))}
        </Swiper>
        {goals.length > 3 && (
          <div>
            <div className={s.right + ' ' + 'right'}>
              <GlobalSvgSelector id="slider-right" />
            </div>
            <div className={s.left + ' ' + 'left'}>
              <GlobalSvgSelector id="slider-left" />
            </div>
          </div>
        )}
      </div>
      <ButtonAddGoal />
    </div>
  );
};
