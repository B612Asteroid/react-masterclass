import React from "react";
import {useQuery} from "react-query";
import {fetchCoinHistory} from "../api";
import ApexChart from "react-apexcharts";
import {useRecoilValue} from "recoil";
import {isDarkAtom} from "../atoms";

interface IChart {
    coinId: string;
}

interface IHistorical {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: string;
}

function Chart({coinId}: IChart) {

    const isDark = useRecoilValue(isDarkAtom);

    const {isLoading, data} = useQuery<IHistorical[]>(
        ["ohlcv", coinId],
        () => fetchCoinHistory(coinId),
        { refetchInterval: 10000 }
    );
    return <div>
        {isLoading
            ? "Loading chart..."
            : (<ApexChart
                type="line"
                options={{
                    theme: {
                        mode: isDark? "dark" : "light",
                    },
                    chart: {
                        height: 300,
                        width: 500,
                        toolbar: {
                            show: false
                        }
                    },
                    grid: {
                        show: false
                    },
                    stroke: {
                        curve: "smooth",
                        width: 3,
                    },
                    yaxis: {
                        show: false,
                    },
                    xaxis: {
                        labels: {
                            show: false
                        },
                        axisTicks: {
                            show: false
                        },
                        axisBorder: {
                            show: false
                        },
                        type: "datetime",
                        categories: data?.map(price => new Date(price.time_close * 1000).toISOString())
                    },
                    fill: {
                        type: "gradient",
                        gradient: {
                            gradientToColors : ["#27ae60"],
                            stops: [0, 100]
                        },
                    },
                    colors: ["#2980b9"],
                    tooltip: {
                        y: {
                            formatter(val: number, opts?: any): string {
                                return `$ ${val.toFixed(2)}`
                            }
                        }
                    }
                }}
                series={[
                    {
                        name: "Price",
                        data: data?.map(price => parseFloat(price.close)) ?? []
                    }
                ]}
            />)
        }
    </div>;
}

export default Chart;