// Codigo propio de App_Veridis. Mantiene una responsabilidad concreta dentro de la app.

import { useEffect, useState } from 'react';

import { obtenerSintomas } from '../services/sintomaService';
import type { HealthAnswerMap, HealthQuestion } from '../types/plantHealth.types';

// Hook publico que devuelve estado y acciones listas para usar.
export function useCuestionarioSalud() {
  const [questions, setQuestions] = useState<HealthQuestion[]>([]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<HealthAnswerMap>({});
  const [observacionesUsuario, setObservacionesUsuario] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Efecto que sincroniza el estado de la pantalla con datos externos o cambios del usuario.
  useEffect(() => {
    let active = true;

    async function cargarSintomas() {
      setLoading(true);
      setError(null);

      try {
        const symptoms = await obtenerSintomas();

        if (active) {
          setQuestions([
            {
              id: 'sintomas',
              title: 'Que sintomas observas?',
              description: 'Selecciona los sintomas reales registrados en la base de datos.',
              multiple: true,
              options: symptoms.map((symptom) => ({
                id: symptom.id_sintoma.toString(),
                label: symptom.nombre,
                description: symptom.descripcion ?? undefined,
                symptomIds: [symptom.id_sintoma],
                priorityWeight: 1,
              })),
            },
          ]);
        }
      } catch (requestError) {
        if (active) {
          setQuestions([]);
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'No se han podido cargar los sintomas.'
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    cargarSintomas();

    return () => {
      active = false;
    };
  }, []);

  const currentQuestion = questions[step];
  const totalSteps = questions.length;
  const selectedOptions = currentQuestion ? answers[currentQuestion.id] ?? [] : [];
  const canGoNext = Boolean(currentQuestion) && selectedOptions.length > 0;

  function alternarOpcion(optionId: string) {
    if (!currentQuestion) return;

    setAnswers((prev) => {
      const previousSelected = prev[currentQuestion.id] ?? [];

      if (!currentQuestion.multiple) {
        return {
          ...prev,
          [currentQuestion.id]: [optionId],
        };
      }

      const alreadySelected = previousSelected.includes(optionId);

      return {
        ...prev,
        [currentQuestion.id]: alreadySelected
          ? previousSelected.filter((id) => id !== optionId)
          : [...previousSelected, optionId],
      };
    });
  }

  function irSiguiente() {
    if (step < totalSteps - 1) {
      setStep((prev) => prev + 1);
    }
  }

  function irAtras() {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  }

  return {
    questions,
    currentQuestion,
    step,
    totalSteps,
    answers,
    selectedOptions,
    observacionesUsuario,
    setObservacionesUsuario,
    loading,
    error,
    canGoNext,
    alternarOpcion,
    irSiguiente,
    irAtras,
  };
}
