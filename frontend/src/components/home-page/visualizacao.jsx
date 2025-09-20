import { Link } from "react-router";
import { CiGrid2H } from "react-icons/ci";
import { CiGrid2V } from "react-icons/ci";
import '../../assets/styles/home.css';


export default function Visualizacao({ visualizacao, setVisualizacao }) {
    
    return (
        <>
            <div className="container-visualizacao">
                <h1>Visualização</h1>
                <div className="col-and-row">
                    <button
                        className={`button-col${visualizacao === "col" ? " active" : ""}`}
                        onClick={() => setVisualizacao("col")}
                    >
                        <CiGrid2V className="icon-button" />
                    </button>
                    <button
                        className={`button-row${visualizacao === "row" ? " active" : ""}`}
                        onClick={() => setVisualizacao("row")}
                    >
                        <CiGrid2H className="icon-button" />
                    </button>
                </div>
            </div>
        </>
    )
}
