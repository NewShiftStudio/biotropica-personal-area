import React, { useState } from 'react';
import { AnalyzesCard } from './Card/Card';
import { BaseUser } from '../../@types/entities/BaseUser';
import { IInfoBar, InfoBar } from '../../shared/Global/InfoBar/InfoBar';
import { CreateAnalyzeAnswerDto } from '../../@types/dto/analyzes/create.dto';
import s from './Analyzes.module.scss';
import { AnalyzesAddModal } from './AddModal/AddModal';
import { AnalyzeAnswer } from '../../@types/entities/AnalyzeAnswer';
import { Analyze } from '../../@types/entities/Analyze';

interface Props {
  isAnalyzesLoading: boolean;
  isAddAnalyzeLoading: boolean;
  isModalOpen: boolean;
  analyzes: AnalyzeAnswer[];
  analyzeTypes: Analyze[];
  setIsModalOpen: (isOpen: boolean) => void;
  onAddAnalyze: (values: CreateAnalyzeAnswerDto) => void;
}

export const Analyzes = ({
  onAddAnalyze,
  isModalOpen,
  analyzes,
  analyzeTypes,
  isAnalyzesLoading,
  setIsModalOpen,
  isAddAnalyzeLoading,
}: Props) => {
  const analyzesInfoBar: IInfoBar = {
    title: 'Вы не добавляли анализы',
    text: 'У вас нет загруженных анализов.',
    bottomLink: 'Загрузить анализы',
    onClick: () => {
      setIsModalOpen(true);
    },
  };

  if (isAnalyzesLoading) {
    return (
      <div className={s.analyzes}>
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <>
      <div className={s.analyzes}>
        {analyzes.length ? (
          <AnalyzesCard
            analyzeTypes={analyzeTypes}
            onAddAnalyzeClick={() => setIsModalOpen(true)}
            analyzes={analyzes}
          />
        ) : (
          <InfoBar infoBar={analyzesInfoBar} />
        )}
      </div>
      {/* FIXME: вынести isOpen внутрь модалки */}
      {isModalOpen && (
        <AnalyzesAddModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={onAddAnalyze}
          isLoading={isAddAnalyzeLoading}
        />
      )}
    </>
  );
};
