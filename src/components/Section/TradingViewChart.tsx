import React, { useRef, useEffect, useState } from 'react';
import { createChart, IChartApi } from 'lightweight-charts';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../manage_Redux/rootReducer';


const DynamicHeightChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useDispatch();
  const chartHeight = useSelector((state: RootState) => ((state.chart.height) != null ? (state.chart.height) : 700) - 50);
  const clientWidth = useSelector((state: RootState) => ((state.chart.width) != null ? (state.chart.width) : 800) - 50);
  //const [chartHeight, setChartHeight] = useState<number>(chart_height != null ? chart_height: 400); // Default height
  useEffect(() => {
    if (!chartContainerRef.current) return;
    // Initialize chart
    const chartOptions = {
      layout: {
        textColor: '#E4E4E4',
        background: { type: 'solid', color: '#202020' },
        borderColor: '#63C20B',
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        tickMarkFormatter: (time: number) => {
          const utcDate = new Date(time * 1000);
          const bangkokTime = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000); // Add 7 hours for Bangkok timezone
          return bangkokTime.toLocaleString('en-US', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          });
        },
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      localization: {
        priceFormatter: (p: number) => p.toFixed(4),
      },
    };

    const chart = createChart(chartContainerRef.current, chartOptions);
    chartRef.current = chart;
    // Handle window resize
    const resizeObserver = new ResizeObserver(() => {
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth || 0 });
    });

    // Resize the canvas dynamically
    const handleResize = () => {
      if (overlayCanvasRef.current && chartContainerRef.current) {
        overlayCanvasRef.current.width = chartContainerRef.current.clientWidth;
        overlayCanvasRef.current.height = chartContainerRef.current.clientHeight;
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    resizeObserver.observe(chartContainerRef.current);
    // Clean up on unmount
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    // Update chart height when `chartHeight` changes
    if (chartRef.current && chartContainerRef.current) {
      chartRef.current.resize(chartContainerRef.current.clientWidth, chartHeight);
    }

  }, [chartHeight]);


  return (
    <div>
      <div ref={chartContainerRef} style={{ width: '99%',paddingRight:"-10px", height: `${chartHeight}px` }} />
    </div>
  );
};

export default DynamicHeightChart;
