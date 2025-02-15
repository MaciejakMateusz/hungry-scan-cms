import React from "react";


export const ConditionalTotalsLayer = ({ bars }) => {
    const stacksByIndexValue = bars.reduce((acc, bar) => {
        const indexVal = bar.data.indexValue
        if (!acc[indexVal]) acc[indexVal] = []
        acc[indexVal].push(bar)
        return acc
    }, {})

    return Object.entries(stacksByIndexValue).map(([indexVal, stack]) => {
        const totalValue = stack.reduce((sum, bar) => sum + bar.data.value, 0)

        if (totalValue === 0) return null

        const topBar = stack.reduce(
            (prev, curr) => (curr.y < prev.y ? curr : prev),
            stack[0]
        )

        const x = topBar.x + topBar.width / 2
        const y = topBar.y - 10

        return (
            <text
                key={indexVal}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                    fill: '#333',
                    fontWeight: 600,
                    fontSize: 12
                }}
            >
                {totalValue}
            </text>
        )
    })
}