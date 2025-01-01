import React, { useRef, useEffect, useState } from 'react';
import { createChart, IChartApi ,ISeriesApi } from 'lightweight-charts';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../manage_Redux/rootReducer';


const DynamicHeightChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const dispatch = useDispatch();
  const chartHeight = useSelector((state: RootState) => ((state.chart.height) != null ? (state.chart.height) : 700) - 50);
  const clientWidth = useSelector((state: RootState) => ((state.chart.width) != null ? (state.chart.width) : 800) - 50);

  const symbo = 'XRPUSDT'
  const TimeFream = '1m'

  //const [chartHeight, setChartHeight] = useState<number>(chart_height != null ? chart_height: 400); // Default height
  useEffect(() => {
    console.log("useEffect Main ***********************************************")
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
    
    const sampleData = [
      { time: '2024-12-01', open: 1.12, high: 1.25, low: 1.1, close: 1.2 },
      { time: '2024-12-02', open: 1.2, high: 1.3, low: 1.15, close: 1.25 },
      { time: '2024-12-03', open: 1.25, high: 1.35, low: 1.2, close: 1.3 },
      { time: '2024-12-04', open: 1.3, high: 1.4, low: 1.25, close: 1.35 },
    ];


    const chart = createChart(chartContainerRef.current, chartOptions);
    chartRef.current = chart;

    const series = chart.addCandlestickSeries({
      borderDownColor: '#f44336',
      borderUpColor: '#4caf50',
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    seriesRef.current = series;
    //-------------------------------------------------------------------------------
    // Load Data
    //-------------------------------------------------------------------------------


    // Set initial data
    series.setData(sampleData);

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


  //-------------------------------------------------------------------------------
  // Update size
  //-------------------------------------------------------------------------------
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
