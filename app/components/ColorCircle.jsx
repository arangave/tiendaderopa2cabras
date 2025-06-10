// components/ColorCircle.jsx
export default function ColorCircle({ hex, size = 28, selected = false, onClick }) {
  const colors = hex.split("/");
  const style = {
    width: size,
    height: size,
    borderRadius: "50%",
    border: selected ? "2.5px solid #000" : "1px solid #888",
    cursor: onClick ? "pointer" : undefined,
    display: "inline-block",
    margin: 2,
  };

  if (colors.length === 1) {
    style.background = colors[0];
  } else {
    const degreeStep = 360 / colors.length;
    const stops = colors.map((c, i) => {
      const start = i * degreeStep;
      const end = (i + 1) * degreeStep;
      return `${c} ${start}deg ${end}deg`;
    });
    style.background = `conic-gradient(${stops.join(", ")})`;
  }

  return <span style={style} onClick={onClick} />;
}
