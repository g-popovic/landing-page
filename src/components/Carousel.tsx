"use client";

import "./Carousel.css";
import { useCallback, useEffect, useRef, type ReactElement } from "react";

type CarouselProps = {
	items: ReactElement[];
};

const AUTO_SCROLL_PX_PER_MS = 0.073;
const ARROW_STEP = 400;

export default function Carousel({ items }: CarouselProps) {
	const viewportRef = useRef<HTMLDivElement>(null);
	const firstGroupRef = useRef<HTMLDivElement>(null);
	const singleGroupWidthRef = useRef(0);
	const isAutoScrollActiveRef = useRef(true);
	const isHoverPausedRef = useRef(false);
	const frameRef = useRef<number | null>(null);
	const lastFrameTimeRef = useRef<number | null>(null);

	const stopAutoScroll = useCallback(() => {
		isAutoScrollActiveRef.current = false;

		if (frameRef.current !== null) {
			cancelAnimationFrame(frameRef.current);
			frameRef.current = null;
		}

		lastFrameTimeRef.current = null;
	}, []);

	const normalizeScrollLeft = useCallback((nextScrollLeft: number) => {
		const viewport = viewportRef.current;
		const singleGroupWidth = singleGroupWidthRef.current;

		if (!viewport || singleGroupWidth <= 0) return 0;

		let normalized = nextScrollLeft;

		if (normalized >= singleGroupWidth) {
			normalized %= singleGroupWidth;
			viewport.scrollLeft = normalized;
		}

		if (normalized < 0) {
			normalized = singleGroupWidth + (normalized % singleGroupWidth);
			viewport.scrollLeft = normalized;
		}

		return normalized;
	}, []);

	useEffect(() => {
		// Ensure auto-scroll is active on initial mount/re-render.
		isAutoScrollActiveRef.current = true;
		lastFrameTimeRef.current = null;
	}, [items.length]);

	useEffect(() => {
		const measure = () => {
			const firstGroupWidth = firstGroupRef.current?.scrollWidth ?? 0;
			singleGroupWidthRef.current = firstGroupWidth;
		};

		measure();

		const resizeObserver = new ResizeObserver(measure);
		if (firstGroupRef.current) resizeObserver.observe(firstGroupRef.current);
		window.addEventListener("resize", measure);

		return () => {
			resizeObserver.disconnect();
			window.removeEventListener("resize", measure);
		};
	}, [items.length]);

	useEffect(() => {
		const viewport = viewportRef.current;
		if (!viewport) return;

		const handleScroll = () => {
			normalizeScrollLeft(viewport.scrollLeft);
		};

		viewport.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			viewport.removeEventListener("scroll", handleScroll);
		};
	}, [normalizeScrollLeft]);

	useEffect(() => {
		const viewport = viewportRef.current;
		if (!viewport) return;

		const step = (timestamp: number) => {
			if (!isAutoScrollActiveRef.current) return;

			if (lastFrameTimeRef.current === null) {
				lastFrameTimeRef.current = timestamp;
			}

			const delta = timestamp - lastFrameTimeRef.current;
			lastFrameTimeRef.current = timestamp;

			if (isHoverPausedRef.current) {
				frameRef.current = requestAnimationFrame(step);
				return;
			}

			const nextScrollLeft = viewport.scrollLeft + delta * AUTO_SCROLL_PX_PER_MS;
			viewport.scrollLeft = nextScrollLeft;
			normalizeScrollLeft(nextScrollLeft);

			frameRef.current = requestAnimationFrame(step);
		};

		if (isAutoScrollActiveRef.current) {
			frameRef.current = requestAnimationFrame(step);
		}

		return () => {
			if (frameRef.current !== null) {
				cancelAnimationFrame(frameRef.current);
				frameRef.current = null;
			}
		};
	}, [normalizeScrollLeft]);

	const scrollByStep = useCallback(
		(direction: 1 | -1) => {
			stopAutoScroll();

			const viewport = viewportRef.current;
			const singleGroupWidth = singleGroupWidthRef.current;
			if (!viewport || singleGroupWidth <= 0) return;

			const target = viewport.scrollLeft + direction * ARROW_STEP;

			if (target >= singleGroupWidth) {
				viewport.scrollLeft = target - singleGroupWidth;
				return;
			}

			if (target < 0) {
				viewport.scrollLeft = singleGroupWidth + target;
				return;
			}

			viewport.scrollTo({
				left: target,
				behavior: "smooth"
			});
		},
		[stopAutoScroll]
	);

	const handleMouseEnter = useCallback(() => {
		isHoverPausedRef.current = true;
		lastFrameTimeRef.current = null;
	}, []);

	const handleMouseLeave = useCallback(() => {
		isHoverPausedRef.current = false;
		lastFrameTimeRef.current = null;
	}, []);

	if (items.length === 0) return null;

	return (
		<div className='carousel'>
			<button
				type='button'
				className='carousel-arrow carousel-arrow-left'
				onClick={() => scrollByStep(-1)}
				aria-label='Pomjeri ulijevo'>
				<span aria-hidden='true'>‹</span>
			</button>

			<div
				className='carousel-viewport'
				ref={viewportRef}
				tabIndex={0}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				aria-label='Karusel projekata'>
				<div className='carousel-track'>
					<div className='carousel-group' ref={firstGroupRef}>
						{items.map((item, index) => (
							<div
								className='carousel-slide'
								key={`carousel-item-${index}`}
								onClick={stopAutoScroll}>
								{item}
							</div>
						))}
					</div>
					<div className='carousel-group' aria-hidden='true'>
						{items.map((item, index) => (
							<div className='carousel-slide' key={`carousel-clone-${index}`}>
								{item}
							</div>
						))}
					</div>
				</div>
			</div>

			<button
				type='button'
				className='carousel-arrow carousel-arrow-right'
				onClick={() => scrollByStep(1)}
				aria-label='Pomjeri udesno'>
				<span aria-hidden='true'>›</span>
			</button>
		</div>
	);
}
