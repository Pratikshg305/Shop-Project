import './StatsCard.css';

export default function StatsCard({ title, value, icon, color, subtitle }) {
  return (
    <div className="stats-card" style={{ borderLeftColor: color }}>
      <div className="stats-info">
        <p className="stats-title">{title}</p>
        <h3 className="stats-value">{value}</h3>
        {subtitle && <span className="stats-subtitle">{subtitle}</span>}
      </div>
      <div className="stats-icon" style={{ background: `${color}15`, color }}>
        {icon}
      </div>
    </div>
  );
}
