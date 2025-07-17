import ReactConfetti from "react-confetti";

const SamsConfetti = () => {
  return (
    <>
      <ReactConfetti
        colors={["#1454F5", "#5C82F7"]}
        drawShape={(ctx) => {
          const size = 10;
          const radius = 2;

          const top = { x: 0, y: -size };
          const right = { x: size, y: 0 };
          const bottom = { x: 0, y: size };
          const left = { x: -size, y: 0 };

          ctx.beginPath();

          ctx.moveTo(0, -size + radius);

          ctx.quadraticCurveTo(top.x, top.y, radius, -size + radius);
          ctx.lineTo(size - radius, 0);
          ctx.quadraticCurveTo(right.x, right.y, size - radius, radius);

          ctx.lineTo(radius, size - radius);
          ctx.quadraticCurveTo(bottom.x, bottom.y, 0, size - radius);

          ctx.lineTo(-size + radius, 0);
          ctx.quadraticCurveTo(left.x, left.y, -size + radius, -radius);

          ctx.lineTo(-radius, -size + radius);
          ctx.quadraticCurveTo(top.x, top.y, 0, -size + radius);

          ctx.closePath();
          ctx.fill();
        }}
        style={{ zIndex: "100" }}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </>
  );
};

export default SamsConfetti;
