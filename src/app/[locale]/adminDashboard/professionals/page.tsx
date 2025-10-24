import React from 'react'
import { getProfessionals } from './actions/actions';
import View from './View';

export default async function ProfessionalsPage() {
  const professionals = await getProfessionals();

  return (
    <View professionals={professionals} />
  );
}
