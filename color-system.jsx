import React, { useState } from 'react';

// Font face declaration for QF Font
const fontStyles = `
  @font-face {
    font-family: 'QF Font';
    src: url('./QF-VF.woff2') format('woff2-variations');
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
  }
`;

const ColorSwatch = ({ color, name, hex }) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const isLight = (hexColor) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 128;
  };
  
  return (
    <div 
      className="cursor-pointer group relative"
      onClick={copyToClipboard}
    >
      <div 
        className="h-20 rounded-lg shadow-sm border border-black/5 transition-all group-hover:scale-105 group-hover:shadow-md flex items-end p-2"
        style={{ backgroundColor: color }}
      >
        <span className={`text-xs font-medium ${isLight(color) ? 'text-gray-700' : 'text-white/80'}`}>
          {name}
        </span>
      </div>
      <p className="text-xs text-gray-500 font-mono mt-2 text-center">{hex}</p>
      {copied && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded z-10">
          Copied!
        </div>
      )}
    </div>
  );
};

const ColorRamp = ({ title, colors, description }) => (
  <div className="mb-10">
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
    </div>
    <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
      {colors.map((c, i) => (
        <ColorSwatch key={i} color={c.hex} name={c.name} hex={c.hex} />
      ))}
    </div>
  </div>
);

const LargeColorCard = ({ color, name, hex, usage }) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  
  const isLight = (hexColor) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 128;
  };
  
  return (
    <div 
      className="rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer group transition-all hover:shadow-lg hover:scale-[1.02] relative"
      onClick={copyToClipboard}
    >
      <div 
        className="h-24 flex items-end p-4"
        style={{ backgroundColor: hex }}
      >
        <span className={`text-lg font-semibold ${isLight(hex) ? 'text-gray-900' : 'text-white'}`}>
          {name}
        </span>
      </div>
      <div className="bg-white p-4">
        <p className="font-mono text-sm text-gray-600">{hex}</p>
        <p className="text-xs text-gray-400 mt-1">{usage}</p>
      </div>
      {copied && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white text-sm px-3 py-2 rounded-lg z-10">
          Copied!
        </div>
      )}
    </div>
  );
};

const UsageExample = ({ title, children }) => (
  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">{title}</p>
    {children}
  </div>
);

// SVG pattern for striped bars
const StripedPattern = () => (
  <svg width="0" height="0" className="absolute">
    <defs>
      <pattern id="stripes" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
        <rect width="3" height="6" fill="#BDC8AB" />
        <rect x="3" width="3" height="6" fill="#D5DCCA" />
      </pattern>
      <pattern id="stripes-dark" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
        <rect width="3" height="6" fill="#889A68" />
        <rect x="3" width="3" height="6" fill="#A3B288" />
      </pattern>
    </defs>
  </svg>
);

// IBM Carbon Icons - Trend indicators
const TrendUpIcon = ({ className = "" }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
    <path d="M28 6v10h-2V9.41L16.59 18.83 11 13.24 2.41 21.83 4 23.41l7-7 5.59 5.59L27.41 11H21V9h7z"/>
  </svg>
);

const TrendDownIcon = ({ className = "" }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
    <path d="M28 26v-10h-2v6.59L16.59 13.17 11 18.76 2.41 10.17 4 8.59l7 7 5.59-5.59L27.41 21H21v2h7z"/>
  </svg>
);

const ArrowUpIcon = ({ className = "" }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
    <path d="M16 4L6 14l1.41 1.41L15 7.83V28h2V7.83l7.59 7.58L26 14 16 4z"/>
  </svg>
);

const ArrowDownIcon = ({ className = "" }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
    <path d="M16 28l10-10-1.41-1.41L17 24.17V4h-2v20.17l-7.59-7.58L6 18l10 10z"/>
  </svg>
);

