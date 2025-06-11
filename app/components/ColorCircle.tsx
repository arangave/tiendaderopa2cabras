interface ColorCircleProps {
  hex: string;
  size?: number;
  selected?: boolean;
  onClick?: () => void;
}

const ColorCircle = ({ hex, size = 28, selected = false, onClick }: ColorCircleProps) => {
  const colors = hex.split("/").map(c => c.trim()).filter(Boolean);

  const style: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: "50%",
    border: selected ? "2.5px solid #000" : "1px solid #888",
    cursor: onClick ? "pointer" : undefined,
    display: "inline-block",
    margin: 2,
    background: "#eee",
  };

  if (colors.length === 1) {
    style.background = colors[0];
  } else if (colors.length > 1) {
    const degreeStep = 360 / colors.length;
    const stops = colors.map((c, i) => {
      const start = i * degreeStep;
      const end = (i + 1) * degreeStep;
      return `${c} ${start}deg ${end}deg`;
    });
    // 👇 SOLO ESTO CAMBIA
    style.background = `conic-gradient(from -90deg, ${stops.join(", ")})`;
  }

  return <span style={style} onClick={onClick} />;
};

export default ColorCircle;

