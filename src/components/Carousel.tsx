"use client";

import "./Carousel.css";
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
	type PointerEvent,
	type ReactElement,
	type TouchEvent,
	type WheelEvent,
} from "react";

type CarouselProps = {
	items: ReactElement[];
};

const AUTO_SCROLL_PX_PER_MS = 0.072;
const ARROW_STEP = 400;
const SHIFT_TRIGGER_RATIO_IN_SECOND_SET = 0.5;
const HORIZONTAL_SWIPE_THRESHOLD = 10;
const HORIZONTAL_WHEEL_THRESHOLD = 1;
const ARROW_SCROLL_DURATION_MS = 360;

export default function Carousel({ items }: CarouselProps) {
	const viewportRef = useRef<HTMLDivElement>(null);
	const firstGroupRef = useRef<HTMLDivElement>(null);
	const setWidthRef = useRef(0);
	const hasInitializedPositionRef = useRef(false);

	const [windowStart, setWindowStart] = useState(0);
	const [isAutoEnabled, setIsAutoEnabled] = useState(true);
	const isAutoEnabledRef = useRef(true);
	const isHoverPausedRef = useRef(false);
	const touchStartXRef = useRef<number | null>(null);
	const touchStartYRef = useRef<number | null>(null);

	const autoFrameRef = useRef<number | null>(null);
	const arrowFrameRef = useRef<number | null>(null);
	const lastAutoTimestampRef = useRef<number | null>(null);
	const pendingManualOffsetRef = useRef<number | null>(null);
	const pendingArrowDirectionRef = useRef<1 | -1 | 0>(0);

	const cancelAutoAnimation = useCallback(() => {
		if (autoFrameRef.current !== null) {
			cancelAnimationFrame(autoFrameRef.current);
			autoFrameRef.current = null;
		}
		lastAutoTimestampRef.current = null;
	}, []);

	const cancelArrowAnimation = useCallback(() => {
		if (arrowFrameRef.current !== null) {
			cancelAnimationFrame(arrowFrameRef.current);
			arrowFrameRef.current = null;
		}
	}, []);

	const measureSetMetrics = useCallback(() => {
		const firstGroup = firstGroupRef.current;
		if (!firstGroup) return;

		const track = firstGroup.parentElement;
		const trackStyle = track ? window.getComputedStyle(track) : null;
		const trackGap = Number.parseFloat(trackStyle?.columnGap || trackStyle?.gap || "0");
		const normalizedGap = Number.isFinite(trackGap) ? trackGap : 0;
		setWidthRef.current = firstGroup.scrollWidth + normalizedGap;
	}, []);

	const disableAutoScroll = useCallback(
		(queuedArrowDirection: 1 | -1 | 0 = 0) => {
			if (!isAutoEnabledRef.current) {
				if (queuedArrowDirection !== 0) {
					pendingArrowDirectionRef.current = queuedArrowDirection;
				}
				return;
			}

			const viewport = viewportRef.current;
			const firstGroup = firstGroupRef.current;
			const setWidth = setWidthRef.current;
			if (viewport && firstGroup && setWidth > 0) {
				const rawOffset = viewport.scrollLeft - firstGroup.offsetLeft;
				const normalizedOffset = ((rawOffset % setWidth) + setWidth) % setWidth;
				pendingManualOffsetRef.current = normalizedOffset;
			} else {
				pendingManualOffsetRef.current = 0;
			}

			pendingArrowDirectionRef.current = queuedArrowDirection;
			isAutoEnabledRef.current = false;
			setIsAutoEnabled(false);
			cancelAutoAnimation();
			cancelArrowAnimation();
		},
		[cancelArrowAnimation, cancelAutoAnimation]
	);

	const maybeShiftWindow = useCallback(() => {
		if (!isAutoEnabledRef.current) return;

		const viewport = viewportRef.current;
		const firstGroup = firstGroupRef.current;
		const setWidth = setWidthRef.current;
		if (!viewport || !firstGroup || setWidth <= 0) return;

		const secondSetMiddle =
			firstGroup.offsetLeft + setWidth * (1 + SHIFT_TRIGGER_RATIO_IN_SECOND_SET);
		if (viewport.scrollLeft < secondSetMiddle) return;

		viewport.scrollLeft -= setWidth;
		setWindowStart(prev => prev + 1);
	}, []);

	const animateManualStep = useCallback(
		(direction: 1 | -1) => {
			const viewport = viewportRef.current;
			if (!viewport) return;

			cancelArrowAnimation();

			const startScrollLeft = viewport.scrollLeft;
			const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
			const targetScrollLeft = Math.min(
				maxScrollLeft,
				Math.max(0, startScrollLeft + direction * ARROW_STEP)
			);
			const distance = targetScrollLeft - startScrollLeft;
			if (Math.abs(distance) < 0.5) return;

			let startTimestamp: number | null = null;

			const tick = (timestamp: number) => {
				if (startTimestamp === null) {
					startTimestamp = timestamp;
				}

				const progress = Math.min(1, (timestamp - startTimestamp) / ARROW_SCROLL_DURATION_MS);
				const eased = 1 - Math.pow(1 - progress, 3);
				viewport.scrollLeft = startScrollLeft + distance * eased;

				if (progress < 1) {
					arrowFrameRef.current = requestAnimationFrame(tick);
					return;
				}

				arrowFrameRef.current = null;
			};

			arrowFrameRef.current = requestAnimationFrame(tick);
		},
		[cancelArrowAnimation]
	);

	useEffect(() => {
		isAutoEnabledRef.current = true;
		setIsAutoEnabled(true);
		setWindowStart(0);
		hasInitializedPositionRef.current = false;
		isHoverPausedRef.current = false;
		pendingManualOffsetRef.current = null;
		pendingArrowDirectionRef.current = 0;
		cancelAutoAnimation();
		cancelArrowAnimation();
	}, [items.length, cancelArrowAnimation, cancelAutoAnimation]);

	useEffect(() => {
		measureSetMetrics();

		const observer = new ResizeObserver(measureSetMetrics);
		if (firstGroupRef.current) {
			observer.observe(firstGroupRef.current);
			const track = firstGroupRef.current.parentElement;
			if (track) observer.observe(track);
		}
		window.addEventListener("resize", measureSetMetrics);

		return () => {
			observer.disconnect();
			window.removeEventListener("resize", measureSetMetrics);
		};
	}, [items.length, isAutoEnabled, windowStart, measureSetMetrics]);

	useLayoutEffect(() => {
		measureSetMetrics();

		const viewport = viewportRef.current;
		const firstGroup = firstGroupRef.current;
		if (!viewport || !firstGroup) return;

		if (isAutoEnabledRef.current) {
			if (!hasInitializedPositionRef.current) {
				viewport.scrollLeft = firstGroup.offsetLeft;
				hasInitializedPositionRef.current = true;
			}
			return;
		}

		if (pendingManualOffsetRef.current !== null) {
			const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
			const targetScrollLeft = firstGroup.offsetLeft + pendingManualOffsetRef.current;
			viewport.scrollLeft = Math.min(maxScrollLeft, Math.max(0, targetScrollLeft));
			pendingManualOffsetRef.current = null;
		}
	}, [items.length, isAutoEnabled, windowStart, measureSetMetrics]);

	useLayoutEffect(() => {
		if (isAutoEnabled) return;

		const direction = pendingArrowDirectionRef.current;
		if (direction === 0) return;

		pendingArrowDirectionRef.current = 0;
		animateManualStep(direction);
	}, [animateManualStep, isAutoEnabled, windowStart]);

	useEffect(() => {
		if (!isAutoEnabled) return;

		const viewport = viewportRef.current;
		if (!viewport) return;

		const tick = (timestamp: number) => {
			if (!isAutoEnabledRef.current) return;

			if (lastAutoTimestampRef.current === null) {
				lastAutoTimestampRef.current = timestamp;
			}

			const delta = timestamp - lastAutoTimestampRef.current;
			lastAutoTimestampRef.current = timestamp;

			if (!isHoverPausedRef.current) {
				viewport.scrollLeft += delta * AUTO_SCROLL_PX_PER_MS;
				maybeShiftWindow();
			}

			autoFrameRef.current = requestAnimationFrame(tick);
		};

		autoFrameRef.current = requestAnimationFrame(tick);

		return () => {
			cancelAutoAnimation();
		};
	}, [cancelAutoAnimation, isAutoEnabled, maybeShiftWindow]);

	useEffect(() => {
		return () => {
			cancelAutoAnimation();
			cancelArrowAnimation();
		};
	}, [cancelArrowAnimation, cancelAutoAnimation]);

	const scrollByStep = useCallback(
		(direction: 1 | -1) => {
			if (isAutoEnabledRef.current) {
				disableAutoScroll(direction);
				return;
			}
			animateManualStep(direction);
		},
		[animateManualStep, disableAutoScroll]
	);

	const handleMouseEnter = useCallback(() => {
		if (!isAutoEnabledRef.current) return;
		isHoverPausedRef.current = true;
		lastAutoTimestampRef.current = null;
	}, []);

	const handleMouseLeave = useCallback(() => {
		if (!isAutoEnabledRef.current) return;
		isHoverPausedRef.current = false;
		lastAutoTimestampRef.current = null;
	}, []);

	const handleTouchStart = useCallback((event: TouchEvent<HTMLDivElement>) => {
		const touch = event.touches[0];
		if (!touch) return;

		touchStartXRef.current = touch.clientX;
		touchStartYRef.current = touch.clientY;
	}, []);

	const handleTouchMove = useCallback(
		(event: TouchEvent<HTMLDivElement>) => {
			if (!isAutoEnabledRef.current) return;

			const touch = event.touches[0];
			const startX = touchStartXRef.current;
			const startY = touchStartYRef.current;
			if (!touch || startX === null || startY === null) return;

			const deltaX = Math.abs(touch.clientX - startX);
			const deltaY = Math.abs(touch.clientY - startY);

			if (deltaX > HORIZONTAL_SWIPE_THRESHOLD && deltaX > deltaY) {
				disableAutoScroll();
				touchStartXRef.current = null;
				touchStartYRef.current = null;
			}
		},
		[disableAutoScroll]
	);

	const handleTouchEnd = useCallback(() => {
		touchStartXRef.current = null;
		touchStartYRef.current = null;
	}, []);

	const handlePointerDown = useCallback(
		(event: PointerEvent<HTMLDivElement>) => {
			if (event.pointerType === "mouse") {
				disableAutoScroll();
			}
		},
		[disableAutoScroll]
	);

	const handleWheel = useCallback(
		(event: WheelEvent<HTMLDivElement>) => {
			if (!isAutoEnabledRef.current) return;

			const horizontalIntent =
				Math.abs(event.deltaX) > HORIZONTAL_WHEEL_THRESHOLD ||
				(event.shiftKey && Math.abs(event.deltaY) > HORIZONTAL_WHEEL_THRESHOLD);

			if (horizontalIntent) {
				disableAutoScroll();
			}
		},
		[disableAutoScroll]
	);

	if (items.length === 0) return null;

	const renderedGroupKeys = isAutoEnabled ? [windowStart, windowStart + 1] : [windowStart];

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
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
				onPointerDown={handlePointerDown}
				onWheel={handleWheel}
				aria-label='Karusel projekata'>
				<div className='carousel-track'>
					{renderedGroupKeys.map((groupKey, groupIndex) => (
						<div
							className='carousel-group'
							ref={groupIndex === 0 ? firstGroupRef : undefined}
							key={`carousel-group-${groupKey}`}>
							{items.map((item, itemIndex) => (
								<div className='carousel-slide' key={`carousel-item-${groupKey}-${itemIndex}`}>
									{item}
								</div>
							))}
						</div>
					))}
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
