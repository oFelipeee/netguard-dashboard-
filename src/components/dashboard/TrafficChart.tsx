"use-client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const generateData = () => {
    const data = [];
    for (let i = 0; i < 24; i++) {
        data.push({
            time: `${i.toString().padStart(2, "0")}:00`,
            inbound: Math.floor(Math.random() * 500) + 200,
            outbound: Math.floor(Math.random() * 300) + 100,
        });
    }
    return data;
};

export function TrafficChart() {
    const data = generateData();

    return (
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorInbound" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorOutbound" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1A3558" />
                    <XAxis dataKey="time" stroke="#64748B" style={{ fontSize: "12px" }} />
                    <YAxis stroke="#64748B" style={{ fontSize: "12px" }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#0F2240",
                            border: "1px solid #1A3558",
                            borderRadius: "8px",
                        }}
                        labelStyle={{ color: "#94A3B8" }}
                    />
                    <Area
                        type="monotone"
                        dataKey="inbound"
                        stroke="#3B82F6"
                        fillOpacity={1}
                        fill="url(#colorInbound)"
                        name="Entrada (Mbps)"
                    />
                    <Area
                        type="monotone"
                        dataKey="outbound"
                        stroke="#10B981"
                        fillOpacity={1}
                        fill="url(#colorOutbound)"
                        name="Saída (Mbps)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
