import React, { createContext, useContext, useState } from 'react';

// Contexto temporário com dados de psicólogos para desenvolvimento
const PsicologosContext = createContext(null);

const consultasPadrao = {
  "2025-10-21": ["12:13", "14:30"],
  "2025-10-22": ["10:15"],
  "2025-10-24": ["09:00", "10:00", "16:45"],
  "2025-10-25": ["21:00"]
};

const psicologosInit = [
  {
    id: 1,
    nome: "Robson",
    idade: "229",
    local: "Santo andre",
    tags: ["Ansiedade", "Conflitos Familiares"],
    foto: null,
    horarios: consultasPadrao
  },
  {
    id: 2,
    nome: "Matheus",
    idade: "29",
    local: "SBC - SP",
    tags: ["Casais", "Socialidade"],
    foto: null,
    horarios: consultasPadrao
  },
  {
    id: 3,
    nome: "Alice",
    idade: "29",
    local: "Diadema",
    tags: ["Ansiedade", "Conflitos Familiares"],
    foto: null,
    horarios: consultasPadrao
  },
  {
    id: 4,
    nome: "Bruna",
    idade: "29",
    local: "São Paulo",
    tags: ["Burnout", "Insonia"],
    foto: null,
    horarios: consultasPadrao
  },
  {
    id: 5,
    nome: "Carlos",
    idade: "29",
    local: "Campinas",
    tags: ["Dependencia Química", "Ansiedade"],
    foto: null,
    horarios: consultasPadrao
  }
];

export function PsicologosProvider({ children }) {
  const [psicologos] = useState(psicologosInit);

  function getById(id) {
    return psicologos.find(p => p.id === id) || null;
  }

  function getByName(nome) {
    return psicologos.find(p => p.nome === nome) || null;
  }

  return (
    <PsicologosContext.Provider value={{ psicologos, getById, getByName }}>
      {children}
    </PsicologosContext.Provider>
  );
}

export function usePsicologos() {
  const ctx = useContext(PsicologosContext);
  if (!ctx) throw new Error('usePsicologos must be used within PsicologosProvider');
  return ctx;
}
