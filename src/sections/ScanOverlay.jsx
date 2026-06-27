import "../styles/ScanOverlay.css";

function ScanOverlay({ active }) {
  return (
    <div className={`scan-overlay ${active ? "active" : ""}`}>
      <div className="scan-line"></div>
    </div>
  );
}

export default ScanOverlay;