import { House, User, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import "./style/sidebar.css";

export default function Sidebar({ titulo }) {
    return (
        <aside className="sidebar">
            <div className="sidebar-topo">
                <h2 className="logo">VisitControl</h2>

                <nav className="sidebar-menu">
                    <Link to="/" className="sidebar-item">
                        <House size={18} />
                        <span>Início</span>
                    </Link>

                    <div className="sidebar-item ativo">
                        <ClipboardList size={18} />
                        <span>{titulo}</span>
                    </div>
                </nav>
            </div>

            <button className="sidebar-sair">
                Sair
            </button>
        </aside>
    );
}