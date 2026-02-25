"use client";

import { useEffect, useRef } from "react";

type Star = {
	x: number;
	y: number;
	vx: number;
	vy: number;
	speed: number;
	baseSize: number;
	alpha: number;
};

function rand(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

function createStar(
	width: number,
	height: number,
	cx: number,
	cy: number,
	warmStart: boolean
): Star {
	// Pick a random point on one of the 4 edges
	const side = Math.floor(Math.random() * 4); // 0 top, 1 right, 2 bottom, 3 left
	let ex = 0;
	let ey = 0;

	if (side === 0) {
		ex = Math.random() * width;
		ey = 0;
	} else if (side === 1) {
		ex = width;
		ey = Math.random() * height;
	} else if (side === 2) {
		ex = Math.random() * width;
		ey = height;
	} else {
		ex = 0;
		ey = Math.random() * height;
	}

	// Direction towards center
	const dx = cx - ex;
	const dy = cy - ey;
	const len = Math.hypot(dx, dy) || 1;
	const ux = dx / len;
	const uy = dy / len;

	// Warm start = place star somewhere along the edge -> center path
	// so the screen is already full on first frame
	const progress = warmStart ? Math.random() : 0; // 0=edge, 1=center
	const x = ex + dx * progress;
	const y = ey + dy * progress;

	return {
		x,
		y,
		vx: ux,
		vy: uy,
		speed: rand(15, 20), // px/sec
		baseSize: rand(0.5, 1),
		// baseSize: 1,
		alpha: rand(0.6, 0.9)
		// alpha: 0.5
	};
}

export default function StarsBackground() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) {
			return;
		}

		const ctx = canvas.getContext("2d");
		if (!ctx) {
			return;
		}

		let animationId = 0;
		let stars: Star[] = [];
		let lastTime = performance.now();

		const media = window.matchMedia("(prefers-reduced-motion: reduce)");
		const reducedMotion = () => media.matches;

		function resize() {
			if (!canvas || !ctx) {
				return;
			}

			const dpr = window.devicePixelRatio || 1;
			const width = window.innerWidth;
			const height = window.innerHeight;

			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			canvas.width = Math.floor(width * dpr);
			canvas.height = Math.floor(height * dpr);

			// Reset transform before scaling (important on resize)
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(dpr, dpr);

			// Star count scales with screen area
			const starCount = Math.max(120, Math.floor((width * height) / 8000));

			const cx = width / 2;
			const cy = height / 2;

			stars = Array.from(
				{ length: starCount },
				() => createStar(width, height, cx, cy, true) // warm start -> screen already populated
			);

			// If user prefers reduced motion, draw a static frame once
			if (reducedMotion()) {
				drawStatic(width, height, cx, cy);
			}
		}

		function drawStatic(width: number, height: number, cx: number, cy: number) {
			if (!canvas || !ctx) {
				return;
			}

			ctx.clearRect(0, 0, width, height);
			ctx.fillStyle = "#000";
			ctx.fillRect(0, 0, width, height);

			for (const s of stars) {
				const distToCenter = Math.hypot(cx - s.x, cy - s.y);
				const glowBoost = Math.max(0, 1 - distToCenter / Math.hypot(width, height));

				ctx.beginPath();
				ctx.fillStyle = `rgba(255,255,255,${Math.min(1, s.alpha + glowBoost * 0.25)})`;
				ctx.arc(s.x, s.y, s.baseSize + glowBoost * 1.2, 0, Math.PI * 2);
				ctx.fill();
			}
		}

		function frame(now: number) {
			if (!canvas || !ctx) {
				return;
			}

			const width = window.innerWidth;
			const height = window.innerHeight;
			const cx = width / 2;
			const cy = height / 2;

			let dt = (now - lastTime) / 1000;
			lastTime = now;

			// Avoid giant jumps when tab was inactive
			if (dt > 0.05) dt = 0.05;

			// Solid black background
			ctx.clearRect(0, 0, width, height);
			ctx.fillStyle = "#030303";
			ctx.fillRect(0, 0, width, height);

			for (let i = 0; i < stars.length; i++) {
				const s = stars[i];

				// Move towards center
				s.x += s.vx * s.speed * dt;
				s.y += s.vy * s.speed * dt;

				const distToCenter = Math.hypot(cx - s.x, cy - s.y);

				// Respawn from edge when star reaches center region
				if (distToCenter < 6) {
					stars[i] = createStar(width, height, cx, cy, false);
					continue;
				}

				// Slightly bigger/brighter as it approaches center (gives depth feel)
				// const t = 1 - Math.min(1, distToCenter / Math.hypot(width, height));
				// const size = s.baseSize + t * 1.8;
				// const alpha = Math.min(1, s.alpha + t * 0.35);

				const size = s.baseSize;
				const alpha = s.alpha;

				// Optional short trail (looks more like motion)
				// const trailLen = 6 + t * 10;
				// const tx = s.x - s.vx * trailLen;
				// const ty = s.y - s.vy * trailLen;

				// ctx.beginPath();
				// ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.35})`;
				// ctx.lineWidth = Math.max(0.5, size * 0.8);
				// ctx.moveTo(tx, ty);
				// ctx.lineTo(s.x, s.y);
				// ctx.stroke();

				ctx.beginPath();
				ctx.fillStyle = `rgba(255,255,255,${alpha})`;
				ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
				ctx.fill();
			}

			animationId = requestAnimationFrame(frame);
		}

		resize();

		if (!reducedMotion()) {
			animationId = requestAnimationFrame(frame);
		}

		const onResize = () => resize();
		window.addEventListener("resize", onResize);

		// If reduced-motion setting changes while page is open
		const onMotionChange = () => {
			cancelAnimationFrame(animationId);
			resize();
			lastTime = performance.now();
			if (!reducedMotion()) {
				animationId = requestAnimationFrame(frame);
			}
		};

		// Safari fallback
		if (media.addEventListener) {
			media.addEventListener("change", onMotionChange);
		} else {
			media.addListener(onMotionChange);
		}

		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener("resize", onResize);
			if (media.removeEventListener) {
				media.removeEventListener("change", onMotionChange);
			} else {
				media.removeListener(onMotionChange);
			}
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden='true'
			// style={{
			// 	position: "absolute",
			// 	inset: 0,
			// 	zIndex: 0,
			// 	pointerEvents: "none",
			// 	display: "block",
			// 	background: "#000"
			// }}
		/>
	);
}
