import { useState } from "react";
import TabelaSolicitacao from "./TabelaSolicitacao";
import "./styles/Colaborador.css";
import Sidebar from "../Sidebar/Sidebar";

export default function Colaborador() {

    const [requests, setRequests] = useState([
        {
            id: 1,
            code: "REG-2024-005",
            name: "Carlos Ferreira",
            email: "carlos@empresa.com",
            company: "Tech Solutions",
            date: "09/04/2026",
            time: "14:00",
            type: "Fornecedor",
            status: "Pendente",
        },
        {
            id: 2,
            code: "REG-2024-006",
            name: "Ana Costa",
            email: "ana@empresa.com",
            company: "Consultoria ABC",
            date: "10/04/2026",
            time: "10:00",
            type: "Visitante",
            status: "Pendente",
        },
        {
            id: 3,
            code: "REG-2024-007",
            name: "Roberto Lima",
            email: "roberto@empresa.com",
            company: "Serviços Express",
            date: "11/04/2026",
            time: "09:00",
            type: "Prestador",
            status: "Pendente",
        },
    ]);

    const [selectedRequest, setSelectedRequest] = useState(null);

    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);

    const [rejectReason, setRejectReason] = useState("");

    function handleApproveClick(request) {
        setSelectedRequest(request);
        setShowApproveModal(true);
    }

    function handleRejectClick(request) {
        setSelectedRequest(request);
        setShowRejectModal(true);
    }

    function confirmApprove() {

        const updatedRequests = requests.map((req) =>
            req.id === selectedRequest.id
                ? { ...req, status: "Confirmado" }
                : req
        );

        setRequests(updatedRequests);

        setShowApproveModal(false);
    }

    function confirmReject() {

        const updatedRequests = requests.map((req) =>
            req.id === selectedRequest.id
                ? { ...req, status: "Recusado" }
                : req
        );

        setRequests(updatedRequests);

        setShowRejectModal(false);
        setRejectReason("");
    }

    return (
        <div className="colaborador-container">

            <div className="layout">

                <Sidebar titulo="Painel do Colaborador" />

                <div className="conteudo-pagina">

                    <div className="colaborador-container">

                        <div className="colaborador-header">
                            <h2>Painel do Colaborador</h2>
                            <p>Gerencie os cadastros vinculados ao seu nome</p>
                        </div>

                        <div className="alert-box">
                            <h4>
                                Você tem 3 cadastros pendentes de aprovação
                            </h4>

                            <p>
                                Revise e aprove os cadastros para liberar o acesso dos visitantes
                            </p>
                        </div>

                        <div className="table-container">

                            <TabelaSolicitacao
                                requests={requests}
                                onApprove={handleApproveClick}
                                onReject={handleRejectClick}
                            />

                        </div>

                    </div>

                </div>

            </div>

            {/* MODAL APROVAÇÃO */}

            {showApproveModal && (
                <div className="modal-overlay">

                    <div className="modal">

                        <h3>Confirmar Aprovação</h3>

                        <p>
                            Você está prestes a aprovar o cadastro de{" "}
                            <strong>{selectedRequest.name}</strong> para visita no dia{" "}
                            <strong>{selectedRequest.date}</strong> às{" "}
                            <strong>{selectedRequest.time}</strong>.
                        </p>

                        <div className="modal-actions">

                            <button
                                className="btn-cancel"
                                onClick={() => setShowApproveModal(false)}
                            >
                                Cancelar
                            </button>

                            <button
                                className="btn-confirm"
                                onClick={confirmApprove}
                            >
                                Confirmar Aprovação
                            </button>

                        </div>

                    </div>

                </div>
            )}

            {/* MODAL RECUSA */}

            {showRejectModal && (
                <div className="modal-overlay">

                    <div className="modal">

                        <h3>Recusar Cadastro</h3>

                        <p>
                            Informe o motivo da recusa do cadastro de{" "}
                            <strong>{selectedRequest.name}</strong>
                        </p>

                        <textarea
                            placeholder="Digite o motivo da recusa..."
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                        />

                        <div className="modal-actions">

                            <button
                                className="btn-cancel"
                                onClick={() => setShowRejectModal(false)}
                            >
                                Cancelar
                            </button>

                            <button
                                className="btn-reject-modal"
                                onClick={confirmReject}
                            >
                                Confirmar Recusa
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}