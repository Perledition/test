// DataContext.js
import React, { createContext, useState } from 'react';
import { MetaData } from '../metaSidebar/MetaSidebar';

export const ChartDataContext = createContext<any>(null);

export interface ChartElement {
    name: string;
    value: number;
  }

  interface ChartDataProviderProps {
    children: React.ReactNode;
  }

export default function ChartDataProvider({ children }: ChartDataProviderProps) {
    const initMetaDataEntry: ChartElement = {name: "leer", value: 0}
    const initialData: MetaData = {
        PER: [initMetaDataEntry], 
        LOC: [initMetaDataEntry], 
        ELSE: [initMetaDataEntry]
    };
    const [globalChartData, setGlobalChartData] = useState(initialData);

    const updateGlobalChartData = (newData: MetaData) => {
        setGlobalChartData(newData);
    };

    return (
        <ChartDataContext.Provider value={{ globalChartData, updateGlobalChartData }}>
        {children}
        </ChartDataContext.Provider>
    );
};