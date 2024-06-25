"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Autocomplete from "../components/Autocomplete";
import { database } from "../lib/firebase";
import { ref, set } from "firebase/database";

interface FormData {
  ativo: string;
  ordemProducao: string;
  recursoBin: string;
  tara: string;
  pesoProduto: string;
  turno: string;
  pesagemType: string;
  operador: string;
  data: string;
  lote: string;
}

const initialFormData: FormData = {
  ativo: "",
  ordemProducao: "",
  recursoBin: "",
  tara: "",
  pesoProduto: "",
  turno: "1º",
  pesagemType: "Pesagem Direta",
  operador: "",
  data: "",
  lote: ""
};

export default function Form() {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newRef = ref(database, 'pesagens/' + Date.now());
    try {
      await set(newRef, formData);
      alert('Dados enviados com sucesso!');
      setFormData(initialFormData); // Limpa o formulário após o envio
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert('Erro ao enviar dados');
    }
  };

  return (
    <div className="p-10 mt-20 shadow-md bg-gray-100 w-[600px]">
      <p className="pb-5 block uppercase tracking-wide text-gray-700 text-xls font-bold mb-2">Cadastrar pesagem</p>
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Ativo
            </label>
            <Autocomplete
              dataUrl="/medicamentos.txt"
              placeholder="Dipirona 500mg..."
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="ativo"
              type="text"
              value={formData.ativo}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Ordem de Produção
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="ordemProducao"
              type="text"
              placeholder="2180102..."
              value={formData.ordemProducao}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Lote
            </label>
            <input
              className="appearance-none block w-[510px] bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="lote"
              type="text"
              placeholder="S4D1234..."
              value={formData.lote}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Recurso Bin
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="recursoBin"
              type="text"
              placeholder="10003301"
              value={formData.recursoBin}
              onChange={handleChange}
            />
            <p className="text-gray-600 text-xs italic">Atenção ao preencher!</p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Tara
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="tara"
              type="number"
              step="0.01"
              placeholder="315.33"
              value={formData.tara}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Peso do Produto
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="pesoProduto"
              type="number"
              step="0.01"
              placeholder="536.64"
              value={formData.pesoProduto}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Turno
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="turno"
                value={formData.turno}
                onChange={handleChange}
              >
                <option>1º</option>
                <option>2º</option>
                <option>3º</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                {/* Ícone ou seta */}
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase mt-2 tracking-wide text-gray-700 text-xs font-bold mb-2">
              Tipo de Pesagem
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-[510px] bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="pesagemType"
                value={formData.pesagemType}
                onChange={handleChange}
              >
                <option>Pesagem Direta</option>
                <option>Pesagem Automática</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                {/* Ícone ou seta */}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Data
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="data"
              type="date"
              value={formData.data}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Operador
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="operador"
              type="text"
              placeholder="75710"
              value={formData.operador}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full flex-1 content-between justify-end px-3 ml-[350px] mt-10 p-3 md:mb-0">
            <button type="submit" className="w-[158px] h-12 bg-sky-800 shadow rounded-md cursor-pointer">
              Enviar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
