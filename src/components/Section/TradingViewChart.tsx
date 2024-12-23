import React, { useRef, useEffect, useState } from 'react';
import { createChart, IChartApi } from 'lightweight-charts';
import { useSelector, useDispatch } from 'react-redux';
const DynamicHeightChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [chartHeight, setChartHeight] = useState<number>(400); // Default height
  const dispatch = useDispatch();
//   const chartHeightST = useSelector((state: any) => state.SetWindowsTV.value);    

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Initialize chart
    const chartOptions = {
      width: chartContainerRef.current.clientWidth,
      height: chartHeight,
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

    const chart = createChart(chartContainerRef.current,chartOptions);
    chartRef.current = chart;

    // Clean up on unmount
    return () => {
      chart.remove();
    };
  }, []);

  useEffect(() => {
    // Update chart height when `chartHeight` changes
    if (chartRef.current && chartContainerRef.current) {
      chartRef.current.resize(chartContainerRef.current.clientWidth, chartHeight);
    }
  }, [chartHeight]);

  //const increaseHeight = () => setChartHeight((getsto) => getsto + 100);
  //const decreaseHeight = () => setChartHeight((getsto) => (getsto > 200 ? getsto - 100 : getsto));

  return (
    <div>
      <div ref={chartContainerRef} style={{ width: '100%', height: `${chartHeight}px` }} />
       {/* <div style={{ marginTop: '10px' }}>
         <button onClick={increaseHeight}>Increase Height</button>
         <button onClick={decreaseHeight} style={{ marginLeft: '10px' }}>
           Decrease Height
         </button>
       </div> */}
    </div>
  );
};

export default DynamicHeightChart;
