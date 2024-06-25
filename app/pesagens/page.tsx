"use client";

import React, { useState, useEffect } from 'react';
import { database } from '../lib/firebase';
import { ref, query, orderByChild, limitToLast, get, equalTo, startAt, endAt } from 'firebase/database';

interface Pesagem {
    ativo: string;
    ordemProducao: string;
    recursoBin: string;
    tara: string;
    pesoProduto: string;
    turno: string;
    pesagemType: string;
    operador: string;
    data: string;
}

const Pesagens: React.FC = () => {
    const [pesagens, setPesagens] = useState<Pesagem[]>([]);
    const [filter, setFilter] = useState({
        bin: '',
        ativo: '',
        op: '',
        data: ''
    });
    const [limitResults, setLimitResults] = useState(10);

    useEffect(() => {
        fetchPesagens();
    }, [limitResults, filter]);

    const fetchPesagens = async () => {
        try {
            const pesagensRef = ref(database, 'pesagens');
            let pesagensQuery = query(pesagensRef, orderByChild('data'), limitToLast(limitResults));

            if (filter.bin) {
                pesagensQuery = query(pesagensRef, orderByChild('recursoBin'), equalTo(filter.bin));
            }
            if (filter.ativo) {
                pesagensQuery = query(pesagensRef, orderByChild('ativo'), equalTo(filter.ativo));
            }
            if (filter.op) {
                pesagensQuery = query(pesagensRef, orderByChild('ordemProducao'), equalTo(filter.op));
            }
            if (filter.data) {
                pesagensQuery = query(pesagensRef, orderByChild('data'), startAt(filter.data), endAt(filter.data + "\uf8ff"));
            }

            const querySnapshot = await get(pesagensQuery);
            const data = querySnapshot.val() ? Object.values(querySnapshot.val()) as Pesagem[] : [];
            setPesagens(data);
        } catch (error) {
            console.error('Erro ao buscar as pesagens:', error);
        }
    };

    return (
        <div className="p-4 bg-white text-black">
            <h1 className="text-2xl mb-4">Últimas Pesagens</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Filtrar por Bin"
                    value={filter.bin}
                    onChange={(e) => setFilter({ ...filter, bin: e.target.value })}
                    className="p-2 border border-gray-300 mr-2"
                />
                <input
                    type="text"
                    placeholder="Filtrar por Ativo"
                    value={filter.ativo}
                    onChange={(e) => setFilter({ ...filter, ativo: e.target.value })}
                    className="p-2 border border-gray-300 mr-2"
                />
                <input
                    type="text"
                    placeholder="Filtrar por OP"
                    value={filter.op}
                    onChange={(e) => setFilter({ ...filter, op: e.target.value })}
                    className="p-2 border border-gray-300 mr-2"
                />
                <input
                    type="date"
                    placeholder="Filtrar por Data"
                    value={filter.data}
                    onChange={(e) => setFilter({ ...filter, data: e.target.value })}
                    className="p-2 border border-gray-300 mr-2"
                />
                <button onClick={fetchPesagens} className="px-4 py-2 bg-blue-600 text-white">
                    Filtrar
                </button>
            </div>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Ativo</th>
                        <th className="py-2">OP</th>
                        <th className="py-2">Recurso Bin</th>
                        <th className="py-2">Tara</th>
                        <th className="py-2">Peso Produto</th>
                        <th className="py-2">Turno</th>
                        <th className="py-2">Pesagem Type</th>
                        <th className="py-2">Operador</th>
                        <th className="py-2">Data</th>
                    </tr>
                </thead>
                <tbody>
                    {pesagens.map((pesagem, index) => (
                        <tr key={index} className="text-center border-t">
                            <td className="py-2">{pesagem.ativo}</td>
                            <td className="py-2">{pesagem.ordemProducao}</td>
                            <td className="py-2">{pesagem.recursoBin}</td>
                            <td className="py-2">{pesagem.tara} kg</td>
                            <td className="py-2">{pesagem.pesoProduto} kg</td>
                            <td className="py-2">{pesagem.turno}</td>
                            <td className="py-2">{pesagem.pesagemType}</td>
                            <td className="py-2">{pesagem.operador}</td>
                            <td className="py-2">{pesagem.data}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4">
                <button
                    onClick={() => setLimitResults(10)}
                    className={`px-4 py-2 mr-2 ${limitResults === 10 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
                >
                    Últimas 10
                </button>
                <button
                    onClick={() => setLimitResults(20)}
                    className={`px-4 py-2 mr-2 ${limitResults === 20 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
                >
                    Últimas 20
                </button>
                <button
                    onClick={() => setLimitResults(30)}
                    className={`px-4 py-2 ${limitResults === 30 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
                >
                    Últimas 30
                </button>
            </div>
        </div>
    );
};

export default Pesagens;