const DuotoneBarChart = ({ useStripes = false }) => {
  const data = [
    { label: 'Likes', current: 85, previous: 70 },
    { label: 'Comments', current: 45, previous: 55 },
    { label: 'Shares', current: 60, previous: 48 },
    { label: 'Saves', current: 35, previous: 30 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#11362A' }} />
          <span className="text-gray-600">This Period</span>
        </div>
        <div className="flex items-center gap-2">
          {useStripes ? (
            <svg width="16" height="16" className="rounded">
              <rect width="16" height="16" fill="url(#stripes)" />
            </svg>
          ) : (
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#D6D6D2' }} />
          )}
          <span className="text-gray-600">Previous Period</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {data.map((item, i) => (
          <div key={i} className="space-y-1">
            <div className="text-xs text-gray-500 uppercase tracking-wide">{item.label}</div>
            <div className="flex gap-1 h-8">
              <div 
                className="h-full rounded-sm transition-all"
                style={{ 
                  width: `${item.current}%`, 
                  backgroundColor: '#11362A' 
                }}
              />
              {useStripes ? (
                <svg 
                  className="h-full rounded-sm"
                  style={{ width: `${item.previous}%` }}
                >
                  <rect width="100%" height="100%" fill="url(#stripes)" />
                </svg>
              ) : (
                <div 
                  className="h-full rounded-sm"
                  style={{ 
                    width: `${item.previous}%`, 
                    backgroundColor: '#D6D6D2' 
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DuotoneGroupedBarChart = ({ useStripes = false }) => {
  const data = [
    { 
      label: 'Instagram', 
      values: [
        { current: 85, previous: 60 },
        { current: 78, previous: 65 },
        { current: 92, previous: 70 },
        { current: 88, previous: 75 },
      ]
    },
    { 
      label: 'Facebook', 
      values: [
        { current: 65, previous: 50 },
        { current: 58, previous: 55 },
        { current: 72, previous: 48 },
        { current: 68, previous: 52 },
      ]
    },
    { 
      label: 'Twitter', 
      values: [
        { current: 75, previous: 55 },
        { current: 70, previous: 68 },
        { current: 82, previous: 60 },
        { current: 78, previous: 58 },
      ]
    },
    { 
      label: 'LinkedIn', 
      values: [
        { current: 80, previous: 65 },
        { current: 75, previous: 70 },
        { current: 88, previous: 62 },
        { current: 85, previous: 68 },
      ]
    },
  ];

  const maxHeight = 140; // pixels

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Video Views per Platform</p>
        <div className="flex items-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#11362A' }} />
            <span className="text-gray-600">This Period</span>
          </div>
          <div className="flex items-center gap-2">
            {useStripes ? (
              <svg width="12" height="12" className="rounded-full overflow-hidden">
                <rect width="12" height="12" fill="url(#stripes)" />
              </svg>
            ) : (
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#D6D6D2' }} />
            )}
            <span className="text-gray-600">Previous Period</span>
          </div>
        </div>
      </div>
      
      <div className="flex border-l border-b border-gray-200" style={{ height: `${maxHeight + 50}px` }}>
        {data.map((category, catIndex) => (
          <div key={catIndex} className="flex-1 flex flex-col border-r border-gray-100 last:border-r-0">
            <div className="flex-1 flex items-end justify-center gap-1 px-2 pb-2">
              {category.values.map((pair, pairIndex) => (
                <div key={pairIndex} className="flex items-end gap-0.5">
                  {/* Current period bar */}
                  <div 
                    className="w-3 rounded-t"
                    style={{ 
                      height: `${(pair.current / 100) * maxHeight}px`,
                      backgroundColor: '#11362A' 
                    }}
                  />
                  {/* Previous period bar */}
                  {useStripes ? (
                    <svg 
                      className="w-3 rounded-t overflow-hidden"
                      style={{ height: `${(pair.previous / 100) * maxHeight}px` }}
                    >
                      <rect width="100%" height="100%" fill="url(#stripes)" />
                    </svg>
                  ) : (
                    <div 
                      className="w-3 rounded-t"
                      style={{ 
                        height: `${(pair.previous / 100) * maxHeight}px`,
                        backgroundColor: '#D6D6D2' 
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center py-3 border-t border-gray-100 bg-gray-50/50">
              <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">{category.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ColorSystem() {
  // Primary Brand Color Ramp - Forest Green
  const primaryColors = [
    { name: '50', hex: '#F2F5F4' },
    { name: '100', hex: '#E0E7E4' },
    { name: '200', hex: '#C1CFC9' },
    { name: '300', hex: '#9AB3A9' },
    { name: '400', hex: '#6E9484' },
    { name: '500', hex: '#4A7561' },
    { name: '600', hex: '#385C4B' },
    { name: '700', hex: '#2A4639' },
    { name: '800', hex: '#11362A' },  // Brand primary
    { name: '900', hex: '#0B241C' },
  ];

  // Sage/Olive Accent Ramp (from data viz and status backgrounds)
  const sageColors = [
    { name: '50', hex: '#F4F6F0' },
    { name: '100', hex: '#E8ECDF' },
    { name: '200', hex: '#D5DCCA' },
    { name: '300', hex: '#BDC8AB' },
    { name: '400', hex: '#A3B288' },
    { name: '500', hex: '#889A68' },
    { name: '600', hex: '#6B7A50' },
    { name: '700', hex: '#525D3E' },
    { name: '800', hex: '#3A422C' },
    { name: '900', hex: '#24291B' },
  ];

  // Teal — Cool Bridge (PANTONE 339C lineage)
  const tealColors = [
    { name: '50',  hex: '#EBF6F2' },
    { name: '100', hex: '#C5E7DA' },
    { name: '200', hex: '#9DD7C2' },
    { name: '300', hex: '#6EC4AB' },
    { name: '400', hex: '#3EB794' },
    { name: '500', hex: '#00A896' },
    { name: '600', hex: '#00857C' },  // Primary teal
    { name: '700', hex: '#006C65' },
    { name: '800', hex: '#005450' },
    { name: '900', hex: '#003835' },
  ];

  // Warm Neutral Grays (cream-tinted)
  const neutralColors = [
    { name: '50', hex: '#FAFAF9' },
    { name: '100', hex: '#F5F5F3' },
    { name: '200', hex: '#E8E8E5' },
    { name: '300', hex: '#D6D6D2' },
    { name: '400', hex: '#A8A8A3' },
    { name: '500', hex: '#737370' },
    { name: '600', hex: '#5C5C59' },
    { name: '700', hex: '#434340' },
    { name: '800', hex: '#2B2B29' },
    { name: '900', hex: '#1A1A18' },
  ];

  // Core UI Colors
  const coreColors = [
    { name: 'Primary', hex: '#11362A', usage: 'Buttons, nav, key actions' },
    { name: 'Background', hex: '#F5F5F3', usage: 'Page background' },
    { name: 'Surface', hex: '#FFFFFF', usage: 'Cards, panels, modals' },
    { name: 'Border', hex: '#E8E8E5', usage: 'Dividers, card borders' },
  ];

  // Text Colors (derived from Sidra Green)
  const textColors = [
    { name: 'Primary', hex: '#0B241C', usage: 'Headings, body text' },
    { name: 'Secondary', hex: '#2A4639', usage: 'Subheads, supporting text' },
    { name: 'Tertiary', hex: '#4A7561', usage: 'Captions, labels' },
    { name: 'Muted', hex: '#9AB3A9', usage: 'Disabled, placeholders' },
  ];

  // Status/Risk Colors (for engagement levels and performance)
  const statusColors = [
    { name: 'Low', hex: '#F4F6F0', usage: 'Below average performance' },
    { name: 'Average', hex: '#E8ECDF', usage: 'Meeting baseline' },
    { name: 'Good', hex: '#BDC8AB', usage: 'Above average' },
    { name: 'High', hex: '#889A68', usage: 'Strong performance' },
    { name: 'Excellent', hex: '#525D3E', usage: 'Top performing' },
  ];

  // Data Visualization Sequential
  const dataVizSequential = [
    { name: '1', hex: '#F4F6F0' },
    { name: '2', hex: '#E8ECDF' },
    { name: '3', hex: '#D5DCCA' },
    { name: '4', hex: '#BDC8AB' },
    { name: '5', hex: '#A3B288' },
    { name: '6', hex: '#889A68' },
    { name: '7', hex: '#6B7A50' },
    { name: '8', hex: '#525D3E' },
    { name: '9', hex: '#3A422C' },
    { name: '10', hex: '#11362A' },
  ];

  // Semantic Colors
  const semanticColors = [
    { name: 'Success', hex: '#385C4B', usage: 'Confirmations, positive' },
    { name: 'Warning', hex: '#A3824A', usage: 'Caution, attention' },
    { name: 'Error', hex: '#8B4049', usage: 'Errors, destructive' },
    { name: 'Info', hex: '#4A6B7C', usage: 'Informational' },
  ];

  // Tertiary Categorical Palette (for infographics, treemaps, charts)
  const categoricalColors = [
    { name: 'Teal', hex: '#2D6A6A', usage: 'Computer & Technology' },
    { name: 'Sage', hex: '#7A9A7A', usage: 'Education & Research' },
    { name: 'Lavender', hex: '#8B7BA8', usage: 'Arts & Entertainment' },
    { name: 'Rose', hex: '#C4A0A0', usage: 'Community & Social' },
    { name: 'Slate', hex: '#6B7D8A', usage: 'Business & Finance' },
    { name: 'Sand', hex: '#C4B49A', usage: 'Agriculture & Resources' },
    { name: 'Coral', hex: '#C49A8B', usage: 'Healthcare & Services' },
    { name: 'Mauve', hex: '#9A7A8B', usage: 'Administrative' },
  ];

  // Extended categorical for large datasets
  const extendedCategorical = [
    { name: 'Cat-01', hex: '#2D6A6A' },
    { name: 'Cat-02', hex: '#7A9A7A' },
    { name: 'Cat-03', hex: '#8B7BA8' },
    { name: 'Cat-04', hex: '#C4A0A0' },
    { name: 'Cat-05', hex: '#6B7D8A' },
    { name: 'Cat-06', hex: '#C4B49A' },
    { name: 'Cat-07', hex: '#C49A8B' },
    { name: 'Cat-08', hex: '#9A7A8B' },
    { name: 'Cat-09', hex: '#5A8A7A' },
    { name: 'Cat-10', hex: '#A89A6B' },
    { name: 'Cat-11', hex: '#7A8BA8' },
    { name: 'Cat-12', hex: '#B8A090' },
  ];

  // Task/Automation classification (waffle charts)
  const taskColors = [
    { name: 'Automated', hex: '#5A8A6A', usage: 'Fully automated tasks' },
    { name: 'Augmented', hex: '#8B7BA8', usage: 'Human-AI collaboration' },
    { name: 'Manual', hex: '#D6D6D2', usage: 'Human-only tasks' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F3]" style={{ fontFamily: "'QF Font', system-ui, -apple-system, sans-serif" }}>
      {/* Inject font styles */}
      <style>{fontStyles}</style>
      {/* SVG Patterns */}
      <StripedPattern />
      {/* Header */}
      <div className="bg-[#11362A] text-white px-8 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Communications Dashboard</h1>
            <p className="text-white/60 text-sm mt-1">Design System â€” Colors, Typography & Spacing</p>
          </div>
          <div className="flex gap-2">
            <span className="bg-white/10 px-3 py-1 rounded text-sm">v1.0</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        
        {/* Core UI Colors */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Core UI Colors</h2>
            <p className="text-gray-500 text-sm mt-1">Foundation colors for the interface</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {coreColors.map((c, i) => (
              <LargeColorCard key={i} {...c} />
            ))}
          </div>
        </section>

        {/* Text Colors */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Text Colors</h2>
            <p className="text-gray-500 text-sm mt-1">Derived from Sidra Green for consistent brand hierarchy</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {textColors.map((c, i) => (
              <LargeColorCard key={i} {...c} />
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-100">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900">Typography</h2>
            <p className="text-[#2A4639] text-sm mt-1">Type scale, weights, and usage guidelines</p>
          </div>

          {/* Font Families */}
          <div className="mb-10">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Font Families</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs text-[#4A7561] uppercase tracking-wider mb-3">Display / Headings</p>
                <p className="text-3xl text-[#0B241C]">
                  Social Media Analytics
                </p>
                <p className="text-sm text-[#2A4639] mt-3 font-mono">font-family: 'QF Font', system-ui, sans-serif</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs text-[#4A7561] uppercase tracking-wider mb-3">Body / UI</p>
                <p className="text-base text-[#0B241C]">
                  The quick brown fox jumps over the lazy dog. 0123456789
                </p>
                <p className="text-sm text-[#2A4639] mt-3 font-mono">font-family: 'QF Font', system-ui, sans-serif</p>
              </div>
            </div>
          </div>

          {/* Type Scale */}
          <div className="mb-10">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Type Scale</h3>
            <div className="space-y-0 border border-gray-200 rounded-xl overflow-hidden">
              {[
                { name: 'Display', size: '48px', lineHeight: '1.1', weight: '400', example: "Social Media Analytics" },
                { name: 'H1', size: '32px', lineHeight: '1.2', weight: '600', example: 'Engagement Overview' },
                { name: 'H2', size: '24px', lineHeight: '1.3', weight: '600', example: 'Post Performance Details' },
                { name: 'H3', size: '18px', lineHeight: '1.4', weight: '600', example: 'Top Posts This Month' },
                { name: 'Body Large', size: '16px', lineHeight: '1.5', weight: '400', example: 'Platform distribution across engagement types and channels.' },
                { name: 'Body', size: '14px', lineHeight: '1.5', weight: '400', example: 'Highest performing content based on engagement metrics.' },
                { name: 'Caption', size: '12px', lineHeight: '1.4', weight: '400', example: 'Jun 01 - 27, 2025' },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-6 p-4 ${i !== 0 ? 'border-t border-gray-100' : ''}`}>
                  <div className="w-24 shrink-0">
                    <p className="text-xs font-medium text-[#2A4639]">{item.name}</p>
                  </div>
                  <div className="w-20 shrink-0">
                    <p className="text-xs font-mono text-[#4A7561]">{item.size}</p>
                  </div>
                  <div className="flex-1">
                    <p 
                      className="text-[#0B241C] truncate"
                      style={{ 
                        fontSize: item.size, 
                        lineHeight: item.lineHeight,
                        fontWeight: item.weight 
                      }}
                    >
                      {item.example}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Labels & Overlines */}
          <div className="mb-10">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Labels & Overlines</h3>
            <p className="text-sm text-[#2A4639] mb-4">
              Used for section headers, card titles, and categorization. Always uppercase with increased letter-spacing.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs text-[#4A7561] uppercase tracking-wider mb-4">Label Large</p>
                <p 
                  className="text-[#0B241C] mb-2"
                  style={{ 
                    fontSize: '14px', 
                    fontWeight: '600',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  Total Followers
                </p>
                <p className="text-xs font-mono text-[#4A7561]">14px / 600 / 0.08em tracking / uppercase</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs text-[#4A7561] uppercase tracking-wider mb-4">Label Small</p>
                <p 
                  className="text-[#2A4639] mb-2"
                  style={{ 
                    fontSize: '11px', 
                    fontWeight: '500',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
                  }}
                >
                  +2.3% from previous period
                </p>
                <p className="text-xs font-mono text-[#4A7561]">11px / 500 / 0.1em tracking / uppercase</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs text-[#4A7561] uppercase tracking-wider mb-4">Card Title</p>
                <p 
                  className="text-[#0B241C] mb-2"
                  style={{ 
                    fontSize: '12px', 
                    fontWeight: '600',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase'
                  }}
                >
                  Engagement Breakdown
                </p>
                <p className="text-xs font-mono text-[#4A7561]">12px / 600 / 0.06em tracking / uppercase</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xs text-[#4A7561] uppercase tracking-wider mb-4">Axis Label</p>
                <p 
                  className="text-[#4A7561] mb-2"
                  style={{ 
                    fontSize: '10px', 
                    fontWeight: '500',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  Instagram Â· Facebook Â· Twitter
                </p>
                <p className="text-xs font-mono text-[#4A7561]">10px / 500 / 0.08em tracking / uppercase</p>
              </div>
            </div>
          </div>

          {/* Data Display */}
          <div className="mb-10">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Data Display</h3>
            <p className="text-sm text-[#2A4639] mb-4">
              Large numbers and statistics for dashboards and KPIs.
            </p>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 text-center">
                <p 
                  className="text-[#0B241C]"
                  style={{ fontSize: '56px', fontWeight: '300', lineHeight: '1' }}
                >
                  766K
                </p>
                <p className="text-xs font-mono text-[#4A7561] mt-3">Stat XL: 56px / 300</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 text-center">
                <p 
                  className="text-[#0B241C]"
                  style={{ fontSize: '40px', fontWeight: '400', lineHeight: '1' }}
                >
                  481
                </p>
                <p className="text-xs font-mono text-[#4A7561] mt-3">Stat LG: 40px / 400</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 text-center">
                <p 
                  className="text-[#11362A]"
                  style={{ fontSize: '28px', fontWeight: '500', lineHeight: '1' }}
                >
                  +2.3%
                </p>
                <p className="text-xs font-mono text-[#4A7561] mt-3">Stat MD: 28px / 500</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 text-center">
                <p 
                  className="text-[#11362A]"
                  style={{ fontSize: '20px', fontWeight: '600', lineHeight: '1' }}
                >
                  45,600
                </p>
                <p className="text-xs font-mono text-[#4A7561] mt-3">Stat SM: 20px / 600</p>
              </div>
            </div>
          </div>

          {/* Usage Example */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Usage Example</h3>
            <div className="p-6 bg-[#F5F5F3] rounded-xl border border-gray-200">
              <div className="max-w-md">
                <p 
                  className="text-[#0B241C] mb-1"
                  style={{ 
                    fontSize: '12px', 
                    fontWeight: '600',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase'
                  }}
                >
                  Total Followers
                </p>
                <p 
                  className="text-[#2A4639] mb-4"
                  style={{ 
                    fontSize: '11px', 
                    fontWeight: '500',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
                  }}
                >
                  All Platforms
                </p>
                <p 
                  className="text-[#0B241C]"
                  style={{ fontSize: '48px', fontWeight: '300', lineHeight: '1' }}
                >
                  766,000
                </p>
                <p className="text-sm mt-2 flex items-center gap-1.5">
                  <TrendUpIcon className="text-[#385C4B]" />
                  <span className="text-[#385C4B] font-medium">+2.3%</span>
                  <span className="text-[#4A7561]">from previous period</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing */}
        <section className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-100">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900">Spacing</h2>
            <p className="text-[#2A4639] text-sm mt-1">Consistent spacing scale based on 4px grid</p>
          </div>

          {/* Spacing Scale */}
          <div className="mb-10">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Spacing Scale</h3>
            <div className="space-y-3">
              {[
                { name: '0', value: '0px', usage: 'None' },
                { name: '1', value: '4px', usage: 'Tight elements, icon padding' },
                { name: '2', value: '8px', usage: 'Related elements, input padding' },
                { name: '3', value: '12px', usage: 'Card padding (compact)' },
                { name: '4', value: '16px', usage: 'Standard gaps, section spacing' },
                { name: '5', value: '20px', usage: 'Medium spacing' },
                { name: '6', value: '24px', usage: 'Card padding (standard)' },
                { name: '8', value: '32px', usage: 'Section spacing' },
                { name: '10', value: '40px', usage: 'Large gaps' },
                { name: '12', value: '48px', usage: 'Page margins, major sections' },
                { name: '16', value: '64px', usage: 'Extra large spacing' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-16 shrink-0">
                    <p className="text-xs font-mono text-[#5C5C59]">space-{item.name}</p>
                  </div>
                  <div className="w-16 shrink-0">
                    <p className="text-xs font-mono text-gray-400">{item.value}</p>
                  </div>
                  <div 
                    className="h-4 rounded bg-[#11362A]"
                    style={{ width: item.value === '0px' ? '2px' : item.value }}
                  />
                  <p className="text-xs text-gray-400 ml-2">{item.usage}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Component Spacing */}
          <div className="mb-10">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Component Spacing</h3>
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Card Spacing */}
              <div className="p-6 bg-[#F5F5F3] rounded-xl border border-gray-200">
                <p className="text-xs text-[#4A7561] uppercase tracking-wider mb-4">Card</p>
                <div className="bg-white rounded-lg shadow-sm p-6 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="text-[10px] text-[#11362A] bg-[#E0E7E4] px-2 py-0.5 rounded font-mono">24px</span>
                  </div>
                  <div className="absolute top-1/2 -left-3 transform -translate-y-1/2">
                    <span className="text-[10px] text-[#11362A] bg-[#E0E7E4] px-2 py-0.5 rounded font-mono">24px</span>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#0B241C]">Total Posts</p>
                  <p className="text-3xl font-light text-[#0B241C] mt-2">481</p>
                  <p className="text-xs text-[#2A4639] mt-1">-3% from previous</p>
                </div>
                <p className="text-xs font-mono text-[#4A7561] mt-4">padding: 24px (space-6)</p>
              </div>

              {/* Stat Card Spacing */}
              <div className="p-6 bg-[#F5F5F3] rounded-xl border border-gray-200">
                <p className="text-xs text-[#4A7561] uppercase tracking-wider mb-4">Stat Card (Compact)</p>
                <div className="bg-white rounded-lg shadow-sm p-4 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="text-[10px] text-[#11362A] bg-[#E0E7E4] px-2 py-0.5 rounded font-mono">16px</span>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#0B241C]">Impressions</p>
                  <p className="text-2xl font-medium text-[#0B241C] mt-2">45,600</p>
                </div>
                <p className="text-xs font-mono text-[#4A7561] mt-4">padding: 16px (space-4)</p>
              </div>

              {/* Grid Gap */}
              <div className="p-6 bg-[#F5F5F3] rounded-xl border border-gray-200">
                <p className="text-xs text-[#4A7561] uppercase tracking-wider mb-4">Grid Gap</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-white rounded-lg shadow-sm h-16 flex items-center justify-center">
                    <span className="text-xs text-[#2A4639]">Card</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-px h-4 bg-[#11362A]" />
                    <span className="text-[10px] text-[#11362A] bg-[#E0E7E4] px-2 py-0.5 rounded font-mono my-1">16px</span>
                    <div className="w-px h-4 bg-[#11362A]" />
                  </div>
                  <div className="flex-1 bg-white rounded-lg shadow-sm h-16 flex items-center justify-center">
                    <span className="text-xs text-[#2A4639]">Card</span>
                  </div>
                </div>
                <p className="text-xs font-mono text-[#4A7561] mt-4">gap: 16px (space-4)</p>
              </div>

              {/* Section Margin */}
              <div className="p-6 bg-[#F5F5F3] rounded-xl border border-gray-200">
                <p className="text-xs text-[#4A7561] uppercase tracking-wider mb-4">Section Margin</p>
                <div className="space-y-0">
                  <div className="bg-white rounded-t-lg shadow-sm h-12 flex items-center justify-center border-b border-gray-100">
                    <span className="text-xs text-[#2A4639]">Section A</span>
                  </div>
                  <div className="h-8 flex items-center justify-center relative">
                    <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-[#11362A]" />
                    <span className="text-[10px] text-[#11362A] bg-[#E0E7E4] px-2 py-0.5 rounded font-mono relative z-10">32px</span>
                  </div>
                  <div className="bg-white rounded-b-lg shadow-sm h-12 flex items-center justify-center border-t border-gray-100">
                    <span className="text-xs text-[#2A4639]">Section B</span>
                  </div>
                </div>
                <p className="text-xs font-mono text-[#4A7561] mt-4">margin-bottom: 32px (space-8)</p>
              </div>
            </div>
          </div>

          {/* Layout Spacing */}
          <div className="mb-10">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Layout Spacing</h3>
            <div className="bg-[#F5F5F3] rounded-xl p-6 border border-gray-200">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Header */}
                <div className="bg-[#11362A] text-white px-6 py-4 flex items-center justify-between">
                  <span className="text-sm font-medium">Header</span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono">py: 16px, px: 24px</span>
                </div>
                {/* Content */}
                <div className="p-8 bg-[#FAFAFA]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#0B241C]">Page Content</span>
                    <span className="text-[10px] text-[#11362A] bg-[#E0E7E4] px-2 py-0.5 rounded font-mono">padding: 32px</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                      <span className="text-xs text-[#2A4639]">Card</span>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                      <span className="text-xs text-[#2A4639]">Card</span>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                      <span className="text-xs text-[#2A4639]">Card</span>
                    </div>
                  </div>
                  <div className="flex justify-center mt-3">
                    <span className="text-[10px] text-[#11362A] bg-[#E0E7E4] px-2 py-0.5 rounded font-mono">gap: 16px</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Common Patterns */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Common Spacing Patterns</h3>
            <div className="overflow-hidden border border-gray-200 rounded-xl">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Context</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Property</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Value</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Token</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { context: 'Page', property: 'Padding', value: '32px', token: 'space-8' },
                    { context: 'Card', property: 'Padding', value: '24px', token: 'space-6' },
                    { context: 'Card (compact)', property: 'Padding', value: '16px', token: 'space-4' },
                    { context: 'Card grid', property: 'Gap', value: '16px', token: 'space-4' },
                    { context: 'Section', property: 'Margin bottom', value: '32px', token: 'space-8' },
                    { context: 'Form field', property: 'Margin bottom', value: '16px', token: 'space-4' },
                    { context: 'Button group', property: 'Gap', value: '8px', token: 'space-2' },
                    { context: 'Icon + text', property: 'Gap', value: '8px', token: 'space-2' },
                    { context: 'Label + input', property: 'Gap', value: '4px', token: 'space-1' },
                    { context: 'Chart axis', property: 'Margin', value: '12px', token: 'space-3' },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3 text-gray-700">{row.context}</td>
                      <td className="px-4 py-3 text-gray-500">{row.property}</td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">{row.value}</td>
                      <td className="px-4 py-3 font-mono text-xs text-[#11362A]">{row.token}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Primary Ramp */}
        <section className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-100">
          <div className="mb-6 flex items-center gap-3">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#11362A' }} />
            <h2 className="text-xl font-bold text-gray-900">Primary â€” Sidra Green</h2>
          </div>
          <p className="text-gray-500 text-sm mb-6">
            Brand color (Qatar Foundation) with 800 as the primary value. Use for buttons, navigation, icons, and key interactive elements.
          </p>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
            {primaryColors.map((c, i) => (
              <ColorSwatch key={i} color={c.hex} name={c.name} hex={c.hex} />
            ))}
          </div>
          
          {/* Usage example */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: '#11362A' }}>
              Primary Button
            </button>
            <button className="px-4 py-2 rounded-lg text-sm font-medium border-2" style={{ borderColor: '#11362A', color: '#11362A' }}>
              Secondary
            </button>
            <button className="px-4 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: '#E0E7E4', color: '#11362A' }}>
              Tertiary
            </button>
            <span className="px-3 py-2 rounded-lg text-white text-sm font-medium inline-flex items-center gap-2" style={{ backgroundColor: '#11362A' }}>
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">3</span>
              Badge
            </span>
          </div>
        </section>

        {/* Sage/Olive Ramp */}
        <section className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-100">
          <div className="mb-6 flex items-center gap-3">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#889A68' }} />
            <h2 className="text-xl font-bold text-gray-900">Secondary â€” Sage</h2>
          </div>
          <p className="text-gray-500 text-sm mb-6">
            Used for data visualization, status indicators, heatmaps, and secondary UI elements.
          </p>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
            {sageColors.map((c, i) => (
              <ColorSwatch key={i} color={c.hex} name={c.name} hex={c.hex} />
            ))}
          </div>
        </section>

        {/* Teal — Cool Bridge */}
        <section className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-100">
          <div className="mb-6 flex items-center gap-3">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#00857C' }} />
            <h2 className="text-xl font-bold text-gray-900">Teal — Cool Bridge</h2>
            <span className="text-xs bg-[#EBF6F2] text-[#006C65] px-2 py-1 rounded-full font-medium border border-[#9DD7C2]">PANTONE 339C</span>
          </div>
          <p className="text-gray-500 text-sm mb-6">
            Cool green-to-teal band that bridges Sidra Green and the neutral palette. Formally grounded in QF's secondary palette (PANTONE 339C). Use 600 as the primary teal value for data visualization, secondary accents, and multi-series charts where warm greens need a complementary hue.
          </p>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-3 mb-8">
            {tealColors.map((c, i) => (
              <div key={i} className="relative">
                <ColorSwatch color={c.hex} name={c.name} hex={c.hex} />
                {c.hex === '#00857C' && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#00857C] text-white text-[9px] px-1.5 py-0.5 rounded font-medium whitespace-nowrap">
                    Primary
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Hue bridge visual */}
          <div className="mb-8">
            <p className="text-sm font-medium text-gray-700 mb-3">Hue bridge — how Teal sits between Sidra Green and Neutral</p>
            <div className="flex rounded-lg overflow-hidden h-10">
              {['#11362A','#2A4639','#385C4B','#4A7561','#6E9484','#00A896','#00857C','#006C65','#737370','#A8A8A3','#D6D6D2'].map((hex, i) => (
                <div key={i} className="flex-1" style={{ backgroundColor: hex }} />
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>← Sidra Green (warm)</span>
              <span>Teal (cool bridge)</span>
              <span>Neutral (warm gray) →</span>
            </div>
          </div>

          {/* Usage in charts */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Multi-series bar chart</p>
              <div className="space-y-3">
                {[
                  { label: 'Instagram', val: 85, color: '#11362A' },
                  { label: 'Twitter/X', val: 68, color: '#00857C' },
                  { label: 'LinkedIn',  val: 52, color: '#889A68' },
                  { label: 'Facebook',  val: 40, color: '#D6D6D2' },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{item.label}</span>
                      <span>{item.val}K</span>
                    </div>
                    <div className="h-5 rounded-sm" style={{ width: `${item.val}%`, backgroundColor: item.color }} />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-xs">
                {[
                  { label: 'Sidra Green', color: '#11362A' },
                  { label: 'Teal 600', color: '#00857C' },
                  { label: 'Sage 500', color: '#889A68' },
                  { label: 'Neutral 300', color: '#D6D6D2' },
                ].map((l, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: l.color }} />
                    <span className="text-gray-500">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Donut — platform followers</p>
              <div className="flex items-center gap-4">
                <div className="relative w-32 h-32 shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    {[
                      { color: '#11362A', pct: 38, off: 0 },
                      { color: '#00857C', pct: 28, off: 38 },
                      { color: '#889A68', pct: 20, off: 66 },
                      { color: '#D6D6D2', pct: 14, off: 86 },
                    ].map((s, i) => (
                      <circle key={i} cx="50" cy="50" r="40" fill="none"
                        stroke={s.color} strokeWidth="20"
                        strokeDasharray={`${s.pct * 2.51} 251`}
                        strokeDashoffset={`${-s.off * 2.51}`}
                      />
                    ))}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-base font-light text-[#0B241C]">766K</p>
                    <p className="text-[9px] text-[#4A7561]">followers</p>
                  </div>
                </div>
                <div className="space-y-2 flex-1">
                  {[
                    { name: 'Instagram', color: '#11362A', pct: '38%' },
                    { name: 'Twitter/X', color: '#00857C', pct: '28%', isNew: true },
                    { name: 'LinkedIn',  color: '#889A68', pct: '20%' },
                    { name: 'Facebook',  color: '#D6D6D2', pct: '14%' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-xs text-[#0B241C]">{item.name}</span>
                        {item.isNew && <span className="text-[9px] bg-[#EBF6F2] text-[#006C65] px-1 rounded font-medium">teal</span>}
                      </div>
                      <span className="text-xs font-medium text-[#0B241C]">{item.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Teal usage tokens */}
          <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-4">Teal Usage Tokens</p>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { stop: '600', hex: '#00857C', role: 'Primary teal', usage: 'Data series, accents' },
                { stop: '400', hex: '#3EB794', role: 'Teal mid', usage: 'Hover, highlights' },
                { stop: '200', hex: '#9DD7C2', role: 'Teal light', usage: 'Backgrounds, fills' },
                { stop: '50',  hex: '#EBF6F2', role: 'Teal subtle', usage: 'Tag backgrounds' },
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg shrink-0" style={{ backgroundColor: t.hex }} />
                  <div>
                    <p className="font-mono text-xs text-gray-600">{t.hex}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                    <p className="text-xs text-gray-300">{t.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Neutrals */}
        <section className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-100">
          <div className="mb-6 flex items-center gap-3">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#737370' }} />
            <h2 className="text-xl font-bold text-gray-900">Neutrals â€” Warm Gray</h2>
          </div>
          <p className="text-gray-500 text-sm mb-6">
            Warm-tinted neutrals for text, borders, and backgrounds. Harmonizes with the green palette.
          </p>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
            {neutralColors.map((c, i) => (
              <ColorSwatch key={i} color={c.hex} name={c.name} hex={c.hex} />
            ))}
          </div>
        </section>

        {/* Status Colors */}
        <section className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-100">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Performance Levels</h2>
            <p className="text-gray-500 text-sm mt-1">For engagement indicators, performance tiers, and status backgrounds</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {statusColors.map((c, i) => (
              <LargeColorCard key={i} name={c.name} hex={c.hex} usage={c.usage} />
            ))}
          </div>
          
          {/* Status bar example */}
          <div className="mt-8">
            <p className="text-sm font-medium text-gray-700 mb-3">Example: Performance Scale</p>
            <div className="flex rounded-lg overflow-hidden h-8">
              {statusColors.map((c, i) => (
                <div key={i} className="flex-1" style={{ backgroundColor: c.hex }} />
              ))}
            </div>
          </div>
        </section>

        {/* Data Visualization */}
        <section className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-100">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Data Visualization</h2>
            <p className="text-gray-500 text-sm mt-1">Sequential palette for charts, heatmaps, and graphs</p>
          </div>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-3 mb-8">
            {dataVizSequential.map((c, i) => (
              <ColorSwatch key={i} color={c.hex} name={c.name} hex={c.hex} />
            ))}
          </div>
          
          {/* Sample visualizations */}
          <div className="grid md:grid-cols-2 gap-6">
            <UsageExample title="Engagement Heatmap">
              <p className="text-xs text-gray-500 mb-3">Weekly posting activity</p>
              <div className="grid grid-cols-7 gap-1">
                {[1,3,5,2,7,4,6,8,2,4,6,3,5,7,9,1,4,6,8,3,5,2,7,4,6,8,3,5].map((v, i) => (
                  <div 
                    key={i}
                    className="aspect-square rounded"
                    style={{ backgroundColor: dataVizSequential[v].hex }}
                  />
                ))}
              </div>
            </UsageExample>
            
            <UsageExample title="Reach per Platform">
              <div className="flex items-end gap-3" style={{ height: '96px' }}>
                {[
                  { platform: 'IG', value: 90 },
                  { platform: 'FB', value: 70 },
                  { platform: 'TW', value: 50 },
                  { platform: 'LI', value: 40 },
                  { platform: 'YT', value: 60 },
                ].map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div 
                      className="w-full rounded-t"
                      style={{ 
                        height: `${item.value}px`, 
                        backgroundColor: dataVizSequential[Math.floor(item.value / 10)].hex 
                      }}
                    />
                    <span className="text-[10px] text-gray-400">{item.platform}</span>
                  </div>
                ))}
              </div>
            </UsageExample>
          </div>

          {/* Duotone Comparison Charts */}
          <div className="mt-8">
            <p className="text-sm font-medium text-gray-700 mb-4">Duotone Comparison Charts</p>
            <p className="text-xs text-gray-500 mb-6">
              Use solid primary color for current period data and muted warm gray for previous period comparisons
            </p>
            
            {/* Primary Style - Solid Gray */}
            <div className="bg-[#F5F5F3] rounded-xl p-6 border border-gray-200 mb-6">
              <DuotoneGroupedBarChart useStripes={false} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <UsageExample title="Engagement by Type">
                <DuotoneBarChart useStripes={false} />
              </UsageExample>
              
              <UsageExample title="Engagement (Striped Alt)">
                <DuotoneBarChart useStripes={true} />
              </UsageExample>
            </div>
          </div>
          
          {/* Duotone Color Specs */}
          <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-4">Duotone Specification</p>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">This Period</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#11362A' }} />
                  <div>
                    <p className="font-mono text-sm text-gray-700">#11362A</p>
                    <p className="text-xs text-gray-400">Primary 800</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Previous Period (Primary)</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#D6D6D2' }} />
                  <div>
                    <p className="font-mono text-sm text-gray-700">#D6D6D2</p>
                    <p className="text-xs text-gray-400">Neutral 300</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Previous Period (Alt)</p>
                <div className="flex items-center gap-3">
                  <svg width="48" height="48" className="rounded-lg">
                    <rect width="48" height="48" fill="url(#stripes)" />
                  </svg>
                  <div>
                    <p className="font-mono text-sm text-gray-700">#BDC8AB / #D5DCCA</p>
                    <p className="text-xs text-gray-400">Sage stripes (45Â°)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Semantic Colors */}
        <section className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-100">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Semantic Colors</h2>
            <p className="text-gray-500 text-sm mt-1">For alerts, notifications, and system feedback</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {semanticColors.map((c, i) => (
              <LargeColorCard key={i} {...c} />
            ))}
          </div>
        </section>

        {/* Tertiary Categorical Palette */}
        <section className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-100">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900">Tertiary â€” Categorical Palette</h2>
            <p className="text-[#2A4639] text-sm mt-1">For infographics, treemaps, and multi-category data visualization</p>
          </div>

          {/* Primary Categorical */}
          <div className="mb-10">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Primary Categories (8 Colors)</h3>
            <p className="text-sm text-[#2A4639] mb-4">
              Designed to be distinguishable, accessible, and harmonious with Sidra Green. Use for treemaps, pie charts, and categorical legends.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categoricalColors.map((c, i) => (
                <LargeColorCard key={i} {...c} />
              ))}
            </div>
          </div>

          {/* Extended Categorical */}
          <div className="mb-10">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Extended Palette (12 Colors)</h3>
            <p className="text-sm text-[#2A4639] mb-4">
              For datasets with more than 8 categories. Maintains visual distinction while staying cohesive.
            </p>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-3">
              {extendedCategorical.map((c, i) => (
                <ColorSwatch key={i} color={c.hex} name={c.name} hex={c.hex} />
              ))}
            </div>
          </div>

          {/* Task Classification */}
          <div className="mb-10">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Task Classification</h3>
            <p className="text-sm text-[#2A4639] mb-4">
              For automation/augmentation visualizations and workflow analysis.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {taskColors.map((c, i) => (
                <LargeColorCard key={i} {...c} />
              ))}
            </div>
          </div>

          {/* Treemap Example */}
          <div className="mb-10">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Treemap Example</h3>
            <p className="text-sm text-[#2A4639] mb-4">
              Proportional area visualization for hierarchical data.
            </p>
            <div className="bg-[#F5F5F3] rounded-xl p-4 border border-gray-200">
              <div className="flex h-64 gap-1">
                {/* Large blocks */}
                <div className="flex-[3] flex flex-col gap-1">
                  <div 
                    className="flex-[2] rounded-lg p-3 flex flex-col justify-between"
                    style={{ backgroundColor: '#2D6A6A' }}
                  >
                    <p className="text-white text-xs font-medium">Technology & Development</p>
                    <p className="text-white/70 text-xs">26.1%</p>
                  </div>
                  <div className="flex-1 flex gap-1">
                    <div 
                      className="flex-1 rounded-lg p-2 flex flex-col justify-between"
                      style={{ backgroundColor: '#6B7D8A' }}
                    >
                      <p className="text-white text-[10px] font-medium">Business & Finance</p>
                      <p className="text-white/70 text-[10px]">7.4%</p>
                    </div>
                    <div 
                      className="flex-1 rounded-lg p-2 flex flex-col justify-between"
                      style={{ backgroundColor: '#5A8A7A' }}
                    >
                      <p className="text-white text-[10px] font-medium">Life Sciences</p>
                      <p className="text-white/70 text-[10px]">7.9%</p>
                    </div>
                  </div>
                </div>
                {/* Right column */}
                <div className="flex-[2] flex flex-col gap-1">
                  <div 
                    className="flex-[1.5] rounded-lg p-3 flex flex-col justify-between"
                    style={{ backgroundColor: '#7A9A7A' }}
                  >
                    <p className="text-white text-xs font-medium">Education & Research</p>
                    <p className="text-white/70 text-xs">10.7%</p>
                  </div>
                  <div 
                    className="flex-1 rounded-lg p-2 flex flex-col justify-between"
                    style={{ backgroundColor: '#8B7BA8' }}
                  >
                    <p className="text-white text-xs font-medium">Arts & Entertainment</p>
                    <p className="text-white/70 text-xs">9.1%</p>
                  </div>
                  <div className="flex-1 flex gap-1">
                    <div 
                      className="flex-1 rounded-lg p-2 flex flex-col justify-between"
                      style={{ backgroundColor: '#C4A0A0' }}
                    >
                      <p className="text-[#0B241C] text-[10px] font-medium">Community</p>
                      <p className="text-[#2A4639] text-[10px]">2.6%</p>
                    </div>
                    <div 
                      className="flex-1 rounded-lg p-2 flex flex-col justify-between"
                      style={{ backgroundColor: '#C49A8B' }}
                    >
                      <p className="text-[#0B241C] text-[10px] font-medium">Healthcare</p>
                      <p className="text-[#2A4639] text-[10px]">2.8%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Waffle Chart Example */}
          <div className="mb-10">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Waffle Chart Example</h3>
            <p className="text-sm text-[#2A4639] mb-4">
              For showing proportions and task automation breakdown.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#F5F5F3] rounded-xl p-4 border border-gray-200">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#0B241C] mb-3">Content Creation Tasks</p>
                <div className="grid grid-cols-10 gap-1 mb-4">
                  {Array.from({ length: 100 }, (_, i) => {
                    let color = '#D6D6D2'; // Manual
                    if (i < 35) color = '#5A8A6A'; // Automated
                    else if (i < 65) color = '#8B7BA8'; // Augmented
                    return (
                      <div 
                        key={i}
                        className="aspect-square rounded-sm"
                        style={{ backgroundColor: color }}
                      />
                    );
                  })}
                </div>
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#5A8A6A' }} />
                    <span className="text-[#2A4639]">Automated 35%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#8B7BA8' }} />
                    <span className="text-[#2A4639]">Augmented 30%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#D6D6D2' }} />
                    <span className="text-[#2A4639]">Manual 35%</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#F5F5F3] rounded-xl p-4 border border-gray-200">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#0B241C] mb-3">Data Analysis Tasks</p>
                <div className="grid grid-cols-10 gap-1 mb-4">
                  {Array.from({ length: 100 }, (_, i) => {
                    let color = '#D6D6D2'; // Manual
                    if (i < 52) color = '#5A8A6A'; // Automated
                    else if (i < 85) color = '#8B7BA8'; // Augmented
                    return (
                      <div 
                        key={i}
                        className="aspect-square rounded-sm"
                        style={{ backgroundColor: color }}
                      />
                    );
                  })}
                </div>
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#5A8A6A' }} />
                    <span className="text-[#2A4639]">Automated 52%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#8B7BA8' }} />
                    <span className="text-[#2A4639]">Augmented 33%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#D6D6D2' }} />
                    <span className="text-[#2A4639]">Manual 15%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Geographic Heatmap Scale */}
          <div className="mb-10">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Geographic / Index Scale</h3>
            <p className="text-sm text-[#2A4639] mb-4">
              Sequential scale for maps, rankings, and performance indices.
            </p>
            <div className="bg-[#F5F5F3] rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 h-8 rounded-lg overflow-hidden flex">
                  {[
                    '#E8EEEB', '#C5D5CC', '#9EBAA9', '#779F87', '#5A8A6D', '#3D7553', '#2B5C40', '#11362A'
                  ].map((color, i) => (
                    <div key={i} className="flex-1" style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
              <div className="flex justify-between text-xs text-[#2A4639]">
                <span>Emerging (bottom 25%)</span>
                <span>Lower middle</span>
                <span>Upper middle</span>
                <span>Leading (top 25%)</span>
              </div>
            </div>
          </div>

          {/* Donut Chart Example */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Donut Chart Example</h3>
            <p className="text-sm text-[#2A4639] mb-4">
              For showing distribution across categories with a total in the center.
            </p>
            <div className="bg-[#F5F5F3] rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-8">
                {/* Donut chart */}
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    {[
                      { color: '#2D6A6A', percent: 32, offset: 0 },
                      { color: '#7A9A7A', percent: 24, offset: 32 },
                      { color: '#8B7BA8', percent: 18, offset: 56 },
                      { color: '#C4A0A0', percent: 12, offset: 74 },
                      { color: '#6B7D8A', percent: 8, offset: 86 },
                      { color: '#C4B49A', percent: 6, offset: 94 },
                    ].map((segment, i) => (
                      <circle
                        key={i}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={segment.color}
                        strokeWidth="20"
                        strokeDasharray={`${segment.percent * 2.51} 251`}
                        strokeDashoffset={`${-segment.offset * 2.51}`}
                      />
                    ))}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-2xl font-light text-[#0B241C]">766K</p>
                    <p className="text-xs text-[#2A4639]">followers</p>
                  </div>
                </div>
                {/* Legend */}
                <div className="flex-1 space-y-2">
                  {[
                    { name: 'Instagram', color: '#2D6A6A', value: '245,000', percent: '32%' },
                    { name: 'Facebook', color: '#7A9A7A', value: '184,000', percent: '24%' },
                    { name: 'Twitter', color: '#8B7BA8', value: '138,000', percent: '18%' },
                    { name: 'LinkedIn', color: '#C4A0A0', value: '92,000', percent: '12%' },
                    { name: 'YouTube', color: '#6B7D8A', value: '61,000', percent: '8%' },
                    { name: 'TikTok', color: '#C4B49A', value: '46,000', percent: '6%' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-[#0B241C]">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-[#0B241C]">{item.value}</span>
                        <span className="text-xs text-[#4A7561] w-8 text-right">{item.percent}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-400">
          Click any color swatch to copy hex value
        </div>
      </div>
    </div>
  );
}
