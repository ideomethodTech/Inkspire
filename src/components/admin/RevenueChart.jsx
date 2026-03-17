'use client'
import { useState } from 'react'

const weekData = [
  { day: 'MON', value: 62 },
  { day: 'TUE', value: 70 },
  { day: 'WED', value: 90 },
  { day: 'THU', value: 85 },
  { day: 'FRI', value: 75 },
  { day: 'SAT', value: 68 },
  { day: 'SUN', value: 72 },
]

const monthData = [
  { day: 'W1', value: 50 }, { day: 'W2', value: 65 }, { day: 'W3', value: 72 },
  { day: 'W4', value: 58 }, { day: 'W5', value: 80 }, { day: 'W6', value: 90 },
  { day: 'W7', value: 85 }, { day: 'W8', value: 76 }, { day: 'W9', value: 88 },
  { day: 'W10', value: 70 }, { day: 'W11', value: 82 }, { day: 'W12', value: 78 },
  { day: 'W13', value: 92 }, { day: 'W14', value: 85 },
]

function buildPath(data, w, h) {
  const pad = 24
  const usableW = w - pad * 2
  const usableH = h - pad * 2
  const min = Math.min(...data.map(d => d.value)) - 10
  const max = Math.max(...data.map(d => d.value)) + 10
  const points = data.map((d, i) => ({
    x: pad + (i / (data.length - 1)) * usableW,
    y: pad + (1 - (d.value - min) / (max - min)) * usableH,
  }))

  let path = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const cp1x = points[i - 1].x + (points[i].x - points[i - 1].x) * 0.45
    const cp1y = points[i - 1].y
    const cp2x = points[i].x - (points[i].x - points[i - 1].x) * 0.45
    const cp2y = points[i].y
    path += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${points[i].x} ${points[i].y}`
  }

  const fillPath = path + ` L ${points[points.length - 1].x} ${h} L ${points[0].x} ${h} Z`
  return { linePath: path, fillPath, points }
}

export default function RevenueChart() {
  const [range, setRange] = useState('7D')
  const data = range === '7D' ? weekData : monthData
  const W = 620, H = 220
  const { linePath, fillPath, points } = buildPath(data, W, H)

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-gray-900 -tracking-[0.2px]">Revenue Overview</h2>
          <p className="text-xs text-gray-500 mt-1">Performance trajectory for sales</p>
        </div>
        <div className="flex gap-1.5">
          {['7D', '30D'].map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition 
                ${range === r
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-teal-100 hover:text-teal-600 hover:border-teal-400'
                }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[200px] block overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2e9e8a" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#2e9e8a" stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {points.map((p, i) => (
            <line key={i} x1={p.x} y1={p.y} x2={p.x} y2={H} stroke="#b2ddd6" strokeWidth={1} opacity={0.5} />
          ))}

          <path d={fillPath} fill="url(#chartGrad)" />
          <path d={linePath} fill="none" stroke="#2e9e8a" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <div className="flex justify-between px-6 pt-1">
          {data.map(d => (
            <span key={d.day} className="text-[11px] text-gray-400 font-medium text-center flex-1">{d.day}</span>
          ))}
        </div>
      </div>
    </div>
  )
}